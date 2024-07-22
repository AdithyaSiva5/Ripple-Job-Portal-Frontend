// QualificationsSection.tsx
import React from 'react';

function QualificationsSection({ user }) {
  return (
    <div className="qualifications-section bg-white w-full rounded-md p-4 mb-4">
      <h2>Qualifications</h2>
      {user.profile?.qualification.map((qual, index) => (
        <div key={index}>
          <p>{qual.course} from {qual.institution}</p>
          <p>Year of completion: {qual.yearOfCompletion}</p>
        </div>
      ))}
      {/* Add button to add new qualification */}
    </div>
  );
}

export default QualificationsSection;