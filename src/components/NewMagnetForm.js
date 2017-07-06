import React, { Component } from 'react'
import { Grid, Button, Dropdown, Menu, Input } from 'semantic-ui-react'

export default class NewMagnetForm extends Component {
  constructor(){
    super()
    this.state = {
      shape: 'square',
      color: 'white',
      content: '',
      imageUrl: "",
      linkUrl: "",
      fontSize: 12,
      fontFamily: 'sans-serif'
    }
    this.selectShape = this.selectShape.bind(this)
    this.selectColor = this.selectColor.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.selectFont = this.selectFont.bind(this)
    this.selectFontSize = this.selectFontSize.bind(this)
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

  selectFont(event){
    let newFont = event.target.innerHTML.toLowerCase()
    this.setState({
      fontFamily: newFont
    })
  }

  selectFontSize(event){
    let newFontSize = parseInt(event.target.innerHTML, 10)
    this.setState({
      fontSize: newFontSize
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
    let style = {fontSize: this.state.fontSize, fontFamily: this.state.fontFamily}
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
              <Dropdown text='Font' pointing='left' className='link item'>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.selectFont}>Helvetica</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFont}>Times New Roman</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFont}>Cursive</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFont}>Impact</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFont}>Arial Black</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFont}>Courier</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFont}>Palatino</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFont}>Andale Mono</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown text='Font Size' pointing='left' className='link item'>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.selectFontSize}>12</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFontSize}>16</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFontSize}>24</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFontSize}>36</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
            Content:<Input name='content' value={this.state.content} onChange={this.changeHandler} placeholder='Write Here!'/>
            Link:<Input name='linkUrl' value={this.state.linkUrl} onChange={this.changeHandler} placeholder='Link URL'/>
            Image:<Input name='imageUrl' value={this.state.image_url} onChange={this.changeHandler} placeholder='Image URL'/>
          </Grid.Column>
          <Grid.Column computer={6}>
            <div id={'magnet-preview-container'}>
              <div className={`letter preview ${this.state.shape} ${this.state.color}`} style={style}>{this.state.content}</div>
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
