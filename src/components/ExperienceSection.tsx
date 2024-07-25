import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';

// Validation schema for a single experience
const experienceSchema = Yup.object().shape({
  jobPosition: Yup.string()
    .trim()
    .required('Job Position is required')
    .max(50, 'Job Position is too long'),
  companyName: Yup.string()
    .trim()
    .required('Company Name is required')
    .max(50, 'Company Name is too long'),
  yearOfJoining: Yup.number()
    .required('Year is required')
    .min(1900, 'Year must be 1900 or later')
    .max(new Date().getFullYear(), 'Year cannot be in the future')
});

function ExperienceSection({ experiences, onUpdate }) {
  const [localExperiences, setLocalExperiences] = useState(experiences || []);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setLocalExperiences(experiences || []);
    validateExperiences(experiences || []);
  }, [experiences]);

  const validateExperiences = async (experiences) => {
    const newErrors = await Promise.all(
      experiences.map(exp =>
        experienceSchema.validate(exp, { abortEarly: false })
          .then(() => ({}))
          .catch(err =>
            err.inner.reduce((acc, error) => {
              acc[error.path] = error.message;
              return acc;
            }, {})
          )
      )
    );
    setErrors(newErrors);
  };

  const addExperience = () => {
    const newExperience = { jobPosition: '', yearOfJoining: '', companyName: '' };
    setLocalExperiences([...localExperiences, newExperience]);
    setErrors([...errors, {}]);
  };

  const updateExperience = async (index, field, value) => {
    const updatedExperiences = localExperiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setLocalExperiences(updatedExperiences);

    try {
      await experienceSchema.validateAt(field, updatedExperiences[index]);
      const newErrors = [...errors];
      newErrors[index] = { ...newErrors[index], [field]: undefined };
      setErrors(newErrors);
    } catch (error) {
      const newErrors = [...errors];
      newErrors[index] = { ...newErrors[index], [field]: error.message };
      setErrors(newErrors);
    }

    onUpdate(filterEmptyFields(updatedExperiences));
  };

  const removeExperience = (index) => {
    const updatedExperiences = localExperiences.filter((_, i) => i !== index);
    const updatedErrors = errors.filter((_, i) => i !== index);
    setLocalExperiences(updatedExperiences);
    setErrors(updatedErrors);
    onUpdate(filterEmptyFields(updatedExperiences));
  };

  const filterEmptyFields = (experiences) => {
    return experiences.filter(exp => exp.jobPosition || exp.companyName || exp.yearOfJoining)
      .map(exp => ({
        ...(exp.jobPosition && { jobPosition: exp.jobPosition }),
        ...(exp.companyName && { companyName: exp.companyName }),
        ...(exp.yearOfJoining && { yearOfJoining: parseInt(exp.yearOfJoining, 10) }),
        ...(exp._id && { _id: exp._id }) // Preserve the _id if it exists
      }));
  };

  const isFormValid = () => errors.every(error => Object.keys(error).length === 0);

  return (
    <div className="experience-section w-full rounded-md p-4 mb-4">
      <h2 className='text-black dark:text-white mb-4'>Experience</h2>
      {localExperiences.map((exp, index) => (
        <div key={exp._id || index} className="mb-6 flex flex-wrap -mx-2">
          <div className="w-full sm:w-1/3 px-2 mb-4 sm:mb-0 relative">
            <input
              type="text"
              value={exp.jobPosition}
              onChange={(e) => updateExperience(index, 'jobPosition', e.target.value)}
              className={`w-full p-2 border rounded ${errors[index]?.jobPosition ? 'border-red-500' : ''}`}
              placeholder="Job Position"
              maxLength={50}
            />
            {errors[index]?.jobPosition && <span className="text-red-500 text-sm absolute left-2 top-full">{errors[index].jobPosition}</span>}
          </div>

          <div className="w-full sm:w-1/3 px-2 mb-4 sm:mb-0 relative">
            <input
              type="text"
              value={exp.companyName}
              onChange={(e) => updateExperience(index, 'companyName', e.target.value)}
              className={`w-full p-2 border rounded ${errors[index]?.companyName ? 'border-red-500' : ''}`}
              placeholder="Company Name"
              maxLength={50}
            />
            {errors[index]?.companyName && <span className="text-red-500 text-sm absolute left-2 top-full">{errors[index].companyName}</span>}
          </div>

          <div className="w-full sm:w-1/4 px-2 mb-4 sm:mb-0 relative">
            <input
              type="number"
              value={exp.yearOfJoining}
              onChange={(e) => updateExperience(index, 'yearOfJoining', e.target.value)}
              className={`w-full p-2 border rounded ${errors[index]?.yearOfJoining ? 'border-red-500' : ''}`}
              placeholder="Year of Joining"
              min="1900"
              max={new Date().getFullYear()}
            />
            {errors[index]?.yearOfJoining && <span className="text-red-500 text-sm absolute left-2 top-full">{errors[index].yearOfJoining}</span>}
          </div>

          <button
            onClick={() => removeExperience(index)}
            className="ml-2 p-2 bg-red-500 text-white rounded flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>
      ))}
      <button
        onClick={addExperience}
        className="p-2 text-base bg-blue-500 text-white rounded"
        disabled={!isFormValid() || localExperiences.length >= 5}
      >
        Add Experience
      </button>
    </div>
  );
}

export default ExperienceSection;