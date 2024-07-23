import React, { useState, useEffect } from 'react';

function ExperienceSection({ experiences, onUpdate }) {
  const [localExperiences, setLocalExperiences] = useState([]);

  useEffect(() => {
    console.log("ExperienceSection - Initial experiences:", experiences);
    setLocalExperiences(experiences || []);
  }, [experiences]);

  const addExperience = () => {
    console.log("ExperienceSection - Adding new experience");
    const newExperiences = [...localExperiences, { jobPosition: '', yearOfJoining: '', companyName: '' }];
    setLocalExperiences(newExperiences);
    onUpdate(newExperiences);
  };

  const updateExperience = (index, field, value) => {
    console.log(`ExperienceSection - Updating experience at index ${index}, field: ${field}, value: ${value}`);
    const updatedExperiences = localExperiences.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    setLocalExperiences(updatedExperiences);
    onUpdate(updatedExperiences);
  };

  const removeExperience = (index) => {
    console.log(`ExperienceSection - Removing experience at index ${index}`);
    const updatedExperiences = localExperiences.filter((_, i) => i !== index);
    setLocalExperiences(updatedExperiences);
    onUpdate(updatedExperiences);
  };

  console.log("ExperienceSection - Rendering with experiences:", localExperiences);

  return (
    <div className="experience-section bg-white w-full rounded-md p-4 mb-4">
      <h2>Experience</h2>
      {localExperiences.map((exp, index) => (
        <div key={index} className="mb-2">
          <input
            type="text"
            placeholder="Job Position"
            value={exp.jobPosition || ''}
            onChange={(e) => updateExperience(index, 'jobPosition', e.target.value)}
            className="mr-2 p-1 border rounded"
          />
          <input
            type="text"
            placeholder="Company Name"
            value={exp.companyName || ''}
            onChange={(e) => updateExperience(index, 'companyName', e.target.value)}
            className="mr-2 p-1 border rounded"
          />
          <input
            type="number"
            placeholder="Year of Joining"
            value={exp.yearOfJoining || ''}
            onChange={(e) => updateExperience(index, 'yearOfJoining', e.target.value)}
            className="p-1 border rounded"
          />
          <button onClick={() => removeExperience(index)} className="ml-2 p-1 bg-red-500 text-white rounded">Remove</button>
        </div>
      ))}
      <button onClick={addExperience} className="mt-2 p-2 bg-green-500 text-white rounded">Add Experience</button>
    </div>
  );
}

export default ExperienceSection;