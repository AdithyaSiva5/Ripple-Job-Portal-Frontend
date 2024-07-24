import React, { useState, useEffect } from 'react';

function SkillsSection({ skills, jobCategories = [], onUpdate }) {
  const [localSkills, setLocalSkills] = useState([]);

  useEffect(() => {
    setLocalSkills(skills || []);
  }, [skills]);

  const toggleSkill = (skill) => {
    let updatedSkills;
    if (localSkills.includes(skill)) {
      updatedSkills = localSkills.filter(s => s !== skill);
    } else {
      updatedSkills = [...localSkills, skill];
    }
    setLocalSkills(updatedSkills);
    onUpdate(updatedSkills);
  };


  return (
    <div className="skills-section bg-white w-full rounded-md p-4 mb-4">
      <h2>Skills</h2>
      <div className="skill-buttons">
        {jobCategories && jobCategories.length > 0 ? (
          jobCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => toggleSkill(category.name)}
              className={`m-1 p-2 rounded ${localSkills.includes(category.name) ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            >
              {category.name}
            </button>
          ))
        ) : (
          <p>No job categories available</p>
        )}
      </div>
    </div>
  );
}

export default SkillsSection;