import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username:'', password : '', message:''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  setUsername(e){
  	 this.setState({username: e.target.value});
  }

  setPassword(e){
  	 this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('/connexion', {
    	headers: {
    		'Accept': 'application/json',
    		'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({username:this.state.username , password: this.state.password})
      }).then(response => response.json())
    		.then((responseJson) => {
          this.setState( { message: responseJson });
          console.log(this.state.message);
        }).catch((error) => { console.error(error); });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        	<input name="username" type="text" value={this.state.username} onChange={this.setUsername} />
          <input name="password" type="text" value={this.state.password} onChange={this.setPassword}/>
          <input type="submit" value="Submit"/>
        </form>
        <div>
          <h2>{this.state.message}</h2>
        </div>
      </div>
    );
  }
}
