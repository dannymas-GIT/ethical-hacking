import React, { useState } from 'react';
import { Book, Video, Code, Download, ExternalLink, Search, Filter, Tag } from 'lucide-react';

const ResourceLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');

  const resources = [
    {
      id: 1,
      title: 'Network Protocol Analysis',
      type: 'guide',
      topic: 'networking',
      difficulty: 'intermediate',
      description: 'Comprehensive guide to analyzing network protocols using Wireshark',
      icon: Book,
      downloadUrl: '#'
    },
    {
      id: 2,
      title: 'SQL Injection Prevention',
      type: 'tutorial',
      topic: 'web-security',
      difficulty: 'advanced',
      description: 'Learn how to prevent SQL injection attacks in web applications',
      icon: Video,
      downloadUrl: '#'
    },
    {
      id: 3,
      title: 'Python Security Scripts',
      type: 'code',
      topic: 'scripting',
      difficulty: 'beginner',
      description: 'Collection of Python scripts for security testing',
      icon: Code,
      downloadUrl: '#'
    }
  ];

  const topics = [
    { id: 'all', label: 'All Topics' },
    { id: 'networking', label: 'Networking' },
    { id: 'web-security', label: 'Web Security' },
    { id: 'scripting', label: 'Scripting' }
  ];

  const types = [
    { id: 'all', label: 'All Types' },
    { id: 'guide', label: 'Guides' },
    { id: 'tutorial', label: 'Tutorials' },
    { id: 'code', label: 'Code Samples' }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesTopic = selectedTopic === 'all' || resource.topic === selectedTopic;
    return matchesSearch && matchesType && matchesTopic;
  });

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'text-green-500',
      intermediate: 'text-yellow-500',
      advanced: 'text-red-500'
    };
    return colors[difficulty] || 'text-gray-500';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Resource Library</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div>
          <select
            className="w-full p-2 border rounded-lg"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {types.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            className="w-full p-2 border rounded-lg"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            {topics.map(topic => (
              <option key={topic.id} value={topic.id}>{topic.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => (
          <div key={resource.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <resource.icon className="w-6 h-6 text-blue-500" />
                <h3 className="font-medium">{resource.title}</h3>
              </div>
              <span className={`text-sm font-medium capitalize ${getDifficultyColor(resource.difficulty)}`}>
                {resource.difficulty}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{resource.description}</p>
            
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500 capitalize">{resource.topic.replace('-', ' ')}</span>
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between">
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-700">
                <ExternalLink className="w-4 h-4" />
                <span>Preview</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceLibrary;