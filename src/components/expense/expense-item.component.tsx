import { ExpenseApiResponse, UserApiResponse, CategoryApiResponse } from "./expenses-list.component";

type ExpenseItemProps = {
  item: ExpenseApiResponse,
  user: UserApiResponse,
  category: CategoryApiResponse
}

const ExpenseItem = ({ item, user, category }: ExpenseItemProps) => {
  return (
    <tr key={item.id}>
      <th scope="row">{item.id}</th>
      <td>{category.name}</td>
      <td>{item.cost}</td>
      <td>{item.description.slice(0, 15)}</td>
      <td>{user.username}</td>
      <td>{item.expense_date}</td>
      <td>{item.paid_back ? "✅" : "✖"}</td>
    </tr>
  );
}

export default ExpenseItem;
