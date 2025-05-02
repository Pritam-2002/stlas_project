
import { User, Question, Banner, QuestionCategory, UserRole } from './types';
import { v4 as uuidv4 } from 'uuid';

// Mock users data
export const mockUsers: User[] = [
  {
    id: uuidv4(),
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: new Date().toISOString(),
    status: 'active',
  },
  {
    id: uuidv4(),
    name: 'Editor User',
    email: 'editor@example.com',
    role: 'editor',
    createdAt: new Date().toISOString(),
    status: 'active',
  },
  {
    id: uuidv4(),
    name: 'Viewer User',
    email: 'viewer@example.com',
    role: 'viewer',
    createdAt: new Date().toISOString(),
    status: 'inactive',
  },
];

// Mock questions data
export const mockQuestions: Question[] = [
  {
    id: uuidv4(),
    text: 'What is the capital of France?',
    options: [
      { id: uuidv4(), text: 'London' },
      { id: uuidv4(), text: 'Berlin' },
      { id: uuidv4(), text: 'Paris' },
      { id: uuidv4(), text: 'Madrid' },
    ],
    correctOptionId: '3', // Paris
    category: 'Geography',
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    text: 'What is 2 + 2?',
    options: [
      { id: uuidv4(), text: '3' },
      { id: uuidv4(), text: '4' },
      { id: uuidv4(), text: '5' },
      { id: uuidv4(), text: '22' },
    ],
    correctOptionId: '2', // 4
    category: 'Math',
    explanation: {
      text: 'The sum of 2 and 2 is 4.',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    text: 'Who wrote "Romeo and Juliet"?',
    options: [
      { id: uuidv4(), text: 'Charles Dickens' },
      { id: uuidv4(), text: 'William Shakespeare' },
      { id: uuidv4(), text: 'Jane Austen' },
      { id: uuidv4(), text: 'F. Scott Fitzgerald' },
    ],
    correctOptionId: '2', // William Shakespeare
    category: 'Literature',
    createdAt: new Date().toISOString(),
  },
];

// Mock banners data
export const mockBanners: Banner[] = [
  {
    id: uuidv4(),
    title: 'Welcome Banner',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    linkUrl: '/welcome',
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Promotion Banner',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    linkUrl: '/promo',
    active: false,
    createdAt: new Date().toISOString(),
  },
];

// Mock data service
export const mockDataService = {
  // User services
  getUsers: () => Promise.resolve([...mockUsers]),
  getUserById: (id: string) => Promise.resolve(mockUsers.find(user => user.id === id)),
  createUser: (user: Omit<User, 'id' | 'createdAt'>) => {
    const newUser = {
      ...user,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    mockUsers.push(newUser as User);
    return Promise.resolve(newUser);
  },
  updateUser: (id: string, data: Partial<User>) => {
    const index = mockUsers.findIndex(user => user.id === id);
    if (index !== -1) {
      mockUsers[index] = { ...mockUsers[index], ...data };
      return Promise.resolve(mockUsers[index]);
    }
    return Promise.reject(new Error('User not found'));
  },
  deleteUser: (id: string) => {
    const index = mockUsers.findIndex(user => user.id === id);
    if (index !== -1) {
      mockUsers.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.reject(new Error('User not found'));
  },

  // Question services
  getQuestions: () => Promise.resolve([...mockQuestions]),
  getQuestionById: (id: string) => Promise.resolve(mockQuestions.find(q => q.id === id)),
  createQuestion: (question: Omit<Question, 'id' | 'createdAt'>) => {
    const newQuestion = {
      ...question,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    mockQuestions.push(newQuestion as Question);
    return Promise.resolve(newQuestion);
  },
  updateQuestion: (id: string, data: Partial<Question>) => {
    const index = mockQuestions.findIndex(q => q.id === id);
    if (index !== -1) {
      mockQuestions[index] = { ...mockQuestions[index], ...data };
      return Promise.resolve(mockQuestions[index]);
    }
    return Promise.reject(new Error('Question not found'));
  },
  deleteQuestion: (id: string) => {
    const index = mockQuestions.findIndex(q => q.id === id);
    if (index !== -1) {
      mockQuestions.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.reject(new Error('Question not found'));
  },

  // Banner services
  getBanners: () => Promise.resolve([...mockBanners]),
  getBannerById: (id: string) => Promise.resolve(mockBanners.find(b => b.id === id)),
  createBanner: (banner: Omit<Banner, 'id' | 'createdAt'>) => {
    const newBanner = {
      ...banner,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    mockBanners.push(newBanner as Banner);
    return Promise.resolve(newBanner);
  },
  updateBanner: (id: string, data: Partial<Banner>) => {
    const index = mockBanners.findIndex(b => b.id === id);
    if (index !== -1) {
      mockBanners[index] = { ...mockBanners[index], ...data };
      return Promise.resolve(mockBanners[index]);
    }
    return Promise.reject(new Error('Banner not found'));
  },
  deleteBanner: (id: string) => {
    const index = mockBanners.findIndex(b => b.id === id);
    if (index !== -1) {
      mockBanners.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.reject(new Error('Banner not found'));
  },

  // Helper methods
  getQuestionCategories: (): QuestionCategory[] => ['Math', 'Science', 'History', 'Geography', 'Literature'],
  getUserRoles: (): UserRole[] => ['admin', 'editor', 'viewer'],
};
