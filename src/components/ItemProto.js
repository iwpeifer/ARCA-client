import Draggable from 'react-draggable'

export default class ItemProto extends Draggable {

  shouldComponentUpdate(nextProps,nextState) {
    if (nextState.x !== this.state.x || nextState.y !== this.state.y) {
      return true
    }
    else {
      return false
    }
  }

  componentDidUpdate() {
    this.props.setCurrentItemCoords({x: this.state.x, y: this.state.y})
  }
}
