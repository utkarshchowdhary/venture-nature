import { useCallback, useReducer } from 'react'

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      const newState = {
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: action.isValid
      }
      if (!action.isValid) {
        return newState
      }
      for (const inputId in state.inputs) {
        if (inputId !== action.inputId && !state.inputs[inputId].isValid) {
          newState.isValid = false
          return newState
        }
      }
      return newState
    case 'SET_DATA':
      return { inputs: action.inputs, isValid: action.formIsValid }
    default:
      return state
  }
}

const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity
  })

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: 'INPUT_CHANGE', value, isValid, inputId: id })
  }, [])

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity
    })
  }, [])

  return { formState, inputHandler, setFormData }
}

export default useForm
