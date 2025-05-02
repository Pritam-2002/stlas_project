
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-lg px-6">
        <h1 className="text-4xl font-bold mb-4 text-slate-800">Admin Panel</h1>
        <p className="text-xl text-slate-600 mb-8">A powerful admin interface for managing your application</p>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4 text-slate-700">Available Modules</h2>
          <ul className="text-left space-y-3">
            <li className="flex items-center text-slate-600">
              <span className="bg-indigo-100 text-indigo-600 p-1 rounded-full mr-2">✓</span> 
              User Management
            </li>
            <li className="flex items-center text-slate-600">
              <span className="bg-indigo-100 text-indigo-600 p-1 rounded-full mr-2">✓</span> 
              Questions & Answers
            </li>
            <li className="flex items-center text-slate-600">
              <span className="bg-indigo-100 text-indigo-600 p-1 rounded-full mr-2">✓</span> 
              Banner Management
            </li>
          </ul>
        </div>
        
        <Link 
          to="/admin" 
          className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 transition-colors"
        >
          Enter Admin Panel <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default Index;
