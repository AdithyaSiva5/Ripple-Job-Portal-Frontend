import React, { useState, useEffect } from 'react';

function SkillsSection({ skills, onUpdate }) {
  const [localSkills, setLocalSkills] = useState([]);
  const jobCategories = ['MERN', 'Python', 'Java', 'DevOps', 'AI/ML'];

  useEffect(() => {
    console.log("SkillsSection - Initial skills:", skills);
    setLocalSkills(skills || []);
  }, [skills]);

  const toggleSkill = (skill) => {
    console.log(`SkillsSection - Toggling skill: ${skill}`);
    let updatedSkills;
    if (localSkills.includes(skill)) {
      updatedSkills = localSkills.filter(s => s !== skill);
    } else {
      updatedSkills = [...localSkills, skill];
    }
    console.log("SkillsSection - Updated skills:", updatedSkills);
    setLocalSkills(updatedSkills);
    onUpdate(updatedSkills);
  };

  console.log("SkillsSection - Rendering with skills:", localSkills);

  return (
    <div className="skills-section bg-white w-full rounded-md p-4 mb-4">
      <h2>Skills</h2>
      <div className="skill-buttons">
        {jobCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => toggleSkill(category)}
            className={`m-1 p-2 rounded ${localSkills.includes(category) ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SkillsSection;