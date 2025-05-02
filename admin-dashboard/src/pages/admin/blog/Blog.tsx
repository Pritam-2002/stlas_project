import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/form-elements';
import { Edit, Plus } from 'lucide-react';
import Modal from '@/components/ui/modal';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { BlogForm } from '@/components/blog/BlogForm';

function Blog() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const queryClient = useQueryClient();

    // Fetch single blog post
    const { data: blog, isLoading } = useQuery({
        queryKey: ['blog'],
        queryFn: () => api.getBlog(),
    });

    return (
        <AdminLayout>
            <div className="mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Blog Post</h1>
                        <p className="text-gray-600">Manage your blog post</p>
                    </div>
                    {!blog && (
                        <Button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center"
                        >
                            <Plus size={16} className="mr-1" /> Create Blog Post
                        </Button>
                    )}
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            ) : blog ? (
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-xl font-semibold">{blog.blogTitle}</h2>
                            <p className="text-gray-500 text-sm">
                                {new Date(blog.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditModalOpen(true)}
                        >
                            <Edit size={16} className="mr-1" /> Edit
                        </Button>
                    </div>
                    <div className="prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: blog.blogPostContent }} />
                    </div>
                    
                    {blog.blogimage && (
                        <div className="mt-4">
                            <img 
                                src={blog.blogimage} 
                                alt="Blog header image" 
                                className="max-h-60 rounded"
                            />
                        </div>
                    )}
                    
                    {blog.faq && blog.faq.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
                            <div className="space-y-4">
                                {blog.faq.map((faqItem: any, index: number) => (
                                    <div key={index} className="border-b pb-3">
                                        <h4 className="font-medium text-gray-900">{faqItem.question}</h4>
                                        <p className="text-gray-600 mt-1">{faqItem.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <p className="text-gray-500">No blog post created yet</p>
                    <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        variant="outline"
                        className="mt-4"
                    >
                        <Plus size={16} className="mr-1" /> Create Blog Post
                    </Button>
                </div>
            )}

            {/* Enhanced modals with larger size and better UI */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create Blog Post"
                className="max-w-4xl" // Increased modal size
            >
                <div className="p-2"> {/* Add padding for more comfortable spacing */}
                    <BlogForm onClose={() => setIsCreateModalOpen(false)} />
                </div>
            </Modal>

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Blog Post"
                className="max-w-4xl" // Increased modal size
            >
                <div className="p-2"> {/* Add padding for more comfortable spacing */}
                    <BlogForm
                        onClose={() => setIsEditModalOpen(false)}
                        initialData={blog}
                    />
                </div>
            </Modal>
        </AdminLayout>
    );
}

export default Blog;