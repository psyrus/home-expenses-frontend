import { useEffect, useState } from "react";
import ExpenseItem from "./expense-item.component";
import { Container } from "react-bootstrap";

export type ExpenseApiResponse = {
    "category": number,
    "cost": number,
    "created_at": string,
    "description": string,
    "expense_date": string,
    "id": number,
    "paid_back": boolean,
    "registered_by_user": number,
    "updated_at": string
}

const ExpensesList = () => {
    const [expensesData, setExpensesData] = useState<ExpenseApiResponse[]>([]);
    const [categoriesData, setCategoriesData] = useState(null);
    const [usersData, setUsersData] = useState(null);

    useEffect(() => {
        const getExpenses = async () => {
            const endpoint: string = "http://localhost:5000/expenses"
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'mode': 'no-cors'
                }
            };
            const r = await fetch(endpoint, requestOptions);
            const content = await r.json();
            setExpensesData(content);
        }
        const getCategories = async () => {
            const endpoint: string = "http://localhost:5000/categories"
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'mode': 'no-cors'
                }
            };
            const r = await fetch(endpoint, requestOptions);
            const content = await r.json();
            setCategoriesData(content);
        }
        const getUsers = async () => {
            const endpoint: string = "http://localhost:5000/users"
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'mode': 'no-cors'
                }
            };
            const r = await fetch(endpoint, requestOptions);
            const content = await r.json();
            setUsersData(content);
        }
        getUsers();
        getExpenses();
        getCategories();
    }, [])

    return (
        <Container>
            <h1>Expenses</h1>

            {expensesData ? (
                <table className="table table-sm table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Category</th>
                            <th scope="col">Cost</th>
                            <th scope="col">Description</th>
                            <th scope="col">Registered by User</th>
                            <th scope="col">Expense Date</th>
                            <th scope="col">Paid Back</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {
                            expensesData.map((apiItem) => {
                                return <ExpenseItem item={apiItem} key={apiItem.id} />
                            })}
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    );
}

export default ExpensesList;
