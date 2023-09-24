import { request } from "http";
import { useEffect, useState } from "react";

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
    console.log("hey!")
    e.preventDefault();

    console.log(formFields);

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
    <div className="expense-form">
      <form onSubmit={handleSubmit}>
        <label>Category</label>
        <select value={formFields.category} name="category" onChange={handleSelectChange}>
          {categories.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </select>
        {
          formFields.category === 'other' ? <input type="text" placeholder="Add new category" onChange={handleChange}></input> : ""
        }
        <label>Description</label>
        <input type="text" name="description" minLength={2} required onChange={handleChange}></input>
        <label>Date of Purchase</label>
        <input type="date" name="expense_date" onChange={handleChange}></input>

        <label>Cost</label>
        <input type="number" name="cost" placeholder="Value in ¥" min="100" onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
