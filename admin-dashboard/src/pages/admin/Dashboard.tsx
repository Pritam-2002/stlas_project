
import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { User, Question, Banner } from '@/lib/types';
import { mockDataService } from '@/lib/mock-data';
import { useQuery } from '@tanstack/react-query';
import { Users, FileQuestion, Image, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  linkTo: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, trend, linkTo }) => {
  return (
    <Link 
      to={linkTo}
      className="bg-white rounded-lg shadow p-6 flex flex-col transition-transform hover:scale-105"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      {change && (
        <div className={`text-sm flex items-center ${
          trend === 'up' ? 'text-green-500' : 
          trend === 'down' ? 'text-red-500' : 
          'text-gray-500'
        }`}>
          {trend === 'up' && '↑'}
          {trend === 'down' && '↓'}
          {change}
        </div>
      )}
    </Link>
  );
};

interface RecentActivityProps {
  title: string;
  data: {
    id: string;
    title: string;
    timestamp: string;
    type: 'user' | 'question' | 'banner';
  }[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ title, data }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.id} className="px-6 py-4 flex items-center">
              <div className={`p-2 rounded-full mr-4 ${
                item.type === 'user' ? 'bg-blue-100 text-blue-600' :
                item.type === 'question' ? 'bg-purple-100 text-purple-600' :
                'bg-orange-100 text-orange-600'
              }`}>
                {item.type === 'user' && <Users size={16} />}
                {item.type === 'question' && <FileQuestion size={16} />}
                {item.type === 'banner' && <Image size={16} />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-4 text-center text-gray-500">No recent activity</div>
        )}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { data: users = [] } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => mockDataService.getUsers(),
  });

  const { data: questions = [] } = useQuery<Question[]>({
    queryKey: ['questions'],
    queryFn: () => mockDataService.getQuestions(),
  });

  const { data: banners = [] } = useQuery<Banner[]>({
    queryKey: ['banners'],
    queryFn: () => mockDataService.getBanners(),
  });

  // Generate mock recent activity
  const recentActivity = [
    {
      id: '1',
      title: 'New user registered',
      timestamp: new Date().toISOString(),
      type: 'user' as const,
    },
    {
      id: '2',
      title: 'Question updated',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      type: 'question' as const,
    },
    {
      id: '3',
      title: 'New banner added',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      type: 'banner' as const,
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={users.length}
          icon={<Users size={24} />}
          change="+5% from last week"
          trend="up"
          linkTo="/admin/users"
        />
        <StatCard
          title="Total Questions"
          value={questions.length}
          icon={<FileQuestion size={24} />}
          change="Same as last week"
          trend="neutral"
          linkTo="/admin/questions"
        />
        <StatCard
          title="Active Banners"
          value={banners.filter(b => b.active).length}
          icon={<Image size={24} />}
          change="-2% from last week"
          trend="down"
          linkTo="/admin/banners"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity
          title="Recent Activity"
          data={recentActivity}
        />
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Quick Stats</h3>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Detailed statistics will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
