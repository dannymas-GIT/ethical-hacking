import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import ProgressPage from '../pages/ProgressPage';
import ResourcesPage from '../pages/ResourcesPage';
import LabsPage from '../pages/LabsPage';
import ToolsPage from '../pages/ToolsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'progress',
        element: <ProgressPage />,
      },
      {
        path: 'resources',
        element: <ResourcesPage />,
      },
      {
        path: 'labs',
        element: <LabsPage />,
      },
      {
        path: 'tools',
        element: <ToolsPage />,
      },
    ],
  },
]); 