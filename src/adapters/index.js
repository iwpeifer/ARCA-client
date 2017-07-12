const baseUrl = 'https://frij-backend.herokuapp.com/api/v1/'

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

  static initSelectUser(userId) {
    return fetch(`${baseUrl}/users/${userId}`)
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
        letter: {
          x: newCoords.x,
          y: newCoords.y
        }
      })
    })
  }

  static createMagnet(item, roomId, originator) {
    return fetch(`${baseUrl}/letters`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        letter: {
          room_id: roomId,
          color: item.color,
          shape: item.shape,
          image_url: item.imageUrl,
          link_url: item.linkUrl,
          content: item.content,
          font_size: item.fontSize,
          font_family: item.fontFamily,
          originator: originator,
          x: 325,
          y: 300
        }
      })
    })
  }

  static deleteMagnet(item) {
    return fetch(`${baseUrl}/letters/${item.id}`, {
      method: 'DELETE',
      headers: headers()
    }).then(response => response.json())
  }

  }

  function headers() {
    return {
      'content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    }
  }

  export class FriendshipsAdapter {

    static request(userId, friendId) {
      return fetch(`${baseUrl}/friendships`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({
          friendship: {
            user_id: userId,
            friend_id: friendId,
            status: 'requested'
          }
        })
      })
    }


  }
