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
    this.changeHandler = this.changeHandler.bind(this)
    this.selectShape = this.selectShape.bind(this)
    this.selectColor = this.selectColor.bind(this)
    this.selectFont = this.selectFont.bind(this)
    this.selectFontSize = this.selectFontSize.bind(this)

    this.handleCreate = this.handleCreate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  selectShape(event){
    let newShape = event.target.innerHTML.toLowerCase()
    this.setState({
      shape: newShape
    })
  }

  selectColor(color){
    let newColor = color
    // toLowerCase()
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

  handleDelete(){
    this.props.deleteMagnet(this.props.selectedItem)
  }

  render() {
    if (this.state.imageUrl === 'jonny'){
      this.setState({
        imageUrl: 'https://avatars2.githubusercontent.com/u/19194646?v=3&s=460',
        content: "You're only supposed to blow the bloody doors in"
      })
    }
    let style = {fontSize: this.state.fontSize, fontFamily: this.state.fontFamily, backgroundImage: `url(${this.state.imageUrl})`}
    return (
      <div id='newMagnetForm'>
        <Grid>
          <Grid.Column computer={8}>
            <Menu vertical>
              <Dropdown text='Color' pointing='left' className='link item'>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => this.selectColor('white')}><div className='swatch white'></div></Dropdown.Item>
                  <Dropdown.Item onClick={() => this.selectColor('red')}><div className='swatch red'></div></Dropdown.Item>
                  <Dropdown.Item onClick={() => this.selectColor('orange')}><div className='swatch orange'></div></Dropdown.Item>
                  <Dropdown.Item onClick={() => this.selectColor('yellow')}><div className='swatch yellow'></div></Dropdown.Item>
                  <Dropdown.Item onClick={() => this.selectColor('green')}><div className='swatch green'></div></Dropdown.Item>
                  <Dropdown.Item onClick={() => this.selectColor('blue')}><div className='swatch blue'></div></Dropdown.Item>
                  <Dropdown.Item onClick={() => this.selectColor('purple')}><div className='swatch purple'></div></Dropdown.Item>
                  <Dropdown.Item onClick={() => this.selectColor('pink')}><div className='swatch pink'></div></Dropdown.Item>
                  <Dropdown.Item onClick={() => this.selectColor('black')}><div className='swatch black'></div></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown text='Shape' pointing='left' className='link item'>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.selectShape}>Square</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectShape}>Rectangle</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectShape}>Circle</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown text='Font' pointing='left' className='link item'>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.selectFont} style={{fontFamily: 'helvetica'}}>Helvetica</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFont} style={{fontFamily: 'times new roman'}}>Times New Roman</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFont} style={{fontFamily: 'cursive'}}>Cursive</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFont} style={{fontFamily: 'Impact'}}>Impact</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFont} style={{fontFamily: 'arial black'}}>Arial Black</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFont} style={{fontFamily: 'courier'}}>Courier</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFont} style={{fontFamily: 'palatino'}}>Palatino</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFont} style={{fontFamily: 'andale mono'}}>Andale Mono</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown text='Font Size' pointing='left' className='link item'>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.selectFontSize}>12</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFontSize}>14</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFontSize}>16</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFontSize}>20</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFontSize}>24</Dropdown.Item>
                  <Dropdown.Item onClick={this.selectFontSize}>36</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
            Content:<Input name='content' value={this.state.content} onChange={this.changeHandler} placeholder='Write Here!'/>
            Link:<Input name='linkUrl' value={this.state.linkUrl} onChange={this.changeHandler} placeholder='https://..'/>
            Image:<Input name='imageUrl' value={this.state.image_url} onChange={this.changeHandler} placeholder='https://...'/>
          </Grid.Column>
          <Grid.Column computer={6}>
            <div id={'magnet-preview-container'}>
              <div className={`letter preview ${this.state.shape} ${this.state.color}`} style={style}>{this.state.content}</div>
            </div>
            <div id={'magnet-options'}>
              <div className='options-button'>
                <Button className='options-button' color='green' onClick={this.handleCreate}>Create Magnet</Button>
              </div>
              <div className='options-button'>
                {this.props.selectedItem ? <Button className='options-button' color='red' onClick={this.handleDelete}>Delete Magnet</Button> : null }
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
