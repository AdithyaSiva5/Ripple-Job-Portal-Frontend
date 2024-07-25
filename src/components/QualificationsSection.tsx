import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';

const qualificationSchema = Yup.object().shape({
  course: Yup.string()
    .trim()
    .required('Course is required')
    .max(50, 'Course name is too long'),
  institution: Yup.string()
    .trim()
    .required('Institution is required')
    .max(50, 'Institution name is too long'),
  yearOfCompletion: Yup.number()
    .required('Year is required')
    .min(1900, 'Year must be 1900 or later')
    .max(new Date().getFullYear(), 'Year cannot be in the future')
});

function QualificationsSection({ qualifications, onUpdate }) {
  const [localQualifications, setLocalQualifications] = useState(qualifications || []);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setLocalQualifications(qualifications || []);
    validateQualifications(qualifications || []);
  }, [qualifications]);

  const validateQualifications = async (qualifications) => {
    const newErrors = await Promise.all(
      qualifications.map(qual => 
        qualificationSchema.validate(qual, { abortEarly: false })
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

  const addQualification = () => {
    const newQualification = { course: '', institution: '', yearOfCompletion: '' };
    setLocalQualifications([...localQualifications, newQualification]);
    setErrors([...errors, {}]);
  };

  const updateQualification = async (index, field, value) => {
    const updatedQualifications = localQualifications.map((qual, i) => 
      i === index ? { ...qual, [field]: value } : qual
    );
    setLocalQualifications(updatedQualifications);

    try {
      await qualificationSchema.validateAt(field, updatedQualifications[index]);
      const newErrors = [...errors];
      newErrors[index] = { ...newErrors[index], [field]: undefined };
      setErrors(newErrors);
    } catch (error) {
      const newErrors = [...errors];
      newErrors[index] = { ...newErrors[index], [field]: error.message };
      setErrors(newErrors);
    }

    onUpdate(filterEmptyFields(updatedQualifications));
  };

  const removeQualification = (index) => {
    const updatedQualifications = localQualifications.filter((_, i) => i !== index);
    const updatedErrors = errors.filter((_, i) => i !== index);
    setLocalQualifications(updatedQualifications);
    setErrors(updatedErrors);
    onUpdate(filterEmptyFields(updatedQualifications));
  };

  const filterEmptyFields = (qualifications) => {
    return qualifications.filter(q => q.course || q.institution || q.yearOfCompletion)
      .map(q => ({
        ...(q.course && { course: q.course }),
        ...(q.institution && { institution: q.institution }),
        ...(q.yearOfCompletion && { yearOfCompletion: parseInt(q.yearOfCompletion, 10) })
      }));
  };

  const isFormValid = () => errors.every(error => Object.keys(error).length === 0);

  return (
    <div className='skills-section dark:text-black w-full rounded-md p-4 mb-4'>
      <h2 className='dark:text-white mb-4'>Qualifications</h2>
      {localQualifications.map((qual, index) => (
        <div key={index} className="mb-4 flex flex-wrap items-center -mx-2">
          <div className="w-full sm:w-1/3 px-2 mb-2 sm:mb-0 relative">
            <input
              type="text"
              value={qual.course}
              onChange={(e) => updateQualification(index, 'course', e.target.value)}
              className={`w-full p-2 border rounded ${errors[index]?.course ? 'border-red-500' : ''}`}
              placeholder="Course"
              maxLength={50}
            />
            {errors[index]?.course && <span className="text-red-500 text-sm absolute left-2 top-full">{errors[index].course}</span>}
          </div>
          
          <div className="w-full sm:w-1/3 mb-4  px-2 sm:mb-0 relative">
            <input
              type="text"
              value={qual.institution}
              onChange={(e) => updateQualification(index, 'institution', e.target.value)}
              className={`w-full p-2 border rounded ${errors[index]?.institution ? 'border-red-500' : ''}`}
              placeholder="Institution"
              maxLength={50}
            />
            {errors[index]?.institution && <span className="text-red-500 text-sm absolute left-2 top-full">{errors[index].institution}</span>}
          </div>
          
          <div className="w-full sm:w-1/4 mb-2 sm:mb-0 relative">
            <input
              type="number"
              value={qual.yearOfCompletion}
              onChange={(e) => updateQualification(index, 'yearOfCompletion', e.target.value)}
              className={`w-full p-2 border rounded ${errors[index]?.yearOfCompletion ? 'border-red-500' : ''}`}
              placeholder="Year of Completion"
              min="1900"
              max={new Date().getFullYear()}
            />
            {errors[index]?.yearOfCompletion && <span className="text-red-500 text-sm absolute left-2 top-full">{errors[index].yearOfCompletion}</span>}
          </div>
          
          <button 
            onClick={() => removeQualification(index)} 
            className="ml-2 p-2 bg-red-500 text-white rounded flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>
      ))}
      <button 
        onClick={addQualification} 
        className="p-2 text-base bg-blue-500 text-white rounded"
        disabled={!isFormValid() || localQualifications.length >= 5}
      >
        Add Qualification
      </button>
    </div>
  );
}

export default QualificationsSection;