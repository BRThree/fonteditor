import Home from '@/pages/Home';
import Editor from '@/pages/Editor';
import Login from "@/pages/Login";
import React from 'react';
import { Navigate } from 'react-router-dom'
import FontEditorLayout from "../FontEditorLayout";

export const mainRoutes = [
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "editor",
    element: <Editor />,
  },
]

const routes = [
  {
    path: '/index/*',
    element: <FontEditorLayout />,
    children: mainRoutes
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <Navigate to="/index/home" />
  }
];

export default routes;