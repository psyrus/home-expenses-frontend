import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthenticationHandler from './routes/authentication/authentication.component';
import Expenses from './routes/expenses/expenses.component';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Groups from './routes/groups/groups.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index={true} element={<Home />}></Route>
        <Route path="/expenses" Component={Expenses} />
        <Route path="/groups" Component={Groups} />
        <Route path="/auth" Component={AuthenticationHandler} />
      </Route>
    </Routes>
  );
};

export default App;
