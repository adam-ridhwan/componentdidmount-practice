import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUser] = useState([]);
  // console.log(filteredUsers);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  useEffect(() => {
    const newFilteredUsers = users.filter(user => {
      return user.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredUser(newFilteredUsers);
  }, [users, searchField]);

  const onSearchChange = event => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className='content'>
      <div>
        <input
          onChange={onSearchChange}
          placeholder='search for contact'
        ></input>
      </div>
      {filteredUsers.map(user => {
        const { id, name } = user;
        return <div key={id}>{name}</div>;
      })}
    </div>
  );
};

export default App;
