import { useContext, useEffect, useState } from "react";
import ExpenseItem from "./expense-item.component";
import { Container } from "react-bootstrap";
import ApiClient from "../../utils/backend-api";
import { UserContext, UserContextType } from "../../contexts/user.context";

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
    const [expensesData, setExpensesData] = useState<ExpenseApiResponse[] | null>(null);
    const { currentUser } = useContext(UserContext) as UserContextType;

    useEffect(() => {
        /**
         * This function doesn't have to be as complicated if the object could simply be built on the backend side.
         */
        const client = currentUser?.apiClient;
        if (!client) {
            return;
        }

        const getExpenses = async () => {
            const expensesContent = await client.getExpenses()
            const categoriesContent = await client.getCategories()
            const usersContent = await client.getUsers()

            let categoriesMap = new Map<number, CategoryApiResponse>();
            categoriesContent.map((category: CategoryApiResponse) => {
                categoriesMap.set(category.id, category);
            })

            let usersMap: Map<number, UserApiResponse> = new Map<number, UserApiResponse>();
            usersContent.map((user: UserApiResponse) => {
                usersMap.set(user.id, user);
            })

            const expenses: ExpenseApiResponse[] = expensesContent.map((item: any) => {
                return {
                    ...item, 'user_obj': usersMap.get(item.registered_by_user), 'category_obj': categoriesMap.get(item.category)
                }
            });

            setExpensesData(expenses);
        }

        getExpenses();
    }, [currentUser])

    return (
        <Container>
            <h1>Expenses</h1>

            {expensesData ? (
                <div>
                    <div>
                        <h2>Filters</h2>
                        <form className="form-floating">
                            <select className="form-select" aria-label="Filter by category">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <button type="submit" className="btn btn-sm btn-primary">Submit</button>
                        </form>
                    </div>
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
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    );
}

export default ExpensesList;
