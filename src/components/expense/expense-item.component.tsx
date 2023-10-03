import { ExpenseApiResponse } from "./expenses-list.component";

type ExpenseItemProps = {
  item: ExpenseApiResponse
}

const ExpenseItem = ({ item }: ExpenseItemProps) => {
  return (
    <tr key={item.id}>
      <th scope="row">{item.id}</th>
      <td>{item.category}</td>
      <td>{item.cost}</td>
      <td>{item.description.slice(0, 15)}</td>
      <td>{item.registered_by_user}</td>
      <td>{item.expense_date}</td>
      <td>{item.paid_back ? "✅" : "✖"}</td>
    </tr>
  );
}

export default ExpenseItem;
