import React, { Component } from 'react'
import { Dropdown, Button } from 'semantic-ui-react'

export default class SearchBar extends Component {
  constructor(props){
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, data){
    console.log(data.value)
    this.props.selectUser(data.value)
  }

  filteredUsers(){
    let users = []
    if (this.props.searchFilter === "friends"){
      this.props.users.map(user => {
        if (this.props.currentUser.friends.includes(user.id)){
          users.push(user)
        }
      })
    } else {
      users = this.props.users
    }
    return users
  }

  render() {
    let users = this.filteredUsers()
    let formattedUsers = users.map(user => {
      return { text: user.username, key: user.id, value: user }
  })
    return (
    <div>
      <Button.Group>
        <Button name={'friends'} color={'olive'} onClick={this.props.toggleFilter}>My Friends</Button>
        <Button name={'all'} color={'olive'} onClick={this.props.toggleFilter}>All Users</Button>
      </Button.Group>
      <Dropdown name='searchBar' placeholder='Search for Users' fluid search selection options={formattedUsers} onChange={this.handleChange}/>
    </div>
    )
  }
}
