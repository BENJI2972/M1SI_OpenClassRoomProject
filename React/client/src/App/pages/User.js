import React, { Component } from 'react';


class User extends Component {
	constructor(props){
    super(props);
    this.state = {list: []}
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = () => {
    fetch('/user')
    .then(response => response.json())
		.then((responseJson) => { this.setState( { list: responseJson });})
		.catch((error) => { console.error(error); });
  }

  render() {

    return (
      <div className="App">
        <h1>List of Items</h1>
        {/* Check to see if any items are found*/}
        {this.state.list.length ? (
          <div>
							{this.state.list.map(user =>
								<div key={user.title}>{user.title}</div>
							)}
          </div>
        ) : (
          <div>
            <h2>No List Items Found</h2>
          </div>
        )
      }
      </div>
    );
  }
}

export default User;
