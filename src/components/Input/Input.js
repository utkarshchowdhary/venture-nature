import React, { useState } from 'react'

import { validate } from '../../utils/validators'

import './Input.scss'

const Input = (props) => {
  const [isTouched, setIsTouched] = useState(false)

  const changeHandler = (e) => {
    props.onInput(
      props.id,
      e.target.value,
      validate(e.target.value, props.validators)
    )
  }

  const touchHandler = () => {
    setIsTouched(true)
  }

  return (
    <div
      className={`form-control${
        isTouched && !props.isValid ? ' form-control--invalid' : ''
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {props.element === 'input' ? (
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={props.value}
        />
      ) : (
        <textarea
          id={props.id}
          rows={props.rows}
          onBlur={touchHandler}
          onChange={changeHandler}
          value={props.value}
        />
      )}
      {isTouched && !props.isValid && <p>{props.error}</p>}
    </div>
  )
}

export default Input
