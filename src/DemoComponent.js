import { useState, useEffect } from 'react';

export default function DemoComponent() {
  const [data, setData] = useState([]);
  // Loading initial data from the server
  useEffect(function () {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  // Adding new data to the server using a POST request
  function addName(evt) {
    evt.preventDefault();
    if (evt.key === 'Enter' && evt.target.value !== '') {
      const name = evt.target.value;
      fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: data.length + 1, name }),
      })
        .then((res) => res.json())
        .then((newData) => setData([...data, newData]))
        .finally(() => {
          evt.target.value = '';
        });
    }
  }

  // Deleting data from the server using a DELETE request
  function deleteName(evt) {
    const id = evt.target.getAttribute('data-id');
    fetch(`/api/${id}`, {
      method: 'DELETE',
    }).then(() => {
      const newData = data.filter((item) => item.id !== parseInt(id));
      setData(newData);
    });
  }
  return (
    <div className="demo-component">
      <input type="text" onKeyUp={addName} className="demo-input" />
      <ul className="demo-user-list">
        {data &&
          data.map((item) => (
            <li key={item.id} className="demo-list-item" style={{ color: item.name.toLowerCase() }}>
              {item.name}
              <button onClick={deleteName} data-id={item.id}>
                X
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
