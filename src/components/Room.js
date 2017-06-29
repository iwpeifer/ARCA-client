import React, { Component } from 'react'
import { ItemsAdapter} from '../adapters'
import ItemProto from './ItemProto'

export default class Room extends Component {
  constructor(props) {
    super(props)

    this.state = {
      letters: [],
      currentItem: {},
      currentItemCoords: { x:0, y:0 }
    }
    this.setCurrentItemCoords = this.setCurrentItemCoords.bind(this)
    this.saveItemCoords = this.saveItemCoords.bind(this)
  }

  componentDidMount() {
    ItemsAdapter.all(this.props.roomId)
    .then(data => this.setState({
      letters: data.letters
    }))
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
