import React from 'react';
import CourseContent from '../components/CourseContent';
import LearningTracker from '../components/LearningTracker';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to Ethical Hacking Platform</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Quick Stats */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800">Course Progress</h3>
            <p className="text-2xl font-bold text-blue-600">45%</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-800">Labs Completed</h3>
            <p className="text-2xl font-bold text-green-600">7/15</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-medium text-purple-800">Current Level</h3>
            <p className="text-2xl font-bold text-purple-600">Intermediate</p>
          </div>
        </div>
      </div>
      
      <CourseContent />
      <LearningTracker />
    </div>
  );
};

export default Dashboard; 