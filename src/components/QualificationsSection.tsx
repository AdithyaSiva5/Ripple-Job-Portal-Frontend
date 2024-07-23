import React, { useState, useEffect } from 'react';

function QualificationsSection({ qualifications, onUpdate }) {
  const [localQualifications, setLocalQualifications] = useState(qualifications || []);

  useEffect(() => {
    setLocalQualifications(qualifications || []);
  }, [qualifications]);

  const addQualification = () => {
    const newQualifications = [...localQualifications, { course: '', institution: '', yearOfCompletion: '' }];
    setLocalQualifications(newQualifications);
    onUpdate(newQualifications);
  };

  const updateQualification = (index, field, value) => {
    const updatedQualifications = localQualifications.map((qual, i) => 
      i === index ? { ...qual, [field]: value } : qual
    );
    setLocalQualifications(updatedQualifications);
    onUpdate(updatedQualifications.filter(q => q.course || q.institution || q.yearOfCompletion));
  };

  const removeQualification = (index) => {
    const updatedQualifications = localQualifications.filter((_, i) => i !== index);
    setLocalQualifications(updatedQualifications);
    onUpdate(updatedQualifications);
  };

  return (
    <div className="qualifications-section bg-white w-full rounded-md p-4 mb-4">
      <h2>Qualifications</h2>
      {localQualifications.map((qual, index) => (
        <div key={index} className="mb-2">
          <input
            type="text"
            placeholder="Course"
            value={qual.course || ''}
            onChange={(e) => updateQualification(index, 'course', e.target.value)}
            className="mr-2 p-1 border rounded"
          />
          <input
            type="text"
            placeholder="Institution"
            value={qual.institution || ''}
            onChange={(e) => updateQualification(index, 'institution', e.target.value)}
            className="mr-2 p-1 border rounded"
          />
          <input
            type="number"
            placeholder="Year of Completion"
            value={qual.yearOfCompletion || ''}
            onChange={(e) => updateQualification(index, 'yearOfCompletion', e.target.value)}
            className="p-1 border rounded"
          />
          <button onClick={() => removeQualification(index)} className="ml-2 p-1 bg-red-500 text-white rounded">Remove</button>
        </div>
      ))}
      <button onClick={addQualification} className="mt-2 p-2 bg-green-500 text-white rounded">Add Qualification</button>
    </div>
  );
}

export default QualificationsSection;