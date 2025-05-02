// Types for the Admin Panel

export type UserRole = "admin" | "editor" | "viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  status: "active" | "inactive";
}

export type QuestionCategory =
  | "Math"
  | "Science"
  | "History"
  | "Geography"
  | "Literature";

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  correctOptionId: string;
  category: QuestionCategory;
  explanation?: {
    videoUrl?: string;
    text?: string;
  };
  createdAt: string;
}

export interface Banner {
  _id: string;
  url: string;
  title?: string;
  linkUrl?: string;
  active?: boolean;
  createdAt: string;
  // Add any other fields that might be in your backend model
}
