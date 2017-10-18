
const initialState = {
  pending: true,
  logged: false
}


const loggedUserReducer = (state = initialState, action) => {

  if (action.type === 'GET_LOGGED_USER_REQ') {
    return Object.assign({}, state, {
      pending: true
    })
  }
  
  if (action.type === 'GET_LOGGED_USER_RESP') {
    return Object.assign({}, state, {
      pending: false,
      logged: action.logged
    })
  }
  
  if (action.type === 'SET_LOGGED_USER') {
    return Object.assign({}, state, {
      pending: false,
      logged: action.logged
    })
  }
  
  return state
}

export default loggedUserReducer