import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'

export default class LoginForm extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    this.props.onSubmit( this.state )
    this.setState({username: '', password: ''})
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>SIGN IN</h3>
        <Input type='text' placeholder='Username' value={this.state.username} name="username" onChange={this.handleChange}/>
        <Input type='password' placeholder='Password' value={this.state.password} name="password" onChange={this.handleChange} />
        <Input type="submit" color='green'/>
      </form>
    )
  }
}
