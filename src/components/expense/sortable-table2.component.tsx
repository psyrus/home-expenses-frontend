import { useState, useMemo } from 'react'
import { MiscItems } from '../../routes/misc/misc.component'

export type SortConfig = {
  key: number
  direction: string
}

const SortableTableTwo = (props: { items: MiscItems[] }) => {
  console.log(props)
  const items = props.items

  const [sortedField, setSortedField] = useState<keyof MiscItems>('id')
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 1,
    direction: 'asc'
  })

  useMemo(() => {
    let sortedItems = items

    sortedItems.sort((a, b) => {
      // if (a[sortConfig.key] < b[sortConfig.key]) {
      if (a[sortedField] < b[sortedField]) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (a[sortedField] > b[sortedField]) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })

    console.log(sortedItems)
  }, [items, sortConfig])

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
        {/* {items.map((item: any) => ( */}
        {items.map((item: MiscItems) => (
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
