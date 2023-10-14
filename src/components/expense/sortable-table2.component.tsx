import { useState } from 'react'
import { MiscItems } from '../../routes/misc/misc.component'

export type SortConfig = {
  key: number
  direction: string
}

// const ProductTable = (props: keyof object) => {
// const SortableTableTwo = (props: any) => {
// const SortableTableTwo = (props: MiscItems) => {
// const SortableTableTwo = ({ price }: MiscItems) => {
// const SortableTableTwo = (props: MiscItems) => {
const SortableTableTwo = (props: { items: MiscItems[] }) => {
// const SortableTableTwo = (props: { items: Array<MiscItems> }) => {
// const SortableTableTwo = ({props}: Array<MiscItems> ) => {
// const SortableTableTwo = (props: MiscItems[]) => {
  console.log(props)

  // const [sortedField, setSortedField] = useState<keyof MiscItems>([])
  const [sortedField, setSortedField] = useState<keyof MiscItems>('id')
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 1,
    direction: 'asc'
  })

  // let sortedItems = [...props]
  let sortedItems = props.items
  console.log(sortedItems)

  if (sortedField !== null) {
    sortedItems.sort((a, b) => {
      // if (a.name < b.name) {
      if (a[sortedField] < b[sortedField]) {
      // if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (a[sortedField] > b[sortedField]) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }

  console.log(sortedItems)

  return (
    <table>
      <caption>Our products</caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>In Stock</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((item: any) => (
        // {props.map((item: any) => (
          <tr key={item.id}>
            <td onClick={() => setSortedField('name')}>{item.name}</td>
            <td onClick={() => setSortedField('price')}>{item.price}</td>
            <td onClick={() => setSortedField('stock')}>{item.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SortableTableTwo
