
import React, { useState, useRef } from 'react';
import { Button, Input } from '@/components/ui/form-elements';
import { Banner } from '@/lib/types';

interface BannerFormProps {
  initialData?: Banner;
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export const BannerForm: React.FC<BannerFormProps> = ({
  initialData,
   onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Partial<Banner>>(
    initialData || {
      linkUrl: '',
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.url || null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedFile && !initialData) {
      newErrors.file = 'Please select an image file';
    }

    if (formData.linkUrl) {
      try {
        new URL(formData.linkUrl);
      } catch (e) {
        newErrors.linkUrl = 'Please enter a valid URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const formDataToSubmit = new FormData();

      // Add file if selected
      if (selectedFile) {
        formDataToSubmit.append('file', selectedFile);
      }

      // Add link URL if provided
      if (formData.linkUrl) formDataToSubmit.append('linkUrl', formData.linkUrl);

      // If editing, include the ID
      if (initialData?._id) {
        formDataToSubmit.append('_id', initialData._id);
      }

      onSubmit(formDataToSubmit);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Banner Image {!initialData && <span className="text-red-500">*</span>}
        </label>
        <div className="mt-1 flex items-center">
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span>Upload a file</span>
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
          <span className="ml-3 text-sm text-gray-500">
            {selectedFile ? selectedFile.name : 'No file selected'}
          </span>
        </div>
        {errors.file && (
          <p className="mt-1 text-sm text-red-600">{errors.file}</p>
        )}
      </div>

      {imagePreview && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image Preview
          </label>
          <div className="border border-gray-300 rounded-md overflow-hidden bg-gray-50 h-40 flex items-center justify-center">
            <img
              src={imagePreview}
              alt="Banner preview"
              className="max-w-full max-h-full object-contain"
              onError={() => {
                setErrors((prev) => ({
                  ...prev,
                  file: 'Invalid image',
                }));
                setImagePreview(null);
              }}
            />
          </div>
        </div>
      )}

      <Input
        label="Link URL (Optional)"
        id="linkUrl"
        name="linkUrl"
        placeholder="https://example.com/page"
        value={formData.linkUrl || ''}
        onChange={handleChange}
        error={errors.linkUrl}
      />

      <div className="flex justify-end space-x-3 mt-6">
        <Button type="submit" isLoading={isLoading}>
          {initialData ? 'Update Banner' : 'Create Banner'}
        </Button>
      </div>
    </form>
  );
};
