import { Fragment, useContext, useEffect, useState } from "react";
import { Button, Collapse, Container, Row, Spinner } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
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

type Summary = {
  user: UserApiResponse
  total: number
}

const ExpensesList = () => {
  const [expensesData, setExpensesData] = useState<ExpenseApiResponse[]>([]);
  const [filteredExpensesData, setFilteredExpensesData] = useState<ExpenseApiResponse[] | null>(null);
  const [maximumCost, setMaxCost] = useState<number>(0); // Might not need to be a state
  const [categories, setCategories] = useState<CategoryApiResponse[] | null>(null); // Might not need to be a state
  const [users, setUsers] = useState<UserApiResponse[] | null>(null); // Might not need to be a state
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' })
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const { currentUser } = useContext(UserContext) as UserContextType;
  const [summary, setSummary] = useState<{ [key: number]: Summary }>({});

  const handleSort = (key: keyof ExpenseApiResponse) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const sortedData = [...expensesData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    })
    setSortConfig({ key, direction });
    setExpensesData(sortedData)
  }

  useEffect(() => {
    /**
     * This function doesn't have to be as complicated if the object could simply be built on the backend side.
     */
    const client = currentUser?.apiClient;
    if (!client) {
      return;
    }

    const getApiContent = async () => {
      const expensesContent = await client.getExpenses()
      const categoriesContent = await client.getCategories()
      const usersContent = await client.getUsers()
      let tmpMaxCost = 0;

      let categoriesMap = new Map<number, CategoryApiResponse>();
      categoriesContent.map((category: CategoryApiResponse) => {
        categoriesMap.set(category.id, category);
      })

      let usersMap: Map<number, UserApiResponse> = new Map<number, UserApiResponse>();
      usersContent.map((user: UserApiResponse) => {
        usersMap.set(user.id, user);
      })

      const expenses: ExpenseApiResponse[] = expensesContent.map((item: any) => {
        if (item.cost > tmpMaxCost) {
          tmpMaxCost = item.cost
        }
        return {
          ...item,
          'user_obj': usersMap.get(item.registered_by_user),
          'category_obj': categoriesMap.get(item.category),
          'expense_date': new Date(Date.parse(item['expense_date']))
        }
      }).sort((item: any, nextItem: any) => { // This sort should be done on the DB side
        if (item.id > nextItem.id) {
          return 1
        } else if (item.id < nextItem.id) {
          return -1
        } else {
          return 0
        }
      });

      setMaxCost(tmpMaxCost);
      setCategories(categoriesContent);
      setUsers(usersContent);
      setExpensesData(expenses);
      setDataLoaded(true);
    }

    getApiContent();
  }, [currentUser]);

  useEffect(() => {
    const tmpSummary: { [key: number]: Summary } = {};
    expensesData.forEach(element => {

      if (element.paid_back === true) {
        return;
      }

      if (!(element.registered_by_user in tmpSummary)) {
        tmpSummary[element.registered_by_user] = { user: element.user_obj, total: 0 };
      }
      const obj = tmpSummary[element.registered_by_user]
      if (!obj) {
        return;
      }
      obj.total += element.cost;
    });

    setSummary(tmpSummary);

  }, [expensesData])


  useEffect(() => {
    if (!expensesData) {
      return;
    }
    const tmpExpensesContent = expensesData.filter((item: any) => {
      if ('category' in filters && filters['category'].length > 0 && item.category != filters['category']) {
        return false;
      }
      if ('user' in filters && filters['user'].length > 0 && item.registered_by_user != filters['user']) {
        return false;
      }
      if ('minCost' in filters && filters['minCost'].length > 0 && item.cost < parseInt(filters['minCost'])) {
        return false;
      }
      if ('maxCost' in filters && filters['maxCost'].length > 0 && item.cost > parseInt(filters['maxCost'])) {
        return false;
      }
      if ('minDate' in filters && filters['minDate'].length > 0 && item.expense_date < new Date(Date.parse(filters['minDate']))) {
        return false;
      }
      if ('maxDate' in filters && filters['maxDate'].length > 0 && item.expense_date > new Date(Date.parse(filters['maxDate']))) {
        return false;
      }
      return true;
    });

    setFilteredExpensesData(tmpExpensesContent);
  }, [expensesData, filters])

  const updateFilters = (filterType: string, filterValue: any) => {
    console.log(`filter type: ${filterType} | filter value: ${filterValue}`)
    let tmp: { [key: string]: string } = {}
    tmp[filterType] = filterValue;
    setFilters({ ...filters, ...tmp })
  }

  const updateExpensePaymentState = async (expenseId: number, paidBack: boolean) => {
    if (!currentUser) {
      console.error("Currentuser was null");
      return;
    }
    console.log(`Marking expense ${expenseId} as paid`)
    await currentUser.apiClient.updateExpense(expenseId, { paid_back: paidBack })

    const updatedExpensesData = expensesData.map((item) => {
      if (item.id === expenseId) {
        return { ...item, paid_back: paidBack };
      }
      return item;
    })

    setExpensesData([...updatedExpensesData]);
  };

  return (
    <Container>
      <h1>Expenses</h1>
      {
        dataLoaded && filteredExpensesData ? (
          <Row>
            <div className="col-md-6">
              <Button aria-controls="filter-contents" aria-expanded={filterOpen} onClick={() => setFilterOpen(!filterOpen)}>Filters</Button>
              <Collapse in={filterOpen} appear={filterOpen}>
                <div id="filter-contents">
                  <FloatingLabel controlId="floatingSelect" label="Category">
                    <Form.Select aria-label="Category label" onChange={(event) => updateFilters('category', event.target.value)}>
                      <option value=""></option>
                      {categories?.map((item) => {
                        return (
                          <option key={item.id} value={item.id}>{item.name}</option>
                        )
                      })}
                    </Form.Select>
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingSelect" label="User">
                    <Form.Select aria-label="User label" onChange={(event) => updateFilters('user', event.target.value)}>
                      <option value=""></option>
                      {users?.map((item) => {
                        return (
                          <option key={item.id} value={item.id}>{item.username} ({item.email})</option>
                        )
                      })}
                    </Form.Select>
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingInput" label="Minimum Cost">
                    <Form.Control type="number" min="0" onChange={(event) => updateFilters('minCost', event.target.value)} />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingInput" label="Maximum Cost">
                    <Form.Control type="number" placeholder={maximumCost.toString()} min="1" max={maximumCost} onChange={(event) => updateFilters('maxCost', event.target.value)} />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingInput" label="Date: From">
                    <Form.Control type="date" min="1" onChange={(event) => updateFilters('minDate', event.target.value)} />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingInput" label="Date: To">
                    <Form.Control type="date" onChange={(event) => updateFilters('maxDate', event.target.value)} />
                  </FloatingLabel>
                </div>
              </Collapse>
            </div>
            <div className="col-md-6">
              <Button aria-controls="summary-contents" aria-expanded={summaryOpen} onClick={() => setSummaryOpen(!summaryOpen)}>Summary</Button>
              <Collapse in={summaryOpen} appear={summaryOpen}>
                <div id="summary-contents">
                  {
                    Object.keys(summary).map((item: string) => {
                      const parsed = parseInt(item);
                      return (<div key={item}>{summary[parsed].user.username}: {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(
                        summary[parsed].total,
                      )}</div>);
                    })
                  }
                </div>
              </Collapse>
            </div>
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
                    return <ExpenseItem item={apiItem} key={apiItem.id} callback={updateExpensePaymentState} />
                  })
                }
              </tbody>
            </table>
            {filteredExpensesData.length < 1 ? <div className="text-center">No Expenses</div> : ""}
          </Row>
        ) : (
          <div className="text-center">
            <Spinner animation="border" role="status" />
          </div>
        )
      }
    </Container >
  );
}

export default ExpensesList;
