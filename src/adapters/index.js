const baseUrl = 'http://localhost:3000/api/v1'

export class AuthAdapter {

  static login(loginParams){
    return fetch(`${baseUrl}/auth`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(response => response.json() )
  }

  static currentUser(){
    return fetch(`${baseUrl}/current_user`, {
      headers: headers()
    }).then(response => response.json() )
  }
}

export class UsersAdapter {

  static all() {
    return fetch(`${baseUrl}/users`)
    .then(response => response.json())
  }

}

export class ItemsAdapter {

  static all(roomId) {
    return fetch(`${baseUrl}/rooms/${roomId}`)
    .then(response => response.json())
    }

  static update(item, newCoords) {
    return fetch(`${baseUrl}/${item.item_type}s/${item.id}`, {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify({
        letter: {x: newCoords.x, y: newCoords.y}
      })
    })
  }

  }

  function headers() {
    return {
      'content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': localStorage.getItem('user_id')
    }
  }
