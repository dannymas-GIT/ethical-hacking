import React, { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';

interface Command {
  input: string;
  output: string;
  isError?: boolean;
}

interface TerminalSimulatorProps {
  initialCommands?: Command[];
  allowedCommands?: string[];
  onCommand?: (command: string) => Promise<string>;
}

const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({
  initialCommands = [],
  allowedCommands = [],
  onCommand
}) => {
  const [commands, setCommands] = useState<Command[]>(initialCommands);
  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleCommand = async () => {
    if (!currentInput.trim()) return;

    const newCommand: Command = {
      input: currentInput,
      output: '',
      isError: false
    };

    try {
      if (onCommand) {
        const output = await onCommand(currentInput);
        newCommand.output = output;
      } else {
        newCommand.output = `Command not found: ${currentInput}`;
        newCommand.isError = true;
      }
    } catch (error: unknown) {
      newCommand.output = `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;
      newCommand.isError = true;
    }

    setCommands(prev => [...prev, newCommand]);
    setCurrentInput('');
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  return (
    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
      <div className="flex items-center space-x-2 mb-4 text-gray-400 border-b border-gray-700 pb-2">
        <Terminal size={16} />
        <span>Terminal</span>
      </div>
      
      <div 
        ref={terminalRef}
        className="h-96 overflow-y-auto space-y-2 text-gray-200"
      >
        {commands.map((cmd, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-green-400">$</span>
              <span>{cmd.input}</span>
            </div>
            {cmd.output && (
              <div className={`pl-4 ${cmd.isError ? 'text-red-400' : 'text-gray-400'}`}>
                {cmd.output}
              </div>
            )}
          </div>
        ))}
        
        <div className="flex items-center space-x-2">
          <span className="text-green-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
            className="bg-transparent focus:outline-none flex-1"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalSimulator; 