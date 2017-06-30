import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import { AuthAdapter, UsersAdapter } from './adapters'

import { Grid, Row, Col } from 'react-bootstrap'

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
      searchTerm: ""
    }
    this.logIn = this.logIn.bind(this)
    this.updateSearchTerm = this.updateSearchTerm.bind(this)
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
    if (localStorage.getItem('user_id')) {
      AuthAdapter.currentUser()
      .then(user => this.setState({
        auth: {
          isLoggedIn: true,
          user: user
        }
      }))
      UsersAdapter.all()
      .then(users => this.setState({
        allUsers: users
      }))
    } else {
      this.props.history.push('/login')
    }
  }

  updateSearchTerm(input) {
    this.setState({
      searchTerm: input
    })
  }

  render() {
    let title
    let user_id
    if (this.state.auth.isLoggedIn) {
      title = this.state.auth.user.username
    }
    if (this.state.auth.user.id) {
      user_id = this.state.auth.user.id
    }
    console.log(user_id)
    return (
      <div>
          <Switch>
            <Route exact path='/login' render={() => <LoginForm onSubmit={this.logIn}/>} />
            <Route exact path='/:id' render={(routerProps) => {
                const id = routerProps.match.params.id
                return (
                  <Grid>
                <Row>
                  <Col m={6}>
                    <SearchBar updateSearchTerm={this.updateSearchTerm} searchTerm={this.state.searchTerm}/>
                  </Col>
                  <Col m={6}>
                    <Room roomId={id}/>
                  </Col>
                </Row>
              </Grid>
                )
              }} />
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
