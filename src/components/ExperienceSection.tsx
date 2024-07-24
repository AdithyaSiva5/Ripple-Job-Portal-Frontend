import React, { useState, useEffect } from 'react';

function ExperienceSection({ experiences, onUpdate }) {
  const [localExperiences, setLocalExperiences] = useState(experiences || []);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setLocalExperiences(experiences || []);
    setErrors(Array(experiences?.length || 0).fill({}));
  }, [experiences]);

  const addExperience = () => {
    const newExperience = { jobPosition: '', yearOfJoining: '', companyName: '' };
    setLocalExperiences([...localExperiences, newExperience]);
    setErrors([...errors, {}]);
  };

  const updateExperience = (index, field, value) => {
    const updatedExperiences = localExperiences.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    setLocalExperiences(updatedExperiences);

    // Update errors
    const newErrors = [...errors];
    if (field === 'yearOfJoining') {
      const yearValue = parseInt(value, 10);
      newErrors[index] = { 
        ...newErrors[index], 
        [field]: isNaN(yearValue) || yearValue < 1900 || yearValue > new Date().getFullYear()
      };
    } else {
      newErrors[index] = { ...newErrors[index], [field]: value.trim() === '' };
    }
    setErrors(newErrors);

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
        ...(exp.yearOfJoining && { yearOfJoining: parseInt(exp.yearOfJoining, 10) })
      }));
  };

  return (
    <div className="experience-section bg-white w-full rounded-md p-4 mb-4">
      <h2>Experience</h2>
      {localExperiences.map((exp, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            value={exp.jobPosition}
            onChange={(e) => updateExperience(index, 'jobPosition', e.target.value)}
            className={`mr-2 p-1 border rounded ${errors[index]?.jobPosition ? 'border-red-500' : ''}`}
            placeholder="Job Position"
          />
          {errors[index]?.jobPosition && <span className="text-red-500 text-sm">Job Position is required</span>}
          
          <input
            type="text"
            value={exp.companyName}
            onChange={(e) => updateExperience(index, 'companyName', e.target.value)}
            className={`mr-2 p-1 border rounded ${errors[index]?.companyName ? 'border-red-500' : ''}`}
            placeholder="Company Name"
          />
          {errors[index]?.companyName && <span className="text-red-500 text-sm">Company Name is required</span>}
          
          <input
            type="number"
            value={exp.yearOfJoining}
            onChange={(e) => updateExperience(index, 'yearOfJoining', e.target.value)}
            className={`p-1 border rounded ${errors[index]?.yearOfJoining ? 'border-red-500' : ''}`}
            placeholder="Year of Joining"
            min="1900"
            max={new Date().getFullYear()}
          />
          {errors[index]?.yearOfJoining && <span className="text-red-500 text-sm">Enter a valid year</span>}
          
          <button onClick={() => removeExperience(index)} className="ml-2 p-1 bg-red-500 text-white rounded">
            Remove
          </button>
        </div>
      ))}
      <button onClick={addExperience} className="p-1 bg-blue-500 text-white rounded">
        Add Experience
      </button>
    </div>
  );
}

export default ExperienceSection;