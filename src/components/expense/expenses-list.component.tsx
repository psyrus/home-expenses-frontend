import { useEffect, useState } from "react";
import ExpenseItem from "./expense-item.component";
import { Container } from "react-bootstrap";

export type ExpenseApiResponse = {
    "category": number,
    "category_obj": CategoryApiResponse,
    "cost": number,
    "created_at": string,
    "description": string,
    "expense_date": string,
    "id": number,
    "paid_back": boolean,
    "registered_by_user": number,
    "user_obj": UserApiResponse,
    "updated_at": string
}

export type CategoryApiResponse = {
    "id": number,
    "name": string
}

export type UserApiResponse = {
    id: number,
    auth_provider_id: string,
    created_at: string,
    email: string,
    username: string
}

const ExpensesList = () => {
    const [expensesData, setExpensesData] = useState<ExpenseApiResponse[]>([]);

    useEffect(() => {
        /**
         * This function doesn't have to be as complicated if the object could simply be built on the backend side.
         */
        const getExpenses = async () => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'mode': 'no-cors'
                }
            };

            const expensesEndpoint: string = "http://localhost:5000/expenses"
            const categoriesEndpoint: string = "http://localhost:5000/categories"
            const usersEndpoint: string = "http://localhost:5000/users"

            const usersResponse = await fetch(usersEndpoint, requestOptions);
            const categoriesResponse = await fetch(categoriesEndpoint, requestOptions);
            const expensesResponse = await fetch(expensesEndpoint, requestOptions);

            const usersContent = await usersResponse.json();
            const categoriesContent = await categoriesResponse.json();
            const expensesContent = await expensesResponse.json();

            let categoriesMap = new Map<number, CategoryApiResponse>();
            categoriesContent.map((category: CategoryApiResponse) => {
                categoriesMap.set(category.id, category);
            })

            let usersMap: Map<number, UserApiResponse> = new Map<number, UserApiResponse>();
            usersContent.map((user: UserApiResponse) => {
                usersMap.set(user.id, user);
            })

            console.log(categoriesMap);
            console.log(usersMap);

            const expenses: ExpenseApiResponse[] = expensesContent.map((item: any) => {
                return {
                    ...item, 'user_obj': usersMap.get(item.registered_by_user), 'category_obj': categoriesMap.get(item.category)
                }
            });

            setExpensesData(expenses);
        }

        getExpenses();
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
