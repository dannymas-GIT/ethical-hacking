import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface KnowledgeTestProps {
  questions: Question[];
  onComplete?: (score: number) => void;
}

const KnowledgeTest: React.FC<KnowledgeTestProps> = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: optionIndex
    }));
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const score = calculateScore();
      setIsComplete(true);
      onComplete?.(score);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === questionId);
      if (question && question.correctAnswer === answer) {
        correct++;
      }
    });
    return (correct / questions.length) * 100;
  };

  const question = questions[currentQuestion];
  const selectedAnswer = answers[question.id];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
      {!isComplete ? (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Question {currentQuestion + 1}/{questions.length}</h3>
              <span className="text-sm text-gray-500">
                Progress: {Math.round((currentQuestion / questions.length) * 100)}%
              </span>
            </div>
            <p className="text-gray-800">{question.text}</p>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showExplanation}
                className={`w-full text-left p-3 rounded-lg border transition-colors
                  ${showExplanation
                    ? index === question.correctAnswer
                      ? 'bg-green-50 border-green-500'
                      : selectedAnswer === index
                      ? 'bg-red-50 border-red-500'
                      : 'border-gray-200'
                    : 'hover:bg-gray-50 border-gray-200'
                  }`}
              >
                {option}
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex items-center space-x-2">
                {isCorrect ? (
                  <CheckCircle className="text-green-500" />
                ) : (
                  <XCircle className="text-red-500" />
                )}
                <p className="font-medium">
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
              </div>
              <p className="mt-2 text-gray-600">{question.explanation}</p>
              <button
                onClick={nextQuestion}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Test'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Test Complete!</h3>
          <p className="text-lg mb-4">Your score: {calculateScore()}%</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retake Test
          </button>
        </div>
      )}
    </div>
  );
};

export default KnowledgeTest; 