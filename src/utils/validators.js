export const VALIDATOR_REQUIRE = () => ({ type: 'REQUIRE' })
export const VALIDATOR_MINLENGTH = (value) => ({
  type: 'MINLENGTH',
  value
})
export const VALIDATOR_MAXLENGTH = (value) => ({
  type: 'MAXLENGTH',
  value
})
export const VALIDATOR_MIN = (value) => ({ type: 'MIN', value })
export const VALIDATOR_MAX = (value) => ({ type: 'MAX', value })
export const VALIDATOR_EMAIL = () => ({ type: 'EMAIL' })

export const validate = (value, validators) => {
  for (const validator of validators) {
    switch (validator.type) {
      case 'REQUIRE':
        if (!value.trim().length) return false
        break
      case 'MINLENGTH':
        if (value.trim().length < validator.value) return false
        break
      case 'MAXLENGTH':
        if (value.trim().length > validator.value) return false
        break
      case 'MIN':
        if (+value < validator.value) return false
        break
      case 'MAX':
        if (+value > validator.value) return false
        break
      case 'EMAIL':
        if (!/^\S+@\S+\.\S+$/.test(value)) return false
        break
      default:
        throw new Error(`unkown validator type: ${validator.type}`)
    }
  }
  return true
}
