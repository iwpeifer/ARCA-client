import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { ItemsAdapter } from '../adapters'
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
    this.clickHandler = this.clickHandler.bind(this)
  }

  componentDidMount() {
    this.updateRoom(this.props.roomId)
    this.props.updateNotifications(this.props.roomId)
  }

  updateRoom(roomId) {
    ItemsAdapter.all(roomId)
    .then(data => this.setState({
      letters: data.letters
    }))
  }

  componentWillReceiveProps(newProps) {
    if (newProps.roomId !== this.props.roomId){
      this.updateRoom(newProps.roomId)
      this.props.updateNotifications(newProps.roomId)
    }
    if (newProps.newItem === true)
    this.updateRoom(this.props.roomId)
  }

  setCurrentItem(item){
    this.setState({
      currentItem: item
    })
    this.props.selectItem(item)
    document.getElementById(item.id)
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

  clickHandler(event){
    if (document.getElementById('selected')) {
      document.getElementById('selected').removeAttribute('id')
    }
    event.target.id = "selected"
  }

  openLink(link){
    if (link){
      window.open(link)
    }
  }

  render() {
    return (
      <div className="room">
        {this.state.letters.map(letter => {
          return <ItemProto key={letter.id} defaultPosition={{x: letter.x, y: letter.y}} bounds='parent' nodeParent={this} setCurrentItemCoords={this.setCurrentItemCoords} onStart={(event) => this.setCurrentItem(letter)} onStop={this.saveItemCoords}>
            {!letter.link_url ? (
              <div className={`letter ${letter.shape} ${letter.color}`} style={{fontFamily: letter.font_family, fontSize: letter.font_size}} onClick={this.clickHandler} onDoubleClick={()=>this.openLink(letter.link_url)}>{letter.content}</div>
              ) : (
              <div className={`letter with-link ${letter.shape} ${letter.color}`} style={{fontFamily: letter.font_family, fontSize: letter.font_size}} onClick={this.clickHandler} onDoubleClick={()=>this.openLink(letter.link_url)}>{letter.content}</div>
            )}
        </ItemProto>})}
      </div>
    )
  }

}

export default withRouter(Room)
