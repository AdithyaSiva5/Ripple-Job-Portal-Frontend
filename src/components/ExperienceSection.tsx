import { useState } from "react";

function ExperienceSection({ user, onUpdate }) {
  const [experiences, setExperiences] = useState(user.profile?.experience || []);

  const addExperience = () => {
    setExperiences([...experiences, { jobPosition: '', yearOfJoining: '', companyName: '' }]);
  };

  const updateExperience = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
    onUpdate('experience', updatedExperiences);
  };

  return (
    <div className="experience-section bg-white w-full rounded-md p-4 mb-4">
      <h2>Experience</h2>
      {experiences.map((exp, index) => (
        <div key={index} className="mb-2">
          <input
            type="text"
            placeholder="Job Position"
            value={exp.jobPosition}
            onChange={(e) => updateExperience(index, 'jobPosition', e.target.value)}
            className="mr-2 p-1 border rounded"
          />
          <input
            type="text"
            placeholder="Company Name"
            value={exp.companyName}
            onChange={(e) => updateExperience(index, 'companyName', e.target.value)}
            className="mr-2 p-1 border rounded"
          />
          <input
            type="number"
            placeholder="Year of Joining"
            value={exp.yearOfJoining}
            onChange={(e) => updateExperience(index, 'yearOfJoining', e.target.value)}
            className="p-1 border rounded"
          />
        </div>
      ))}
      <button onClick={addExperience} className="mt-2 p-2 bg-green-500 text-white rounded">Add Experience</button>
    </div>
  );
}
export default ExperienceSection;


