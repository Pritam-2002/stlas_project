
import React, { useState } from 'react';
import { Button, Input, Select, Textarea, FileInput } from '@/components/ui/form-elements';
import { Question, QuestionCategory, QuestionOption } from '@/lib/types';
import { mockDataService } from '@/lib/mock-data';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Plus, Video } from 'lucide-react';

interface QuestionFormProps {
  initialData?: Question;
  onSubmit: (data: Omit<Question, 'id' | 'createdAt'> | Partial<Question>) => void;
  isLoading?: boolean;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Partial<Question>>(
    initialData || {
      text: '',
      options: [
        { id: uuidv4(), text: '' },
        { id: uuidv4(), text: '' },
        { id: uuidv4(), text: '' },
        { id: uuidv4(), text: '' },
      ],
      correctOptionId: '',
      category: 'Math',
      explanation: undefined,
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(!!initialData?.explanation);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleOptionChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options?.map((option) =>
        option.id === id ? { ...option, text: value } : option
      ),
    }));

    // Clear option-related errors
    if (errors[`option-${id}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`option-${id}`];
        return newErrors;
      });
    }
  };

  const handleAddOption = () => {
    if (formData.options?.length && formData.options.length >= 10) {
      setErrors((prev) => ({
        ...prev,
        options: 'Maximum 10 options allowed',
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      options: [...(prev.options || []), { id: uuidv4(), text: '' }],
    }));
  };

  const handleRemoveOption = (id: string) => {
    if (formData.options?.length && formData.options.length <= 2) {
      setErrors((prev) => ({
        ...prev,
        options: 'Minimum 2 options required',
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      options: prev.options?.filter((option) => option.id !== id),
      correctOptionId: prev.correctOptionId === id ? '' : prev.correctOptionId,
    }));
  };

  const handleExplanationTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      explanation: {
        ...prev.explanation,
        text: value,
      },
    }));
  };

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      explanation: {
        ...prev.explanation,
        videoUrl: value,
      },
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.text?.trim()) {
      newErrors.text = 'Question text is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    // Validate options
    if (!formData.options || formData.options.length < 2) {
      newErrors.options = 'At least 2 options are required';
    } else {
      formData.options.forEach((option) => {
        if (!option.text.trim()) {
          newErrors[`option-${option.id}`] = 'Option text is required';
        }
      });
    }

    // Validate correct answer
    if (!formData.correctOptionId) {
      newErrors.correctOptionId = 'Please select the correct answer';
    }

    // Validate explanation if enabled
    if (showExplanation) {
      if (
        !formData.explanation?.text?.trim() &&
        !formData.explanation?.videoUrl?.trim()
      ) {
        newErrors.explanation = 'Please provide either text or video explanation';
      }

      if (
        formData.explanation?.videoUrl &&
        !isValidUrl(formData.explanation.videoUrl)
      ) {
        newErrors.videoUrl = 'Please enter a valid URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If explanation is not enabled, remove it from the form data
    if (!showExplanation) {
      setFormData((prev) => ({
        ...prev,
        explanation: undefined,
      }));
    }
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const categories = mockDataService.getQuestionCategories().map((category) => ({
    value: category,
    label: category,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        label="Question Text"
        id="text"
        name="text"
        placeholder="Enter your question"
        value={formData.text || ''}
        onChange={handleChange}
        error={errors.text}
        required
      />

      <Select
        label="Category"
        id="category"
        name="category"
        value={formData.category || ''}
        onChange={handleChange}
        options={categories}
        error={errors.category}
        required
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Options
        </label>
        {errors.options && <p className="text-sm text-red-500 mb-2">{errors.options}</p>}
        <div className="space-y-3">
          {formData.options?.map((option, index) => (
            <div key={option.id} className="flex items-start space-x-3">
              <div className="flex-grow">
                <div className="flex items-center mb-1">
                  <input
                    type="radio"
                    id={`correct-${option.id}`}
                    name="correctOptionId"
                    value={option.id}
                    checked={formData.correctOptionId === option.id}
                    onChange={(e) => setFormData((prev) => ({ ...prev, correctOptionId: e.target.value }))}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label htmlFor={`correct-${option.id}`} className="ml-2 block text-sm text-gray-700">
                    Correct Answer
                  </label>
                </div>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-gray-500 bg-gray-50 rounded-l-md border border-r-0 border-gray-300">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => handleOptionChange(option.id, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className={`flex-grow px-3 py-2 border ${
                      errors[`option-${option.id}`] ? 'border-red-500' : 'border-gray-300'
                    } rounded-r-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                </div>
                {errors[`option-${option.id}`] && (
                  <p className="mt-1 text-sm text-red-500">{errors[`option-${option.id}`]}</p>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleRemoveOption(option.id)}
                className="mt-6"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddOption}
            className="w-full flex items-center justify-center"
          >
            <Plus size={16} className="mr-1" /> Add Option
          </Button>
        </div>
        {errors.correctOptionId && (
          <p className="mt-2 text-sm text-red-500">{errors.correctOptionId}</p>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="includeExplanation"
            checked={showExplanation}
            onChange={(e) => setShowExplanation(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="includeExplanation" className="text-sm font-medium text-gray-700">
            Include explanation
          </label>
        </div>
      </div>

      {showExplanation && (
        <div className="p-4 bg-gray-50 rounded-md mb-4">
          <h3 className="font-medium text-gray-700 mb-3">Explanation</h3>
          
          <Textarea
            label="Text Explanation"
            id="explanationText"
            name="explanationText"
            placeholder="Enter text explanation"
            value={formData.explanation?.text || ''}
            onChange={handleExplanationTextChange}
          />

          <div className="mb-4">
            <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <Video size={16} className="mr-1" /> Video Explanation URL
              </div>
            </label>
            <input
              type="url"
              id="videoUrl"
              name="videoUrl"
              placeholder="https://example.com/video"
              value={formData.explanation?.videoUrl || ''}
              onChange={handleVideoUrlChange}
              className={`w-full px-3 py-2 border ${
                errors.videoUrl ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.videoUrl && <p className="mt-1 text-sm text-red-500">{errors.videoUrl}</p>}
          </div>
          
          {errors.explanation && <p className="text-sm text-red-500 mb-2">{errors.explanation}</p>}
        </div>
      )}

      <div className="flex justify-end space-x-3 mt-6">
        <Button type="submit" isLoading={isLoading}>
          {initialData ? 'Update Question' : 'Create Question'}
        </Button>
      </div>
    </form>
  );
};
