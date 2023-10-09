import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Expenses from './routes/expenses/expenses.component';
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index={true} element={<Home />}></Route>
        <Route path="/expenses" Component={Expenses} />
        {/* <Route path="/login" Component={Login} /> */}
      </Route>
    </Routes>
  );
};

export default App;
