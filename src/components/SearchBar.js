import React, { Component } from 'react'
import { Dropdown, Button } from 'semantic-ui-react'

export default class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      filter: "all"
    }

    this.handleChange = this.handleChange.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
  }

  handleChange(event, data){
    console.log(data.value)
    this.props.selectUser(data.value)
  }

  toggleFilter(event){
    console.log(event.target.name)
    this.setState({
      filter: event.target.name
    })
  }

  render() {
    let users = this.props.users.map(user => {
      return { text: user.username, key: user.id, value: user }
  })
    return (
    <div>
      <Button.Group>
        <Button name={'friends'} color={'olive'} onClick={this.toggleFilter}>My Friends</Button>
        <Button name={'all'} color={'olive'} onClick={this.toggleFilter}>All Users</Button>
      </Button.Group>
      <Dropdown name='searchBar' placeholder='Search for Users' fluid search selection options={users} onChange={this.handleChange}/>
    </div>
    )
  }
}
