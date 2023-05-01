import Home from '@/pages/Home';
import Editor from '@/pages/Editor';
import Login from "@/pages/Login";
import {Navigate} from 'react-router-dom'
import FontEditorLayout from "../FontEditorLayout"
import AuthRouter from "./AuthRouter.js"
import React from "react"

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
    element: <AuthRouter><FontEditorLayout /></AuthRouter>,
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