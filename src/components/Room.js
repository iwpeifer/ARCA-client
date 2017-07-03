import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { ItemsAdapter} from '../adapters'
import ItemProto from './ItemProto'

class Room extends Component {
  constructor(props) {
    super(props)

    this.state = {
      roomId: this.props.roomId,
      letters: [],
      currentItem: {},
      currentItemCoords: { x:0, y:0 }
    }
    this.setCurrentItemCoords = this.setCurrentItemCoords.bind(this)
    this.saveItemCoords = this.saveItemCoords.bind(this)
  }

  componentDidMount() {
    this.updateRoom(this.props.roomId)
  }

  updateRoom(roomId) {
    ItemsAdapter.all(roomId)
    .then(data => this.setState({
      letters: data.letters
    }))
  }

  componentWillReceiveProps(newProps) {
    if (newProps.roomId !== this.props.roomId){
      console.log(`roomId is about to be: ${newProps.roomId}; it used to be: ${this.props.roomId}`)
      this.updateRoom(newProps.roomId)
    }
  }

  setCurrentItem(item){
    this.setState({
      currentItem: item
    })
  }

  setCurrentItemCoords(coords) {
    this.setState({
      currentItemCoords: coords
    })
  }

  saveItemCoords() {
    let item = this.state.currentItem
    let newCoords = this.state.currentItemCoords
    ItemsAdapter.update(item, newCoords)
  }

  render() {
    return (
      <div className="room">
        {this.state.letters.map(letter => <ItemProto key={letter.id} defaultPosition={{x: letter.x, y: letter.y}} bounds='parent' nodeParent={this} setCurrentItemCoords={this.setCurrentItemCoords} onStart={() => this.setCurrentItem(letter)} onStop={this.saveItemCoords}>
          <div className="test">{letter.content}</div>
        </ItemProto>)}
      </div>
    )
  }

}

export default withRouter(Room)
