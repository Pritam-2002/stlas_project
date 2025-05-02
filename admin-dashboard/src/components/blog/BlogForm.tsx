import React, { useState, useRef } from 'react';
import { Input, Button } from '@/components/ui/form-elements';
import { Plus, X, Loader2, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type FAQItem = {
  question: string;
  answer: string;
};

interface BlogFormProps {
  onClose: () => void;
  initialData?: {
    _id?: string;
    blogTitle?: string;
    blogPostContent?: string;
    blogimage?: string;
    faq?: FAQItem[];
  };
}

export function BlogForm({ onClose, initialData }: BlogFormProps) {
  const [title, setTitle] = useState(initialData?.blogTitle || '');
  const [content, setContent] = useState(initialData?.blogPostContent || '');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [faqs, setFaqs] = useState<FAQItem[]>(initialData?.faq || []);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.blogimage || null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // Create blog mutation
  const createBlogMutation = useMutation({
    mutationFn: (formData: FormData) => {
      return api.createBlog(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog'] });
      toast.success('Blog post created successfully');
      onClose();
    },
    onError: (error: any) => {
      console.error('Error creating blog:', error);
      toast.error(error?.response?.data?.error || 'Failed to create blog post');
    },
  });

  // Update blog mutation
  const updateBlogMutation = useMutation({
    mutationFn: (formData: FormData) => {
      return api.updateBlog(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog'] });
      toast.success('Blog post updated successfully');
      onClose();
    },
    onError: (error: any) => {
      console.error('Error updating blog:', error);
      toast.error(error?.response?.data?.error || 'Failed to update blog post');
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Create a preview URL for the selected file
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Clear error if any
      if (errors.file) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.file;
          return newErrors;
        });
      }
    }
  };

  const handleAddFAQ = () => {
    if (faqs.length < 5) {
      setFaqs([...faqs, { question: '', answer: '' }]);
    } else {
      toast.error("Maximum 5 FAQs allowed");
    }
  };

  const handleRemoveFAQ = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const handleFAQChange = (index: number, field: 'question' | 'answer', value: string) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!content.trim()) {
      newErrors.content = 'Content is required';
    }

    if (!selectedFile && !initialData?.blogimage) {
      newErrors.file = 'Please select an image file';
    }

    // Validate FAQs if there are any
    faqs.forEach((faq, index) => {
      if (faq.question.trim() === '') {
        newErrors[`faq-${index}-question`] = 'Question is required';
      }
      if (faq.answer.trim() === '') {
        newErrors[`faq-${index}-answer`] = 'Answer is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append('blogTitle', title);
      formData.append('blogPostContent', content);
      
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
      
      formData.append('faq', JSON.stringify(faqs));

      // If editing, include the ID
      if (initialData?._id) {
        formData.append('_id', initialData._id);
        updateBlogMutation.mutate(formData);
      } else {
        createBlogMutation.mutate(formData);
      }
    }
  };

  const isSubmitting = createBlogMutation.isPending || updateBlogMutation.isPending;
  const maxFAQsReached = faqs.length >= 5;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          className="text-xl font-medium px-3 py-3 border-2 focus:border-blue-500" 
          required
          error={errors.title}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500 flex items-center">
            <AlertCircle size={14} className="mr-1" /> {errors.title}
          </p>
        )}
      </div>

      <div className="mb-6">
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog content here..."
          className={`w-full min-h-[260px] p-4 border-2 rounded-md ${
            errors.content ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
          }`}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-500 flex items-center">
            <AlertCircle size={14} className="mr-1" /> {errors.content}
          </p>
        )}
      </div>

      <div className="mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="flex flex-col items-center justify-center">
              {imagePreview ? (
                <div className="w-full mb-4">
                  <img
                    src={imagePreview}
                    alt="Blog image preview"
                    className="max-h-64 max-w-full mx-auto object-contain"
                  />
                </div>
              ) : (
                <div className="mb-2 text-gray-500">
                  <svg className="h-12 w-12 mx-auto text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span>Upload blog image</span>
                <input
                  id="file-upload"
                  name="file"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          {errors.file && (
            <p className="mt-2 text-sm text-red-500 text-center flex items-center justify-center">
              <AlertCircle size={14} className="mr-1" /> {errors.file}
            </p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <p className="text-lg font-medium text-gray-800">Frequently Asked Questions</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddFAQ}
            disabled={maxFAQsReached || isSubmitting}
            className={maxFAQsReached ? "opacity-50 cursor-not-allowed" : ""}
          >
            <Plus size={16} className="mr-1" /> Add FAQ {faqs.length}/5
          </Button>
        </div>
        
        {faqs.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-md">
            <p className="text-gray-500">No FAQs added yet. Click 'Add FAQ' to create one.</p>
          </div>
        )}
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="p-4 border rounded-md relative transition-all hover:shadow-md bg-white"
            >
              <button
                type="button"
                onClick={() => handleRemoveFAQ(index)}
                className="absolute right-2 top-2 text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100"
              >
                <X size={16} />
              </button>
              <div className="mb-3">
                <Input
                  id={`faq-question-${index}`}
                  placeholder="Enter question"
                  value={faq.question}
                  onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                  className="font-medium"
                  error={errors[`faq-${index}-question`]}
                />
              </div>
              <div>
                <Input
                  id={`faq-answer-${index}`}
                  placeholder="Enter answer"
                  value={faq.answer}
                  onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                  error={errors[`faq-${index}-answer`]}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose} 
          disabled={isSubmitting}
          className="px-6"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="px-6"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              {initialData ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>{initialData ? 'Update' : 'Create'} Blog Post</>
          )}
        </Button>
      </div>
    </form>
  );
}