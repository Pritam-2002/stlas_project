
import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { DataTable } from '@/components/ui/data-table';
import { Question, QuestionCategory } from '@/lib/types';
import { mockDataService } from '@/lib/mock-data';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Check, X, Eye } from 'lucide-react';
import { Button, Select } from '@/components/ui/form-elements';
import Modal from '@/components/ui/modal';
import { QuestionForm } from './QuestionForm';
import { QuestionDetail } from './QuestionDetail';

const QuestionList: React.FC = () => {
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<QuestionCategory | ''>('');

  const { data: questions = [], isLoading } = useQuery<Question[]>({
    queryKey: ['questions'],
    queryFn: () => mockDataService.getQuestions(),
  });

  const filteredQuestions = categoryFilter
    ? questions.filter(q => q.category === categoryFilter)
    : questions;

  const createMutation = useMutation({
    mutationFn: (question: Omit<Question, 'id' | 'createdAt'>) => 
      mockDataService.createQuestion(question),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      setIsAddModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Question> }) => 
      mockDataService.updateQuestion(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      setIsEditModalOpen(false);
      setSelectedQuestion(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => mockDataService.deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      setIsDeleteModalOpen(false);
      setSelectedQuestion(null);
    },
  });

  const handleAddQuestion = (question: Omit<Question, 'id' | 'createdAt'>) => {
    createMutation.mutate(question);
  };

  const handleEditQuestion = (data: Partial<Question>) => {
    if (selectedQuestion) {
      updateMutation.mutate({ id: selectedQuestion.id, data });
    }
  };

  const handleDeleteQuestion = () => {
    if (selectedQuestion) {
      deleteMutation.mutate(selectedQuestion.id);
    }
  };

  const columns = [
    {
      header: 'Question',
      accessorKey: 'text' as keyof Question,
      cell: (question: Question) => {
        // Limit the question text to a certain length
        const maxLength = 60;
        const text = question.text;
        return text.length > maxLength
          ? `${text.substring(0, maxLength)}...`
          : text;
      },
    },
    {
      header: 'Category',
      accessorKey: 'category' as keyof Question,
      cell: (question: Question) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          question.category === 'Math' 
            ? 'bg-blue-100 text-blue-800' 
            : question.category === 'Science'
            ? 'bg-green-100 text-green-800'
            : question.category === 'History'
            ? 'bg-yellow-100 text-yellow-800'
            : question.category === 'Geography'
            ? 'bg-purple-100 text-purple-800'
            : 'bg-pink-100 text-pink-800' // Literature
        }`}>
          {question.category}
        </span>
      ),
    },
    {
      header: 'Has Explanation',
      accessorKey: 'explanation' as keyof Question,
      cell: (question: Question) => (
        <span className={question.explanation ? 'text-green-600' : 'text-red-600'}>
          {question.explanation ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt' as keyof Question,
      cell: (question: Question) => new Date(question.createdAt).toLocaleDateString(),
    },
  ];

  const actions = (question: Question) => (
    <div className="flex space-x-2 justify-end">
      <Button
        variant="outline"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedQuestion(question);
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
          setSelectedQuestion(question);
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
          setSelectedQuestion(question);
          setIsDeleteModalOpen(true);
        }}
      >
        <Trash2 size={16} className="mr-1" /> Delete
      </Button>
    </div>
  );

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Question Management</h1>
          <p className="text-gray-600">Manage your questions and answers</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row md:items-center gap-4">
          <div className="w-full md:w-48">
            <Select
              label=""
              id="categoryFilter"
              name="categoryFilter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as QuestionCategory | '')}
              options={[
                { value: '', label: 'All Categories' },
                ...mockDataService.getQuestionCategories().map(category => ({
                  value: category,
                  label: category
                }))
              ]}
            />
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center"
          >
            <Plus size={16} className="mr-1" /> Add Question
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <DataTable
          data={filteredQuestions}
          columns={columns}
          searchable
          searchKeys={['text', 'category']}
          actions={actions}
          onRowClick={(question) => {
            setSelectedQuestion(question);
            setIsViewModalOpen(true);
          }}
        />
      )}

      {/* Add Question Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Question"
        size="lg"
      >
        <QuestionForm
          onSubmit={handleAddQuestion}
          isLoading={createMutation.isPending}
        />
      </Modal>

      {/* Edit Question Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Question"
        size="lg"
      >
        {selectedQuestion && (
          <QuestionForm
            initialData={selectedQuestion}
            onSubmit={handleEditQuestion}
            isLoading={updateMutation.isPending}
          />
        )}
      </Modal>

      {/* View Question Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Question Details"
        size="lg"
      >
        {selectedQuestion && (
          <QuestionDetail 
            question={selectedQuestion}
            onEdit={() => {
              setIsViewModalOpen(false);
              setIsEditModalOpen(true);
            }}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Question"
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
            Are you sure you want to delete this question? This action cannot be undone.
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
              onClick={handleDeleteQuestion}
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

export default QuestionList;
