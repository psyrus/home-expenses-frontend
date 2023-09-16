import { Fragment } from 'react';
import ExpenseForm from '../../components/expense/expense-form.component';
import logo from '../../logo.svg';
import LoginComponent from '../../components/login/login.component';

const Home = () => {

  return (
    <div className="App">
      <LoginComponent />
      <ExpenseForm></ExpenseForm>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload. This is Trevor typing
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default Home;