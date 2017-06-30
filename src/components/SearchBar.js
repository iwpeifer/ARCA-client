import React from 'react'

export default (props) => {
  function handleChange(event){
    props.updateSearchTerm(event.target.value)
  }
  return (
    <input type='text' placeholder='Search for Users' onChange={handleChange}/>
  )
}
