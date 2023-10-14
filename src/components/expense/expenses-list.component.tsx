import { useEffect, useState } from "react";
import ExpenseItem from "./expense-item.component";
import { Container } from "react-bootstrap";
import ApiClient from "../../utils/backend-api";

// TODO: DELETE JUST FOR TESTING
import SortableTableTwo from "./sortable-table2.component";

const client = new ApiClient()

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
    const [sortConfig, setSortConfig] = useState({key: '', direction: 'asc'})

    const handleSort = (key: keyof ExpenseApiResponse) => {
        console.log("sorting by", key)
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        const sortedData = [...expensesData].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        })
        console.log(sortedData)
        setSortConfig({ key, direction });
        setExpensesData(sortedData)
    }

    useEffect(() => {
        /**
         * This function doesn't have to be as complicated if the object could simply be built on the backend side.
         */
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
    }, [])

    return (
        <Container>
            <h1>Expenses</h1>

            {expensesData ? (
                <table className="table table-sm table-hover">
                    <thead>
                        <tr>
                            <th scope="col" onClick={() => handleSort('id')}>#</th>
                            <th scope="col" onClick={() => handleSort('category')}>Category</th>
                            <th scope="col" onClick={() => handleSort('cost')}>Cost</th>
                            <th scope="col" onClick={() => handleSort('description')}>Description</th>
                            <th scope="col" onClick={() => handleSort('registered_by_user')}>Registered by User</th>
                            <th scope="col" onClick={() => handleSort('expense_date')}>Expense Date</th>
                            <th scope="col" onClick={() => handleSort('paid_back')}>Paid Back</th>
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
