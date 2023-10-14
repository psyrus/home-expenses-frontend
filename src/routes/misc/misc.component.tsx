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
      price: 100,
      stock: 7
    },
    {
      id: 2,
      name: 'nam2',
      price: 101,
      stock: 8
    },
    {
      id: 3,
      name: 'nam3',
      price: 102,
      stock: 9
    }
   ]
  let oneItem: MiscItems = {
      id: 1,
      name: 'nam1',
      price: 100,
      stock: 7
    }

  return (
    <div className='Misc'>
      <h1>Hello</h1>
      {/* <SortableTableTwo {...oneItem} /> */}
      {/* <SortableTableTwo {...items} /> */}
      {/* <SortableTableTwo {...items} /> */}
      <SortableTableTwo items={items} />
      {/* <SortableTableTwo props={items} /> */}
      {/* <SortableTableTwo {...oneItem} /> */}
    </div>
  )
}

export default Misc

// Type '{ props: MiscItems[]; }' is not assignable to type 'IntrinsicAttributes & MiscItems'.