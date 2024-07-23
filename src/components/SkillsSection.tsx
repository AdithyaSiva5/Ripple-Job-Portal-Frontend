// SkillsSection.tsx
import React, { useState } from 'react';

function SkillsSection({ user }) {
  const [skills, setSkills] = useState(user.profile?.skills || []);
  const jobCategories = ['MERN', 'Python', 'Java', 'DevOps', 'AI/ML'];

  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  return (
    <div className="skills-section bg-white w-full rounded-md p-4 mb-4">
      <h2>Skills</h2>
      <div className="skill-buttons">
        {jobCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => toggleSkill(category)}
            className={`m-1 p-2 rounded ${skills.includes(category) ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            {category}
          </button>
        ))}
      </div>
      {/* Add button to save skills */}
    </div>
  );
}

export default SkillsSection;
