import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { DataTable } from '@/components/ui/data-table';
import { Banner } from '@/lib/types';
import { api } from '@/lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit, Eye, ExternalLink, Plus } from 'lucide-react';
import { Button } from '@/components/ui/form-elements';
import Modal from '@/components/ui/modal';
import { BannerForm } from './BannerForm';

const BannerList: React.FC = () => {
  const queryClient = useQueryClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);

  const { data: banners = [], isLoading, isError } = useQuery<Banner[]>({
    queryKey: ['banners'],
    queryFn: async () => {
      const data = await api.getBanners();
      console.log('Fetched banners:', data);
      return data;
    },
    retry: 1,
  });

  const updateMutation = useMutation({
    mutationFn: (formData: FormData) => {
      const id = formData.get('_id') as string;
      return api.updateBanner(id, Object.fromEntries(formData) as unknown as Partial<Banner>);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      setIsEditModalOpen(false);
      setSelectedBanner(null);
    },
  });

  const createMutation = useMutation({
    mutationFn: (formData: FormData) => {
      return api.uploadBanner(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      setIsCreateModalOpen(false);
    },
  });

  const handleEditBanner = (formData: FormData) => {
    updateMutation.mutate(formData);
  };

  const handleCreateBanner = (formData: FormData) => {
    createMutation.mutate(formData);
  };

  const columns = [
    {
      header: 'Image',
      accessorKey: 'url' as keyof Banner,
      cell: (banner: Banner) => (
        <div className="w-16 h-12 relative overflow-hidden rounded border border-gray-200">
          <img
            src={banner.url}
            alt={banner.title || 'Banner'}
            className="absolute w-full h-full object-cover"
          />
        </div>
      ),
    },
    {
      header: 'Title',
      accessorKey: 'title' as keyof Banner,
      cell: (banner: Banner) => banner.title || 'Untitled Banner',
    },
    {
      header: 'Link',
      accessorKey: 'linkUrl' as keyof Banner,
      cell: (banner: Banner) => banner.linkUrl ? (
        <div className="flex items-center text-blue-600">
          <a
            href={banner.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate max-w-xs hover:underline flex items-center"
            onClick={(e) => e.stopPropagation()} // Prevent row click
          >
            {banner.linkUrl}
            <ExternalLink size={14} className="ml-1 flex-shrink-0" />
          </a>
        </div>
      ) : (
        <span className="text-gray-400">No link</span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'active' as keyof Banner,
      cell: (banner: Banner) => (
        <span className={`px-2 py-1 text-xs rounded-full ${banner.active
          ? 'bg-green-100 text-green-800'
          : 'bg-gray-100 text-gray-800'
          }`}>
          {banner.active ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt' as keyof Banner,
      cell: (banner: Banner) => new Date(banner.createdAt).toLocaleDateString(),
    },
  ];

  const actions = (banner: Banner) => (
    <div className="flex space-x-2 justify-end">
      <Button
        variant="outline"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedBanner(banner);
          setIsViewModalOpen(true);
        }}
      >
        <Eye size={16} className="mr-1" /> View
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedBanner(banner);
          setIsEditModalOpen(true);
        }}
      >
        <Edit size={16} className="mr-1" /> Edit
      </Button>
    </div>
  );

  return (
    <AdminLayout>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Banner Management</h1>
            <p className="text-gray-600">Manage the promotional banners for your application</p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center"
          >
            <Plus size={16} className="mr-1" /> Create Banner
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : isError ? (
        <div className="flex flex-col justify-center items-center h-64 text-red-500">
          <p className="text-lg font-semibold mb-2">Error loading banners</p>
          <p className="text-sm">Please check your backend connection and try again</p>
          <p className="text-xs mt-4">Make sure your backend is running on localhost:8000</p>
        </div>
      ) : banners.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-64 text-gray-500">
          <p className="text-lg font-semibold mb-2">No banners found</p>
          <p className="text-sm">Please check your backend API</p>
        </div>
      ) : (
        <DataTable
          data={banners}
          columns={columns}
          searchable
          searchKeys={['title']}
          actions={actions}
          onRowClick={(banner) => {
            setSelectedBanner(banner);
            setIsViewModalOpen(true);
          }}
        />
      )}

      {/* Edit Banner Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Banner"
      >
        {selectedBanner && (
          <BannerForm
            initialData={selectedBanner}
            onSubmit={handleEditBanner}
            isLoading={updateMutation.isPending}
          />
        )}
      </Modal>

      {/* View Banner Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Banner Preview"
      >
        {selectedBanner && (
          <div className="space-y-4">
            <div className="aspect-video bg-gray-100 rounded-md overflow-hidden border border-gray-200">
              <img
                src={selectedBanner.url}
                alt={selectedBanner.title || 'Banner'}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-800">{selectedBanner.title}</h3>

              {selectedBanner.linkUrl && (
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Link:</span>
                  <a
                    href={selectedBanner.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center text-sm"
                  >
                    {selectedBanner.linkUrl}
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              )}

              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Status:</span>
                <span className={`px-2 py-1 text-xs rounded-full ${selectedBanner.active
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
                  }`}>
                  {selectedBanner.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Created:</span>
                <span className="text-sm">
                  {new Date(selectedBanner.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Banner Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Banner"
      >
        <BannerForm
          onSubmit={handleCreateBanner}
          isLoading={createMutation.isPending}
        />
      </Modal>
    </AdminLayout>
  );
};

export default BannerList;
