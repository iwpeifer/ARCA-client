import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

export default class UserOptions extends Component {
  constructor(props){
    super(props)
    this.state = {
      isFriend: false
    }
  }

  componentWillReceiveProps(newProps){
    if (newProps.selectedUser !== this.props.selectedUser) {
      this.checkIfFriend(newProps.selectedUser.id)
    }
  }

  checkIfFriend(userId){
    if (this.props.currentUser.friends){
      this.props.currentUser.friends.forEach(friend => {
        if (friend.id == userId) {
          return this.setState({
            isFriend: true
          })
        } else {
          return this.setState({
            isFriend: false
          })
        }
      })
    }
  }

  isUsersRoom(){
    if (this.props.currentUser.id === this.props.selectedUser.id){
      return true
    } else {
      return false
    }
  }

  render() {
    return (
      <div>
        { this.state.isFriend || this.isUsersRoom() ? null : <Button color='pink' onClick={this.props.sendFriendRequest}>Send Friend Request</Button> }
      </div>
    )
  }

}
