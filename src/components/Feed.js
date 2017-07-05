import React from 'react'
import { Message, Button } from 'semantic-ui-react'

export default (props) => {
  function renderFriendRequest(notification){
    return <Message color='pink' key={notification.id}>FUCK YOU</Message>
  }
  console.log(props.notifications)
  return (
    <div className='feed'>
      {props.notifications.map(notification => {
        if (notification.is_friend_request){
          return renderFriendRequest(notification)
        }
      }
    )}
    </div>
  )
}
