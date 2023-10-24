import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { UserContext, UserContextType } from "../../contexts/user.context";
import ExpenseItem from "./expense-item.component";

export type ExpenseApiResponse = {
  "category": number,
  "category_obj": CategoryApiResponse,
  "cost": number,
  "created_at": string,
  "description": string,
  "expense_date": Date,
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

export type SortConfig = {
  key: string,
  direction: string
}

const ExpensesList = () => {
  const [expensesData, setExpensesData] = useState<ExpenseApiResponse[]>([]);
  const [filteredExpensesData, setFilteredExpensesData] = useState<ExpenseApiResponse[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: 'asc' });
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterCost, setFilterCost] = useState<number>(0);
  const { currentUser } = useContext(UserContext) as UserContextType;

  const handleSort = (key: keyof ExpenseApiResponse) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const sortedData = [...filteredExpensesData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    })
    setSortConfig({ key, direction });
    setFilteredExpensesData(sortedData);
  }

  useEffect(() => {
    const tmpFilteredItems = expensesData.filter((item: ExpenseApiResponse) => {
      return item.category_obj.name.toLocaleLowerCase().includes(filterCategory) && item.cost > filterCost;
    });

    setFilteredExpensesData(tmpFilteredItems);
  }, [expensesData, filterCategory, filterCost])


  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const categoryString = event.target.value.toLocaleLowerCase();

    setFilterCategory(categoryString);
  }

  const handleFilterCost = (event: ChangeEvent<HTMLInputElement>) => {
    const minCost = parseInt(event.target.value.toLocaleLowerCase()) || 0;

    setFilterCost(minCost);
  }

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
          ...item,
          'user_obj': usersMap.get(item.registered_by_user),
          'category_obj': categoriesMap.get(item.category),
          'expense_date': new Date(Date.parse(item['expense_date']))
        }
      });

      setExpensesData(expenses);
      setFilteredExpensesData(expenses);
    }

    getExpenses();
  }, [currentUser])

  return (
    <Container>
      <h1>Expenses</h1>
      <Form.Group className="mb-3" controlId="filteringSection.FilterByCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control type="input" placeholder="Category name" onChange={handleFilter} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="filteringSection.FilterByMinCost">
        <Form.Label>Minimum Cost</Form.Label>
        <Form.Control type="number" placeholder="Minimum Cost" onChange={handleFilterCost} />
      </Form.Group>
      {filteredExpensesData ? (
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
              filteredExpensesData.map((apiItem) => {
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
