import { useCallback, useReducer } from 'react'

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      const newState = {
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: state.isValid
      }
      // current is not valid -> gross validity not valid
      if (!action.isValid) {
        newState.isValid = false
        return newState
      }
      // current is valid, previous was also valid -> gross validity unchanged
      if (state.inputs[action.inputId].isValid) {
        return newState
      }
      // current is valid, previous was not valid -> gross validity TBD
      for (const inputId in state.inputs) {
        if (inputId !== action.inputId && !state.inputs[inputId].isValid) {
          newState.isValid = false
          return newState
        }
      }
      newState.isValid = true
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
    dispatch({
      type: 'INPUT_CHANGE',
      inputId: id,
      value,
      isValid
    })
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
