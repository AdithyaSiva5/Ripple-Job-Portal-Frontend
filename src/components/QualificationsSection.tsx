import React, { useState, useEffect } from 'react';

function QualificationsSection({ qualifications, onUpdate }) {
  const [localQualifications, setLocalQualifications] = useState(qualifications || []);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setLocalQualifications(qualifications || []);
    setErrors(Array(qualifications?.length || 0).fill({}));
  }, [qualifications]);

  const addQualification = () => {
    const newQualification = { course: '', institution: '', yearOfCompletion: '' };
    setLocalQualifications([...localQualifications, newQualification]);
    setErrors([...errors, {}]);
  };

  const updateQualification = (index, field, value) => {
    const updatedQualifications = localQualifications.map((qual, i) => 
      i === index ? { ...qual, [field]: value } : qual
    );
    setLocalQualifications(updatedQualifications);
    const newErrors = [...errors];
    if (field === 'yearOfCompletion') {
      const yearValue = parseInt(value, 10);
      newErrors[index] = { 
        ...newErrors[index], 
        [field]: isNaN(yearValue) || yearValue < 1900 || yearValue > new Date().getFullYear()
      };
    } else {
      newErrors[index] = { ...newErrors[index], [field]: value.trim() === '' };
    }
    setErrors(newErrors);

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

  return (
    <div className='skills-section dark:text-black daa w-full rounded-md p-4 mb-4'>
      <h2 className='dark:text-white'>Qualifications</h2>
      {localQualifications.map((qual, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            value={qual.course}
            onChange={(e) => updateQualification(index, 'course', e.target.value)}
            className={`mr-2 p-1 border rounded ${errors[index]?.course ? 'border-red-500 dark:text-white ' : ''}`}
            placeholder="Course"
          />
          {errors[index]?.course && <span className="text-red-500 text-sm dark:text-white ">Course is required</span>}
          
          <input
            type="text"
            value={qual.institution}
            onChange={(e) => updateQualification(index, 'institution', e.target.value)}
            className={`mr-2 p-1 border rounded ${errors[index]?.institution ? 'border-red-500 dark:text-white ' : ''}`}
            placeholder="Institution"
          />
          {errors[index]?.institution && <span className="text-red-500 text-sm dark:text-white ">Institution is required</span>}
          
          <input
            type="number"
            value={qual.yearOfCompletion}
            onChange={(e) => updateQualification(index, 'yearOfCompletion', e.target.value)}
            className={`p-1 border rounded ${errors[index]?.yearOfCompletion ? 'border-red-500' : ''}`}
            placeholder="Year of Completion"
            min="1900"
            max={new Date().getFullYear()}
          />
          {errors[index]?.yearOfCompletion && <span className="text-red-500 text-sm dark:text-white ">Enter a valid year</span>}
          
          <button onClick={() => removeQualification(index)} className="ml-2 p-1 bg-red-500 text-white rounded">
            Remove
          </button>
        </div>
      ))}
      <button onClick={addQualification} className="p-1 bg-blue-500 text-white rounded">
        Add Qualification
      </button>
    </div>
  );
}

export default QualificationsSection;