import React, { Component } from 'react';


class User extends Component {
	constructor(props){
    super(props);
    this.state = {list: [], id : ''};
  }

  // Fetch the list on first mount
  componentDidMount() {
    const { id } = this.props.match.params
    this.setState({id : `${id}`});
    this.getUser();
  }

  // Retrieves the list of items from the Express app
  getUser = () => {
    fetch(`/user/${this.id}`)
    .then(response => response.json())
		.then((responseJson) => {
      this.setState( { list: responseJson });
      console.log(this.state.list);
    })
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
								<div key={user.u_idUtilisateur}>{user.u_idUtilisateur}{user.u_nom}</div>
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
