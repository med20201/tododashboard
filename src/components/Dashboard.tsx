import React, { useState } from 'react';
import { Task } from '../types';
import Header from './Header';
import PerformanceIndicators from './PerformanceIndicators';
import TaskTable from './TaskTable';
import TaskModal from './TaskModal';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Développer le module d\'authentification',
      description: 'Implémenter le système de connexion avec validation',
      status: 'completed',
      priority: 'high',
      assignee: 'Jean Dupont',
      dueDate: '2025-01-20',
      createdAt: '2025-01-10T10:00:00Z',
      completedAt: '2025-01-18T14:30:00Z'
    },
    {
      id: '2',
      title: 'Concevoir l\'interface utilisateur',
      description: 'Créer les maquettes et prototypes pour l\'application',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'Marie Martin',
      dueDate: '2025-01-25',
      createdAt: '2025-01-12T09:00:00Z'
    },
    {
      id: '3',
      title: 'Tester les fonctionnalités',
      description: 'Effectuer les tests unitaires et d\'intégration',
      status: 'todo',
      priority: 'medium',
      assignee: 'Pierre Leroy',
      dueDate: '2025-01-30',
      createdAt: '2025-01-15T11:00:00Z'
    },
    {
      id: '4',
      title: 'Optimiser les performances',
      description: 'Améliorer la vitesse de chargement et l\'efficacité',
      status: 'overdue',
      priority: 'high',
      assignee: 'Sophie Bernard',
      dueDate: '2025-01-15',
      createdAt: '2025-01-08T08:00:00Z'
    },
    {
      id: '5',
      title: 'Documenter l\'API',
      description: 'Rédiger la documentation technique complète',
      status: 'todo',
      priority: 'low',
      assignee: 'Antoine Rousseau',
      dueDate: '2025-02-05',
      createdAt: '2025-01-16T13:00:00Z'
    },
    {
      id: '6',
      title: 'Configurer l\'environnement de production',
      description: 'Mettre en place les serveurs et la CI/CD',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Émilie Moreau',
      dueDate: '2025-01-28',
      createdAt: '2025-01-14T16:00:00Z'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const handleAddTask = () => {
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      // Modifier une tâche existante
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...taskData }
          : task
      ));
    } else {
      // Créer une nouvelle tâche
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, newTask]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <PerformanceIndicators tasks={tasks} />
        
        <TaskTable
          tasks={tasks}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onAddTask={handleAddTask}
        />
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
};

export default Dashboard;