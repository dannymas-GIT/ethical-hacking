import React from 'react';
import LearningTracker from '../components/LearningTracker';
import KnowledgeTest from '../components/KnowledgeTest';

const ProgressPage = () => {
  return (
    <div className="space-y-8">
      <LearningTracker />
      <KnowledgeTest questions={[]} />
    </div>
  );
};

export default ProgressPage;
