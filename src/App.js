import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      students: [],
      firstName: "",
      lastName: "",
      email: "",
      classEnrolled: ""
    }
  }

  render() {
    return (
      <main></main>
    )
  }
}

export default App;
