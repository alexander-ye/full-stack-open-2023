const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DO_NOTHING':
      try {
        const stateKeys = Object.keys(state)
        if (stateKeys.includes('good') && stateKeys.includes('ok') && stateKeys.includes('bad')) {
          if (state.good >= 0 && state.ok >= 0 && state.bad >= 0) {
            return {good: state.good, ok: state.ok, bad: state.bad}
          }
        }
      } catch (error) {
        console.log(error)
        return initialState
      }
    case 'GOOD':
      return {...state, good: state.good + 1}
    case 'OK':
      return {...state, ok: state.good + 1}
    case 'BAD':
      return {...state, bad: state.good + 1}
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer