import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import { AuthAdapter, UsersAdapter } from './adapters'

import { Grid } from 'semantic-ui-react'

import LoginForm from './components/LoginForm'
import Room from './components/Room'
import SearchBar from './components/SearchBar'

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
      searchFilter: "all"
    }
    this.logIn = this.logIn.bind(this)
    this.selectUser = this.selectUser.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
  }

  logIn(loginParams) {
    AuthAdapter.login(loginParams)
    .then( user => {
      if (!user.error) {
        this.setState({
          auth: { isLoggedIn: true, user: user }
        })
        localStorage.setItem('user_id', user.id)
        this.props.history.push(`/${user.id}`)
      }
    })
  }

  componentDidMount() {
    UsersAdapter.all()
    .then(users => this.setState({
      allUsers: users
    }))
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

  selectUser(user) {
    this.setState({
      selectedUser: user
    })
    this.props.history.push(`${user.id}`)
  }

  toggleFilter(event){
    console.log(event.target.name)
    this.setState({
      searchFilter: event.target.name
    })
  }

  render() {
    // let title
    // let user_id
    // if (this.state.auth.isLoggedIn) {
    //   title = this.state.auth.user.username
    // }
    // if (this.state.auth.user.id) {
    //   user_id = this.state.auth.user.id
    // }
    return (
      <div>
          <Switch>
            <Route exact path='/login' render={() => <LoginForm onSubmit={this.logIn}/>} />
            <Route exact path='/:id' render={(routerProps) => {
                const id = routerProps.match.params.id
                return (
                  <Grid>
                    <Grid.Column computer={4}>
                      <SearchBar
                        toggleFilter={this.toggleFilter}
                        selectUser  ={this.selectUser}
                        searchFilter={this.state.searchFilter}
                        users       ={this.state.allUsers}
                        currentUser ={this.state.auth.user}
                      />
                    </Grid.Column>
                    <Grid.Column computer ={8}>
                      <Room roomId={id} selectedUser={this.state.selectedUser}/>
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
