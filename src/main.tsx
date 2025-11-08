import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.tsx'
import {BrowserRouter, Route, Router, Routes} from "react-router";

const root = document.getElementById('root');

// @ts-ignore
ReactDOM.createRoot(root).render(
    <BrowserRouter>
            <App/>
    </BrowserRouter>
)