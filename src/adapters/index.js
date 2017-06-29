const baseUrl = 'http://localhost:3000/api/v1'

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
      'accept': 'application/json'
    }
  }
