import React from 'react'

import './Avatar.scss'

const Avatar = (props) => {
  return (
    <div className="avatar">
      <img src={props.image} alt={props.alt} />
    </div>
  )
}

export default Avatar
