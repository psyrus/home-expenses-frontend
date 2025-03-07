import { useContext, useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import { UserContext, UserContextType } from "../../contexts/user.context";

export type FormFields = {
  category: number,
  description: string,
  expense_date: string,
  cost: number,
};

export type Category = {
  id: number;
  name: string;
}

const defaultFormFields: FormFields = {
  category: -1,
  description: '',
  expense_date: '',
  cost: 0,
}

const ExpenseForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [categories, setCategories] = useState<Category[]>([]);
  const { currentUser } = useContext(UserContext) as UserContextType;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields, category: parseInt(value)
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
    if (!currentUser) {
      return;
    }

    const getCategories = async () => {
      const tmpCategories = await currentUser.apiClient.getCategories()
      setCategories(tmpCategories);
      setFormFields({ ...formFields, category: tmpCategories[0].id })
    }

    getCategories();
  }, [currentUser])

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser) {
      return;
    }

    const myBody = {
      ...formFields,
      "registered_by_user": currentUser?.id,
    }

    currentUser.apiClient.addExpense(myBody)
      .then((response) => {
        console.log(response);
      });

    setFormFields({ ...defaultFormFields, category: categories[0].id });
  }

  return (
    <div className="col-lg-6 col-md-8 mx-auto">
      <h1 className="h3 mb-3 fw-normal">Expense Entry</h1>
      {
        currentUser ? (
          <form onSubmit={handleSubmit} className="text-start">
            <Row>
              <div className="col-sm-6 mb-3">
                <label htmlFor="form_category" className="form-label">Category</label>
                <select value={formFields.category} name="category" id="form_category" className="form-select" onChange={handleSelectChange} aria-label="Default select example">
                  {categories.map(option => (
                    <option key={option.id} value={option.id} >{option.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-sm-6 mb-3">
                <label htmlFor="form_cost" className="form-label">Cost</label>
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">¥</span>
                  <input type="number" className="form-control" name="cost" id="form_cost" placeholder="" min="100" onChange={handleChange} required value={formFields.cost} />
                </div>
                <div className="invalid-feedback">
                  Value must be greater than 100.
                </div>
              </div>
            </Row>
            <div className="col-12 mb-3">
              <label htmlFor="form_description" className="form-label">Description</label>
              <textarea className="form-control" name="description" id="form_description" minLength={2} required onChange={handleChangeTextArea} placeholder="Description of expense" value={formFields.description}></textarea>
            </div>
            <div className="col-12 mb-3">
              <label htmlFor="form_expense_date" className="form-label">Date of Purchase</label>
              <input type="date" className="form-control" id="form_expense_date" name="expense_date" onChange={handleChange} required value={formFields.expense_date}></input>
            </div>
            <button type="submit" className="w-100 btn btn-lg btn-primary">Submit</button>
          </form>
        ) : (
          <div>User needs to log in</div>
        )
      }
    </div>
  );
};

export default ExpenseForm;
