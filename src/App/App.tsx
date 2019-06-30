import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { MainRouter } from '../components/MainRouter';
import { HomePage } from '../components/HomePage';
import { LoginPage } from '../components/LoginPage';

import './App.scss';

export function App() {
    return (
        <Router>
            <div>
                <MainRouter exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
            </div>
        </Router>
    );

}
