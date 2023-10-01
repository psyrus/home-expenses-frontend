import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// const defaultOptions = [
//   { value: '', text: '--Choose an option--' },
//   { value: 'kid', text: 'Kid' },
//   { value: 'health', text: 'Health' },
//   { value: 'home', text: 'Home' },
//   { value: 'other', text: 'Other' },
// ];

const defaultFormFields = {
  category: '',
  description: '',
  expense_date: '',
  cost: 0,
}

export type Category = {
  id: number;
  name: string;
}

const ExpenseForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [categories, setCategories] = useState<Category[]>([]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields, 'category': value
    })
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormFields({
      ...formFields,
      [name]: value
    });
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormFields({
      ...formFields,
      [name]: value
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const endpoint: string = "http://localhost:5000/categories"
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'mode': 'no-cors'
        }
      };
      const response = await fetch(endpoint, requestOptions);
      const content = await response.json();
      setCategories(content);
    }

    getCategories();
    console.log('fetch effect is firing');
  }, [])

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const myBody = {
      ...formFields,
      "registered_by_user": 1,
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'mode': 'no-cors'
      },
      body: JSON.stringify(myBody)
    };

    fetch('http://localhost:5000/expense', requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((content) => {
        console.log(content);
      });
  }

  return (
    <Container>
      <div className="col-lg-6 col-md-8 mx-auto">
        <h1 className="h3 mb-3 fw-normal">Expense Entry</h1>
        <form onSubmit={handleSubmit} className="text-start">
          <Row>
            <div className="col-sm-6 mb-3">
              <label htmlFor="form_category" className="form-label">Category</label>
              <select value={formFields.category} name="category" id="form_category" className="form-select" onChange={handleSelectChange} aria-label="Default select example">
                {categories.map(option => (
                  <option key={option.id} value={option.id} >{option.name}</option>
                ))}
              </select>
              {
                formFields.category === 'Other' ? <input type="text" placeholder="Add new category" name="new_category" onChange={handleChange}></input> : ""
              }
            </div>
            <div className="col-sm-6 mb-3">
              <label htmlFor="form_cost" className="form-label">Cost</label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">¥</span>
                <input type="number" className="form-control" name="cost" id="form_cost" placeholder="" min="100" onChange={handleChange} required />
              </div>
              <div className="invalid-feedback">
                Value must be greater than 100.
              </div>
            </div>
          </Row>
          <div className="col-12 mb-3">
            <label htmlFor="form_description" className="form-label">Description</label>
            <textarea className="form-control" name="description" id="form_description" minLength={2} required onChange={handleChangeTextArea} placeholder="Description of expense"></textarea>
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="form_expense_date" className="form-label">Date of Purchase</label>
            <input type="date" className="form-control" id="form_expense_date" name="expense_date" onChange={handleChange} required></input>
          </div>
          <button type="submit" className="w-100 btn btn-lg btn-primary">Submit</button>
        </form>
      </div>
    </Container>
  );
};

export default ExpenseForm;
