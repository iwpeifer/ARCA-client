// import React, { Component } from 'react'
// import { Button } from 'semantic-ui-react'
// import { FriendshipsAdapter } from '../adapters'
//
// export default class UserOptions extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       isFriend: false
//     }
//
//     this.sendFriendRequest = this.sendFriendRequest.bind(this)
//   }
//
//   componentWillReceiveProps(newProps){
//     if (newProps.selectedUser !== this.props.selectedUser) {
//       this.checkIfFriend(newProps.selectedUser.id)
//     }
//   }
//
//   checkIfFriend(id){
//     let check = false
//     if (this.props.currentUser.friends){
//       this.props.currentUser.friends.forEach(friend => {
//         if (friend.id === id) {
//           check = true
//         }
//       })
//     }
//     this.setState({
//       isFriend: check
//     })
//   }
//
//   isUsersRoom(){
//     if (this.props.currentUser.id === this.props.selectedUser.id){
//       return true
//     } else {
//       return false
//     }
//   }
//
//   sendFriendRequest(){
//     let user = this.props.currentUser
//     let friend = this.props.selectedUser
//     this.props.sendFriendRequest(user, friend)
//     this.setState({
//       isFriend: true
//     })
//   }
//
//   render() {
//     return (
//       <div>
//         { this.state.isFriend || this.isUsersRoom() ? null : <Button color='pink' onClick={this.sendFriendRequest}>Send Friend Request</Button> }
//       </div>
//     )
//   }
//
// }
