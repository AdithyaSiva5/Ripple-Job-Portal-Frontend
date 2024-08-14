import React, { useState, useEffect } from 'react';

function SkillsSection({ skills, jobCategories = [], onUpdate }) {
  const [localSkills, setLocalSkills] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

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

  const remainingSkills = jobCategories.filter(category => !localSkills.includes(category.name));

  return (
    <div className="skills-section w-full rounded-md p-4 mb-4">
      <h2 className='dark:text-white mb-2'>Skills</h2>
      <div className="selected-skills flex flex-wrap mb-2">
        {localSkills.map((skill, index) => (
          <span key={index} className="bg-green-600 text-white text-sm rounded-full px-3 py-1 m-1">
            {skill}
            <button onClick={() => toggleSkill(skill)} className="ml-2 font-bold">×</button>
          </span>
        ))}
      </div>
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="p-2 text-base bg-blue-500 text-white rounded"
        >
          Add Skill
        </button>
        {showDropdown && (
          <div className="absolute z-10 mt-1 w-48 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-lg max-h-40 overflow-y-auto">
            {remainingSkills.length > 0 ? (
              remainingSkills.map((category, index) => (
                <button
                  key={index}
                  onClick={() => {
                    toggleSkill(category.name);
                    setShowDropdown(false);
                  }}
                  className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                >
                  {category.name}
                </button>
              ))
            ) : (
              <p className="p-2 text-gray-500 dark:text-gray-300 text-sm">No more skills available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SkillsSection;