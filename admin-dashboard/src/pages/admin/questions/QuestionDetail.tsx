
import React from 'react';
import { Question } from '@/lib/types';
import { Button } from '@/components/ui/form-elements';
import { Edit, Video } from 'lucide-react';

interface QuestionDetailProps {
  question: Question;
  onEdit: () => void;
}

export const QuestionDetail: React.FC<QuestionDetailProps> = ({ question, onEdit }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Question</h3>
        <div className="p-4 bg-gray-50 rounded-md">
          <p>{question.text}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Options</h3>
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <div 
              key={option.id} 
              className={`p-3 border rounded-md flex items-center ${
                option.id === question.correctOptionId
                  ? 'bg-green-50 border-green-300'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full mr-3">
                {String.fromCharCode(65 + index)}
              </div>
              <div className="flex-grow">
                <p>{option.text}</p>
              </div>
              {option.id === question.correctOptionId && (
                <div className="ml-3 px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                  Correct Answer
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Category</h3>
        <div className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
          {question.category}
        </div>
      </div>

      {question.explanation && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Explanation</h3>
          
          {question.explanation.text && (
            <div className="p-4 bg-gray-50 rounded-md mb-4">
              <p>{question.explanation.text}</p>
            </div>
          )}

          {question.explanation.videoUrl && (
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Video className="h-5 w-5 text-gray-500 mr-1" />
                <h4 className="text-md font-medium text-gray-700">Video Explanation</h4>
              </div>
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <a 
                  href={question.explanation.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-3 hover:bg-gray-50 text-blue-600 flex items-center"
                >
                  <span className="underline">{question.explanation.videoUrl}</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <Button onClick={onEdit} className="flex items-center">
          <Edit size={16} className="mr-1" /> Edit Question
        </Button>
      </div>
    </div>
  );
};
