import { Button } from "react-bootstrap";
import { ExpenseApiResponse } from "./expenses-list.component";

type ExpenseItemProps = {
  item: ExpenseApiResponse
  callback: Function
}

const ExpenseItem = ({ item, callback }: ExpenseItemProps) => {

  const markExpensePaid = (expenseId: number) => {
    console.log(`Marking expense ${expenseId} as paid`)
  }

  return (
    <tr key={item.id}>
      <th scope="row">{item.id}</th>
      <td>{item.category_obj.name}</td>
      <td>{item.cost}</td>
      <td>{item.description.slice(0, 15)}</td>
      <td>{item.user_obj.username}</td>
      <td>{item.expense_date.toDateString()}</td>
      {item.paid_back ? (
        <td >✅</td>
      ) : (
        <td><Button variant="secondary" size="sm" onClick={() => callback(item.id, true)}>Mark as paid</Button></td>
      )
      }
    </tr>
  );
}

export default ExpenseItem;
