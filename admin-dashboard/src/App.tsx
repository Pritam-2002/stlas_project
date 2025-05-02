
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/admin/Dashboard";
import UserList from "./pages/admin/users/UserList";
import QuestionList from "./pages/admin/questions/QuestionList";
import BannerList from "./pages/admin/banners/BannerList";
import Login from "./pages/admin/Login";
import { AuthProvider, ProtectedRoute } from "./contexts/AuthContext";
import Blog from "./pages/admin/blog/Blog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin/login" element={<Login />} />
            
            {/* Admin Routes - Protected */}
            <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
            <Route path="/admin/questions" element={<ProtectedRoute><QuestionList /></ProtectedRoute>} />
            <Route path="/admin/banners" element={<ProtectedRoute><BannerList /></ProtectedRoute>} />
            <Route path="/admin/blog" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
            
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
