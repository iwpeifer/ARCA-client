import React, { Component } from 'react'
import { Grid, Button, Dropdown, Menu, Input } from 'semantic-ui-react'

export default class NewMagnetForm extends Component {
  constructor(){
    super()
    this.state = {
      shape: 'square',
      color: 'white',
      content: "",
      image_url: ""
    }
    this.selectShape = this.selectShape.bind(this)
    this.selectColor = this.selectColor.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
  }

  selectShape(event){
    let newShape = event.target.innerHTML.toLowerCase()
    this.setState({
      shape: newShape
    })
  }

  selectColor(event){
    let newColor = event.target.innerHTML.toLowerCase()
    this.setState({
      color: newColor
    })
  }

  changeHandler(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCreate(){
    let item = this.state
    this.props.createMagnet(item, this.props.roomId)
  }

  render() {
    return (
      <div id='newMagnetForm'>
        <Grid>
          <Grid.Column computer={8}>
            <Menu vertical>
              <Dropdown text='Shape' pointing='left' className='link item'>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.selectShape}>Square</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectShape}>Rectangle</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectShape}>Circle</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown text='Color' pointing='left' className='link item'>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.selectColor}>White</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectColor}>Red</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectColor}>Orange</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectColor}>Yellow</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectColor}>Green</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectColor}>Blue</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectColor}>Purple</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectColor}>Pink</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectColor}>Black</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
            <Input name='content' value={this.state.content} onChange={this.changeHandler} placeholder='Write Here!'/>
            <Input name='image_url' value={this.state.image_url} onChange={this.changeHandler} placeholder='Image URL'/>
          </Grid.Column>
          <Grid.Column computer={6}>
            <div id={'magnet-preview-container'}>
              <div className={'letter preview' + ' ' + this.state.shape + ' ' + this.state.color}>{this.state.content}</div>
            </div>
            <div id={'magnet-options'}>
              <Button color='green' onClick={this.handleCreate}>Create Magnet</Button>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
