import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Expenses from './routes/expenses/expenses.component';
import SortableTableTwo from './components/expense/sortable-table2.component';
import './App.css';
import Misc from './routes/misc/misc.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index={true} element={<Home />}></Route>
        <Route path="/expenses" Component={Expenses} />
        <Route path="/misc" Component={Misc} />
      </Route>
    </Routes>
  );
};

export default App;
