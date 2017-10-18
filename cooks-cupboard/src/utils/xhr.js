import store from '../store'

var axios = require("axios");

// These are "fake network" function that in a real scenario would
// call the backend API and upon return would update your redux state.
// We're just going to skip to the redux part and add a setTimeout
// for some fake latency

export const getLoggedUser = () => {
    store.dispatch({
      type: 'GET_LOGGED_USER_REQ'
    })
    return axios.get("/isloggedin")
      .then(response => response.data)
      .then(data => store.dispatch({
        type: 'GET_LOGGED_USER_RESP',
        logged: data == 1
      }))
}

export const login = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      store.dispatch({
        type: 'SET_LOGGED_USER',
        logged: true
      })
      resolve()
    }, 500)
  })
}

export const logout = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      store.dispatch({
        type: 'SET_LOGGED_USER',
        logged: false
      })
      resolve()
    }, 500)
  })
}