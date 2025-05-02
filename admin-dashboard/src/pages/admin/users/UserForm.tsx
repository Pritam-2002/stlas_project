
import React, { useState } from 'react';
import { Button, Input, Select } from '@/components/ui/form-elements';
import { User, UserRole } from '@/lib/types';
import { mockDataService } from '@/lib/mock-data';

interface UserFormProps {
  initialData?: User;
  onSubmit: (data: Omit<User, 'id' | 'createdAt'> | Partial<User>) => void;
  isLoading?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Partial<User>>(
    initialData || {
      name: '',
      email: '',
      role: 'viewer',
      status: 'active',
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const roles = mockDataService.getUserRoles().map((role) => ({
    value: role,
    label: role.charAt(0).toUpperCase() + role.slice(1),
  }));

  const statuses = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Name"
        id="name"
        name="name"
        placeholder="Enter name"
        value={formData.name || ''}
        onChange={handleChange}
        error={errors.name}
        required
      />

      <Input
        label="Email"
        id="email"
        name="email"
        type="email"
        placeholder="Enter email"
        value={formData.email || ''}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <Select
        label="Role"
        id="role"
        name="role"
        value={formData.role || ''}
        onChange={handleChange}
        options={roles}
        error={errors.role}
        required
      />

      <Select
        label="Status"
        id="status"
        name="status"
        value={formData.status || ''}
        onChange={handleChange}
        options={statuses}
        error={errors.status}
        required
      />

      <div className="flex justify-end space-x-3 mt-6">
        <Button type="submit" isLoading={isLoading}>
          {initialData ? 'Update User' : 'Create User'}
        </Button>
      </div>
    </form>
  );
};
