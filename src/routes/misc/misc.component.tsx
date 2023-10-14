import SortableTableTwo from '../../components/expense/sortable-table2.component'

export type MiscItems = {
    id: number,
    name: string,
    price: number,
    stock: number
}

const Misc = () => {
  let items: MiscItems[] = [
    {
      id: 1,
      name: 'nam1',
      price: 101,
      stock: 9
    },
    {
      id: 2,
      name: 'nam2',
      price: 100,
      stock: 8
    },
    {
      id: 3,
      name: 'nam3',
      price: 102,
      stock: 7
    }
   ]
  let oneItem: MiscItems = {
      id: 1,
      name: 'nam1',
      price: 100,
      stock: 6
    }

  return (
    <div className='Misc'>
      <h1>Hello</h1>
      <SortableTableTwo items={items} />
    </div>
  )
}

export default Misc