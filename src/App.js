import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import { AuthAdapter, UsersAdapter, NotificationsAdapter } from './adapters'

import { Grid } from 'semantic-ui-react'

import LoginForm from './components/LoginForm'
import Room from './components/Room'
import SearchBar from './components/SearchBar'
import Feed from './components/Feed'
import UserOptions from './components/UserOptions'

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
      searchFilter: "all",
      notifications: []
    }
    this.logIn               = this.logIn.bind(this)
    this.selectUser          = this.selectUser.bind(this)
    this.toggleFilter        = this.toggleFilter.bind(this)
    this.updateNotifications = this.updateNotifications.bind(this)
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

  toggleFilter(event){
    this.setState({
      searchFilter: event.target.name
    })
  }

  sendFriendRequest(){

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
                    <Grid.Column computer={7}>
                      <Room roomId         ={id}
                        selectedUser       ={this.state.selectedUser}
                        updateNotifications={this.updateNotifications}
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
                      <Feed />
                      <UserOptions
                        currentUser ={this.state.auth.user}
                        selectedUser={this.state.selectedUser} />
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
