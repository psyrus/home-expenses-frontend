import { useState } from "react";

const defaultOptions = [
  { value: '', text: '--Choose an option--' },
  { value: 'kid', text: 'Kid' },
  { value: 'health', text: 'Health' },
  { value: 'home', text: 'Home' },
  { value: 'other', text: 'Other' },
];

const defaultFormFields = {
  category: '',
  description: '',
  purchaseDate: '',
  cost: 0,
}

const ExpenseForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

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

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    console.log("hey!")
    e.preventDefault();

    console.log(formFields);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'mode': 'no-cors'
      },
      body: JSON.stringify(formFields)
    };

    fetch('http://localhost:5000/expenses/add', requestOptions)
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
          {defaultOptions.map(option => (
            <option key={option.value} value={option.value}>{option.text}</option>
          ))}
        </select>
        {
          formFields.category === 'other' ? <input type="text" placeholder="Add new category" onChange={handleChange}></input> : ""
        }
        <label>Description</label>
        <input type="text" name="description" minLength={2} required onChange={handleChange}></input>
        <label>Date of Purchase</label>
        <input type="date" name="purchaseDate" onChange={handleChange}></input>

        <label>Cost</label>
        <input type="number" name="cost" placeholder="Value in ¥" min="100" onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
