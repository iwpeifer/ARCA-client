import React, { Component } from 'react';
import { Switch, Route, withRouter, Link } from 'react-router-dom'
import { AuthAdapter, UsersAdapter, ItemsAdapter } from './adapters'

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
      newItem: false,
      selectedItem: ''
    }
    this.logIn               = this.logIn.bind(this)
    this.selectUser          = this.selectUser.bind(this)
    this.selectItem          = this.selectItem.bind(this)
    this.toggleFilter        = this.toggleFilter.bind(this)
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
        localStorage.setItem('jwt', user.jwt)
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
    if (localStorage.getItem('jwt')) {
      AuthAdapter.currentUser()
      .then(user => {
        console.log(user)
        if (!user.error) {
          this.setState({
            auth: {
              isLoggedIn: true,
              user: user
            }
          })
        } else {
          this.props.history.push('/login')
        }
      })
    } else {
      this.props.history.push('/login')
    }
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
    .then(this.setState({
      selectedItem: "",
      newItem: true
    }))
  }

  logout(){
    localStorage.clear()
  }

  render() {
    return (
      <div>
          <Switch>
            <Route exact path='/login' render={() => <LoginForm onSubmit={this.logIn}/>} />
            <Route exact path='/:id' render={(routerProps) => {
                const id = routerProps.match.params.id
                return (
                  <div className='app'>
                    <div className='logo_small'>Frij</div>
                    <Grid>
                      <Grid.Column computer={8}>
                        <Room
                          roomId             ={id}
                          newItem            ={this.state.newItem}
                          selectedUser       ={this.state.selectedUser}
                          selectItem         ={this.selectItem}
                          resetNewItem       ={this.resetNewItem}
                        />
                      </Grid.Column>
                      <Grid.Column computer={7}>
                        <div className='create-form-container'>
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
                        </div>
                      </Grid.Column>
                    </Grid>
                    <div className='footer'>
                      <Link to="/login" onClick={this.logout}>Log Out</Link>
                    </div>
                  </div>
                )
              }} />
          </Switch>
        </div>
    );
  }
}

export default withRouter(App);
