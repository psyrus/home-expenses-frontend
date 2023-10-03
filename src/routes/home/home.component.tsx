import ExpenseForm from '../../components/expense/expense-form.component';
import Container from 'react-bootstrap/Container';

const Home = () => {
  return (
    <Container>
      <div className='px-4 pt-5 my-5 text-center'>
        <ExpenseForm></ExpenseForm>
      </div>
    </Container>
  );
};

export default Home;
