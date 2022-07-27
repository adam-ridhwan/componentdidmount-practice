import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

import debounce from 'lodash.debounce';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUser] = useState([]);

  useEffect(() => {
    let ignore = false;
    // console.log('get data');
    (async () => {
      if (!searchField) return;
      let data;

      try {
        const response = await fetch(API_URL);
        data = await response.json();
      } catch (error) {
        console.log(error);
      }

      if (!ignore) {
        setUsers(data);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [searchField]);

  useEffect(() => {
    // console.log('display users');
    const newFilteredUsers = users.filter(user => {
      return user.name.toLocaleLowerCase().includes(searchField);
    });
    searchField === ''
      ? setFilteredUser([])
      : setFilteredUser(newFilteredUsers);
  }, [users, searchField]);

  const onSearchChange = event => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(onSearchChange, 300),
    []
  );

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  return (
    <>
      <h3>Small project using useState and useEffect hooks</h3>
      <div className='input-box'>
        <input
          type='text'
          onChange={debouncedChangeHandler}
          placeholder='Search for user'
        />
      </div>
      <div className='content'>
        {filteredUsers.map(user => {
          const { id, name } = user;
          return <div key={id}>{name}</div>;
        })}
      </div>
    </>
  );
};

export default App;
