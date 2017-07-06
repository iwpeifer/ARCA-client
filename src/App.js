import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import { AuthAdapter, UsersAdapter, NotificationsAdapter, ItemsAdapter } from './adapters'

import { Grid } from 'semantic-ui-react'

import LoginForm from './components/LoginForm'
import Room from './components/Room'
import SearchBar from './components/SearchBar'
import UserOptions from './components/UserOptions'
import NewMagnetForm from './components/NewMagnetForm'

class App extends Component {
  constructor() {
    super()
    this.state = {
      auth: {
        isLoggedIn: false,
        user: {}
      },
      allUsers: [],
      selectedUser: {},
      searchFilter: 'all',
      notifications: [],
      newItem: false,
      selectedItem: ''
    }
    this.logIn               = this.logIn.bind(this)
    this.selectUser          = this.selectUser.bind(this)
    this.selectItem          = this.selectItem.bind(this)
    this.toggleFilter        = this.toggleFilter.bind(this)
    this.updateNotifications = this.updateNotifications.bind(this)
    this.sendFriendRequest   = this.sendFriendRequest.bind(this)
    this.createMagnet        = this.createMagnet.bind(this)
    this.deleteMagnet        = this.deleteMagnet.bind(this)
    this.resetNewItem        = this.resetNewItem.bind(this)
  }

  logIn(loginParams) {
    AuthAdapter.login(loginParams)
    .then( user => {
      if (!user.error) {
        this.setState({
          auth: { isLoggedIn: true, user: user }
        })
        localStorage.setItem('user_id', user.id)
        this.selectUser(user)
      }
    })
  }

  initSelectUser(){
    let pathname = this.props.location.pathname.split('/')[1]
    UsersAdapter.initSelectUser(pathname)
    .then( user => this.setState({
      selectedUser: user
    }))
  }

  componentDidMount() {
    UsersAdapter.all()
    .then(users => this.setState({
      allUsers: users
    }))
    this.initSelectUser()
    if (localStorage.getItem('user_id')) {
      AuthAdapter.currentUser()
      .then(user => this.setState({
        auth: {
          isLoggedIn: true,
          user: user
        }
      }))
    } else {
      this.props.history.push('/login')
    }
  }

  updateNotifications(userId) {
    NotificationsAdapter.getUserNotifications(userId)
    .then(notifications => this.setState({
      notifications: notifications
    }))
  }

  selectUser(user) {
    this.setState({
      selectedUser: user
    })
    this.props.history.push(`${user.id}`)
  }

  selectItem(item) {
    this.setState({
      selectedItem: item
    })
  }

  resetNewItem() {
    this.setState({
      newItem: false
    })
  }

  toggleFilter(event){
    this.setState({
      searchFilter: event.target.name
    })
  }

  sendFriendRequest(){
    let user_id = this.state.auth.user.id
    let friend_id = this.state.selectedUser.id
    NotificationsAdapter.sendFriendRequest(user_id, friend_id)
  }

  createMagnet(item, roomId){
    ItemsAdapter.createMagnet(item, roomId)
    .then(console.log("Magnet has been created"))
    .then(this.setState({
      newItem: true
    }))
  }

  deleteMagnet(item){
    ItemsAdapter.deleteMagnet(item)
    .then(console.log("Magnet has been deleted"))
    this.setState({
      selectedItem: "",
      newItem: true
    })
  }

  render() {
    return (
      <div>
          <Switch>
            <Route exact path='/login' render={() => <LoginForm onSubmit={this.logIn}/>} />
            <Route exact path='/:id' render={(routerProps) => {
                const id = routerProps.match.params.id
                return (
                  <Grid>
                    <Grid.Column computer={8}>
                      <Room
                        roomId             ={id}
                        newItem            ={this.state.newItem}
                        selectedUser       ={this.state.selectedUser}
                        updateNotifications={this.updateNotifications}
                        selectItem         ={this.selectItem}
                        resetNewItem       ={this.resetNewItem}
                      />
                    </Grid.Column>
                    <Grid.Column computer={6}>
                      <SearchBar
                        toggleFilter={this.toggleFilter}
                        selectUser  ={this.selectUser}
                        searchFilter={this.state.searchFilter}
                        users       ={this.state.allUsers}
                        currentUser ={this.state.auth.user}
                      />
                      <UserOptions
                        currentUser      ={this.state.auth.user}
                        selectedUser     ={this.state.selectedUser}
                        sendFriendRequest={this.sendFriendRequest}
                      />
                      <NewMagnetForm
                        roomId      ={id}
                        createMagnet={this.createMagnet}
                        deleteMagnet={this.deleteMagnet}
                        selectedItem={this.state.selectedItem} />
                    </Grid.Column>
                  </Grid>
                )
              }} />
          </Switch>
        </div>
    );
  }
}

export default withRouter(App);
