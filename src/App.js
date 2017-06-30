import React, { Component } from 'react';
import { Switch, Route, browserHistory, withRouter } from 'react-router-dom'
import { AuthAdapter } from './adapters'

import LoginForm from './components/LoginForm'
import Room from './components/Room'

class App extends Component {
  constructor() {
    super()
    this.state = {
      auth: {
        isLoggedIn: false,
        user: {}
      }
    }
    this.logIn = this.logIn.bind(this)
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
    } else {
      this.props.history.push('/login')
    }
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
        <h3>{title}</h3>
        <Switch>
          <Route exact path='/login' render={() => <LoginForm onSubmit={this.logIn}/>} />
          <Route exact path='/:id' render={(routerProps) => {
              const id = routerProps.match.params.id
              return (
              <Room roomId={id}/>
              )
            }} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
