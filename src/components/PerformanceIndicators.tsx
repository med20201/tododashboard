import React from 'react';
import { Task } from '../types';
import { TrendingUp, Clock, CheckCircle, AlertTriangle, Users } from 'lucide-react';

interface PerformanceIndicatorsProps {
  tasks: Task[];
}

const PerformanceIndicators: React.FC<PerformanceIndicatorsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const overdueTasks = tasks.filter(task => task.status === 'overdue').length;
  const todoTasks = tasks.filter(task => task.status === 'todo').length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const overdueRate = totalTasks > 0 ? Math.round((overdueTasks / totalTasks) * 100) : 0;

  const indicators = [
    {
      title: 'Taux de Completion',
      value: `${completionRate}%`,
      change: '+5.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Tâches Terminées',
      value: completedTasks.toString(),
      change: `${totalTasks} total`,
      trend: 'neutral',
      icon: CheckCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'En Cours',
      value: inProgressTasks.toString(),
      change: 'Active',
      trend: 'neutral',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      title: 'En Retard',
      value: overdueTasks.toString(),
      change: `${overdueRate}% du total`,
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {indicators.map((indicator, index) => (
        <div
          key={index}
          className={`bg-white border ${indicator.borderColor} rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 ${indicator.bgColor} rounded-lg`}>
              <indicator.icon className={`w-6 h-6 ${indicator.color}`} />
            </div>
            {indicator.trend === 'up' && (
              <span className="text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded">
                {indicator.change}
              </span>
            )}
            {indicator.trend === 'down' && (
              <span className="text-red-600 text-sm font-medium bg-red-50 px-2 py-1 rounded">
                {indicator.change}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{indicator.value}</h3>
            <p className="text-sm text-gray-600">{indicator.title}</p>
            {indicator.trend === 'neutral' && (
              <p className="text-xs text-gray-500 mt-1">{indicator.change}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceIndicators;