import React from 'react';
import { Play, Pause, RefreshCw, Terminal } from 'lucide-react';

interface Lab {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'stopped' | 'running' | 'loading';
  type: 'network' | 'web' | 'system';
}

const Labs = () => {
  const [labs, setLabs] = React.useState<Lab[]>([
    {
      id: '1',
      title: 'Network Packet Analysis',
      description: 'Practice analyzing network traffic using Wireshark in a controlled environment.',
      difficulty: 'beginner',
      status: 'stopped',
      type: 'network'
    },
    {
      id: '2',
      title: 'Web Application Security',
      description: 'Test for common web vulnerabilities in a safe testing environment.',
      difficulty: 'intermediate',
      status: 'running',
      type: 'web'
    },
    {
      id: '3',
      title: 'System Exploitation',
      description: 'Learn about system vulnerabilities in an isolated environment.',
      difficulty: 'advanced',
      status: 'stopped',
      type: 'system'
    }
  ]);

  const getStatusColor = (status: Lab['status']) => {
    switch (status) {
      case 'running': return 'text-green-500';
      case 'loading': return 'text-yellow-500';
      default: return 'text-red-500';
    }
  };

  const getDifficultyBadge = (difficulty: Lab['difficulty']) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    return colors[difficulty];
  };

  const toggleLabStatus = (labId: string) => {
    setLabs(prev => prev.map(lab => {
      if (lab.id === labId) {
        return {
          ...lab,
          status: lab.status === 'running' ? 'stopped' : 'running'
        };
      }
      return lab;
    }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Practice Labs</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labs.map(lab => (
          <div key={lab.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-medium text-lg">{lab.title}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyBadge(lab.difficulty)} mt-2`}>
                  {lab.difficulty}
                </span>
              </div>
              <Terminal className="w-6 h-6 text-gray-400" />
            </div>
            
            <p className="text-gray-600 mb-4">{lab.description}</p>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex items-center">
                <span className={`flex items-center ${getStatusColor(lab.status)}`}>
                  <span className="h-2 w-2 rounded-full bg-current mr-2" />
                  {lab.status}
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => toggleLabStatus(lab.id)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  {lab.status === 'running' ? (
                    <Pause className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Play className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <RefreshCw className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Labs; 