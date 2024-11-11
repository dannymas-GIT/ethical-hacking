import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

const LearningTracker = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [completedTopics, setCompletedTopics] = useState({});

  const sections = {
    'Frontend Architecture': {
      topics: [
        'Component Structure',
        'State Management',
        'Routing',
        'API Integration',
        'Performance Optimization'
      ]
    },
    'Backend Architecture': {
      topics: [
        'API Design',
        'Database Design',
        'Authentication/Authorization',
        'Caching Strategies',
        'Error Handling'
      ]
    },
    'Infrastructure': {
      topics: [
        'Deployment Strategies',
        'Scaling',
        'Monitoring',
        'Security',
        'CI/CD'
      ]
    },
    'Data Management': {
      topics: [
        'Database Selection',
        'Data Modeling',
        'Query Optimization',
        'Backup Strategies',
        'Data Migration'
      ]
    },
    'Testing & Quality': {
      topics: [
        'Unit Testing',
        'Integration Testing',
        'E2E Testing',
        'Performance Testing',
        'Security Testing'
      ]
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleTopic = (section, topic) => {
    const key = `${section}-${topic}`;
    setCompletedTopics(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const calculateProgress = (section) => {
    const topics = sections[section].topics;
    const completed = topics.filter(topic => 
      completedTopics[`${section}-${topic}`]
    ).length;
    return Math.round((completed / topics.length) * 100);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Web Application Architecture Progress</h2>
      
      {Object.entries(sections).map(([section, { topics }]) => (
        <div key={section} className="border rounded-lg shadow-sm">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
            onClick={() => toggleSection(section)}
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{section}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 rounded-full h-2"
                  style={{ width: `${calculateProgress(section)}%` }}
                />
              </div>
              <span className="text-sm text-gray-600">
                {calculateProgress(section)}% Complete
              </span>
            </div>
            {expandedSections[section] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          
          {expandedSections[section] && (
            <div className="p-4 border-t">
              {topics.map(topic => (
                <div 
                  key={topic}
                  className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                  onClick={() => toggleTopic(section, topic)}
                >
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3
                    ${completedTopics[`${section}-${topic}`] ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
                  >
                    {completedTopics[`${section}-${topic}`] && <Check size={16} className="text-white" />}
                  </div>
                  <span className={completedTopics[`${section}-${topic}`] ? 'line-through text-gray-500' : ''}>
                    {topic}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LearningTracker;