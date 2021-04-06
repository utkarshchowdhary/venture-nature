import React from 'react'
import { Link } from 'react-router-dom'

import './Button.scss'

const Button = (props) => {
  const className = `button ${props.inverse && 'button--inverse'} ${
    props.danger && 'button--danger'
  }`

  if (props.href) {
    return (
      <a className={className} href={props.href}>
        {props.children}
      </a>
    )
  }

  if (props.to) {
    return (
      <Link to={props.to} exact={props.exact} className={className}>
        {props.children}
      </Link>
    )
  }

  return (
    <button
      className={className}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button
