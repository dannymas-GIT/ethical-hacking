import React from 'react';
import { Terminal, Shield, Network, Database } from 'lucide-react';

const ToolsPage = () => {
  const tools = [
    {
      name: 'Network Scanner',
      description: 'Scan and analyze network vulnerabilities',
      icon: Network,
      status: 'available',
      category: 'network'
    },
    {
      name: 'SQL Injection Tester',
      description: 'Test web applications for SQL injection vulnerabilities',
      icon: Database,
      status: 'available',
      category: 'web'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Security Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <tool.icon className="h-6 w-6 text-blue-500" />
              <h3 className="font-medium">{tool.name}</h3>
            </div>
            <p className="text-gray-600 mb-4">{tool.description}</p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Launch Tool
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;
