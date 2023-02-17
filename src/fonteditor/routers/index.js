import Home from '@/pages/Home';
import Editor from '@/pages/Editor';
import React from 'react';
import { Navigate } from 'react-router-dom'

const routes = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/editor",
    element: <Editor />,
  },
];

export default routes;