import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    fetch('https://dummyjson.com/users')
      .then(response => response.json())
      .then(data =>
        this.setState(() => {
          return { users: data.users };
        })
      );
  }

  displayUsers() {
    return this.state.users.map(user => {
      const { id, firstName, lastName } = user;
      return (
        <div key={id}>
          {firstName} {lastName}
        </div>
      );
    });
  }

  render() {
    return <div className='content'>{this.displayUsers()}</div>;
  }
}

export default App;
