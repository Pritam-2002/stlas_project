
import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { DataTable } from '@/components/ui/data-table';
import { User, UserRole } from '@/lib/types';
import { mockDataService } from '@/lib/mock-data';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/form-elements';
import Modal from '@/components/ui/modal';
import { UserForm } from './UserForm';

const UserList: React.FC = () => {
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => mockDataService.getUsers(),
  });

  const createMutation = useMutation({
    mutationFn: (user: Omit<User, 'id' | 'createdAt'>) => mockDataService.createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsAddModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) => 
      mockDataService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsEditModalOpen(false);
      setSelectedUser(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => mockDataService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    },
  });

  const handleAddUser = (user: Omit<User, 'id' | 'createdAt'>) => {
    createMutation.mutate(user);
  };

  const handleEditUser = (data: Partial<User>) => {
    if (selectedUser) {
      updateMutation.mutate({ id: selectedUser.id, data });
    }
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      deleteMutation.mutate(selectedUser.id);
    }
  };

  const columns = [
    {
      header: 'Name',
      accessorKey: 'name' as keyof User,
    },
    {
      header: 'Email',
      accessorKey: 'email' as keyof User,
    },
    {
      header: 'Role',
      accessorKey: 'role' as keyof User,
      cell: (user: User) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          user.role === 'admin' 
            ? 'bg-purple-100 text-purple-800' 
            : user.role === 'editor'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {user.role}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status' as keyof User,
      cell: (user: User) => (
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${
            user.status === 'active' ? 'bg-green-500' : 'bg-red-500'
          }`} />
          {user.status}
        </div>
      ),
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt' as keyof User,
      cell: (user: User) => new Date(user.createdAt).toLocaleDateString(),
    },
  ];

  const actions = (user: User) => (
    <div className="flex space-x-2 justify-end">
      <Button
        variant="outline"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedUser(user);
          setIsEditModalOpen(true);
        }}
      >
        <Edit size={16} className="mr-1" /> Edit
      </Button>
      <Button
        variant="danger"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedUser(user);
          setIsDeleteModalOpen(true);
        }}
      >
        <Trash2 size={16} className="mr-1" /> Delete
      </Button>
    </div>
  );

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600">Manage your users and their permissions</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center"
        >
          <Plus size={16} className="mr-1" /> Add User
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <DataTable
          data={users}
          columns={columns}
          searchable
          searchKeys={['name', 'email', 'role']}
          actions={actions}
        />
      )}

      {/* Add User Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New User"
      >
        <UserForm
          onSubmit={handleAddUser}
          isLoading={createMutation.isPending}
        />
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit User"
      >
        {selectedUser && (
          <UserForm
            initialData={selectedUser}
            onSubmit={handleEditUser}
            isLoading={updateMutation.isPending}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete User"
        size="sm"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Confirm Deletion
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to delete the user "{selectedUser?.name}"? This action cannot be undone.
          </p>
          <div className="flex justify-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              <X size={16} className="mr-1" /> Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteUser}
              isLoading={deleteMutation.isPending}
            >
              <Check size={16} className="mr-1" /> Delete
            </Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default UserList;
