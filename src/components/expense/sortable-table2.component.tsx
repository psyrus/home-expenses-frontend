import { useState, useMemo } from 'react'
import { MiscItems } from '../../routes/misc/misc.component'
import { Container } from "react-bootstrap";

export type SortConfig = {
  key: keyof MiscItems
  direction: string
}

const SortableTableTwo = (props: { items: MiscItems[] }) => {
  // console.log(props)
  const items = props.items

  const [sortedField, setSortedField] = useState<keyof MiscItems>('id')
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'id',
    direction: 'asc'
  })

  useMemo(() => {
    let dir = 'asc'
    const sortedItems = items

    if (sortConfig.key === sortedField && sortConfig.direction === 'asc') {
      dir = 'desc'
    }
    sortedItems.sort((a, b) => {
      // if (a[sortConfig.key] < b[sortConfig.key]) {
      // if (a['name'] < b[sortConfig.key]) {
      if (a[sortedField] < b[sortedField]) {
        console.log(...sortedItems)
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (a[sortedField] > b[sortedField]) {
        console.log(...sortedItems)
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
    setSortConfig({ key:sortedField, direction:dir })
  }, [items, sortedField])

  return (
    <table className="table table-sm table-hover">
      <caption>Our products</caption>
      <thead>
        <tr>
          <th onClick={() => setSortedField('name')}>Name</th>
          <th onClick={() => setSortedField('price')}>Price</th>
          <th onClick={() => setSortedField('stock')}>In Stock</th>
        </tr>
      </thead>
      <tbody>
        {/* {items.map((item: any) => ( */}
        {items.map((item: MiscItems) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SortableTableTwo
