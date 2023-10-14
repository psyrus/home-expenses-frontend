import { useEffect, useState } from "react";

const SortableTable = () => {
  const [data, setData] = useState();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
    setSortConfig({ key, direction });
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('id')}>ID</th>
          <th onClick={() => handleSort('category')}>Category</th>
          <th onClick={() => handleSort('age')}>Age</th>
          <th onClick={() => handleSort('country')}>Country</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.country}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
