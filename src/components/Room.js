import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { ItemsAdapter } from '../adapters'
import ItemProto from './ItemProto'

class Room extends Component {
  constructor(props) {
    super(props)

    this.state = {
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
    } else if (newProps.newItem) {
      this.updateRoom(this.props.roomId)
      this.props.resetNewItem()
    }
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

  renderMagnets(){
    return this.state.letters.map(letter => {
      return (
        <ItemProto
          key={letter.id}
          defaultPosition={{x: letter.x, y: letter.y}}
          bounds='parent'
          nodeParent={this}
          setCurrentItemCoords={this.setCurrentItemCoords}
          onStart={(event) => this.setCurrentItem(letter)}
          onStop={this.saveItemCoords}>
        {
          this.renderIndividualMagnet(letter)
        }
      </ItemProto>)
    })
  }

  renderIndividualMagnet(letter){
    let withLink
    letter.link_url ? withLink = 'with-link' : null
    return (
      <div className={`letter ${withLink} ${letter.shape} ${letter.color}`}
        style={{fontFamily: letter.font_family, fontSize: letter.font_size, backgroundImage: `url(${letter.image_url})` }}
        onClick={this.clickHandler}
          onDoubleClick={()=>this.openLink(letter.link_url)}>
        {letter.content}
      </div>
    )
  }

  render() {
    return (
      <div className='frij'>
        <div className='room'>
          {this.renderMagnets()}
        </div>
      </div>
    )
  }

}

export default withRouter(Room)
