import React from 'react';

function ExperienceSection({ user }) {
  return (
    <div className="experience-section bg-white w-full rounded-md p-4 mb-4">
      <h2>Experience</h2>
      {user.profile?.experience.map((exp, index) => (
        <div key={index}>
          <p>{exp.jobPosition} at {exp.companyName}</p>
          <p>Year of joining: {exp.yearOfJoining}</p>
        </div>
      ))}
      {/* Add button to add new experience */}
    </div>
  );
}

export default ExperienceSection;


