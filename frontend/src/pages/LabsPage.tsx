import React from 'react';
import Labs from '../components/Labs';
import TerminalSimulator from '../components/TerminalSimulator';

const LabsPage = () => {
  return (
    <div className="space-y-8">
      <Labs />
      <div className="max-w-4xl mx-auto">
        <TerminalSimulator />
      </div>
    </div>
  );
};

export default LabsPage;
