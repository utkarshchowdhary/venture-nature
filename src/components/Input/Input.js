import React, { useReducer, useEffect } from 'react'

import { validate } from '../../utils/validators'

import './Input.scss'

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_TOUCH':
      return { ...state, isTouched: true }
    case 'INPUT_CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      }
    default:
      return state
  }
}

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue,
    isTouched: false,
    isValid: props.initialValid
  })

  const { id, onInput } = props
  const { value, isTouched, isValid } = inputState

  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput])

  const changeHandler = (e) => {
    dispatch({
      type: 'INPUT_CHANGE',
      val: e.target.value,
      validators: props.validators
    })
  }

  const touchHandler = () => {
    dispatch({ type: 'INPUT_TOUCH' })
  }

  return (
    <div
      className={`form-control${
        isTouched && !isValid ? ' form-control--invalid' : ''
      }`}
    >
      <label htmlFor={id}>{props.label}</label>
      {props.element === 'input' ? (
        <input
          id={id}
          type={props.type}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={value}
        />
      ) : (
        <textarea
          id={id}
          rows={props.rows}
          onBlur={touchHandler}
          onChange={changeHandler}
          value={value}
        />
      )}
      {isTouched && !isValid && <p>{props.error}</p>}
    </div>
  )
}

Input.defaultProps = {
  initialValue: '',
  initialValid: false
}

export default Input
