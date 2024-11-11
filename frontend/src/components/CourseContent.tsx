import React, { useState } from 'react';
import { Book, Terminal, CheckCircle, Lock } from 'lucide-react';
import { CourseModule, CourseTopic } from '../types/course';

const CourseContent = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const modules: CourseModule[] = [
    {
      id: 'network-basics',
      title: 'Network Security Fundamentals',
      description: 'Learn the basics of network security and common attack vectors',
      order: 1,
      duration: '2 weeks',
      difficulty: 'beginner',
      prerequisites: [],
      topics: [
        {
          id: 'tcp-ip',
          title: 'TCP/IP Protocol Suite',
          description: 'Understanding network protocols and their security implications',
          content: '...',
          type: 'theory',
          resources: ['network-analysis-guide'],
          labId: 'wireshark-lab'
        },
        // More topics...
      ],
      tools: [
        {
          id: 'wireshark',
          name: 'Wireshark',
          description: 'Network protocol analyzer',
          category: 'network',
          setupInstructions: '...',
          documentationUrl: 'https://www.wireshark.org/docs/'
        }
      ]
    },
    // More modules...
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Module Navigation */}
        <div className="md:col-span-1">
          <nav className="space-y-2">
            {modules.map(module => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 
                  ${activeModule === module.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}
              >
                <Book className="h-5 w-5" />
                <span>{module.title}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Module Content */}
        <div className="md:col-span-3">
          {activeModule && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              {modules.find(m => m.id === activeModule)?.topics.map(topic => (
                <div key={topic.id} className="mb-6">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setActiveTopic(topic.id)}
                  >
                    <div className="flex items-center space-x-3">
                      {topic.type === 'practical' ? (
                        <Terminal className="h-5 w-5 text-green-500" />
                      ) : (
                        <Book className="h-5 w-5 text-blue-500" />
                      )}
                      <h3 className="font-medium">{topic.title}</h3>
                    </div>
                    {topic.labId && (
                      <span className="text-sm text-green-600">Lab Available</span>
                    )}
                  </div>

                  {activeTopic === topic.id && (
                    <div className="mt-4 pl-8">
                      <p className="text-gray-600 mb-4">{topic.description}</p>
                      {topic.labId && (
                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                          Launch Lab Environment
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContent; 