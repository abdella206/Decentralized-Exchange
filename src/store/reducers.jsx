import { combineReducers } from 'redux'


function web3(state = {}, action) {
  switch (action.type) {
    case 'WEB3_LOADED':
      return { ...state, connection: action.connection }
    case 'WEB3_ACCOUNT_LOADED':
      return { ...state, account: action.account }
    case 'ETHER_BALANCE_LOADED':
      return { ...state, balance: action.balance }
    default:
      return state
  }
}


function token(state = {}, action) {
  switch (action.type) {
    case 'TOKEN_LOADED':
      return { ...state, loaded: true, contract: action.contract }
    case 'TOKEN_BALANCE_LOADED':
      return { ...state, balance: action.balance }
    default:
      return state
  }
}



function exchange(state = {}, action) {
  switch (action.type) {
    case 'EXCHANGE_LOADED':
      return { ...state, loaded: true, contract: action.contract }
   
    default:
      return state
  }
}



const rootReducer = combineReducers({
  web3,
  token,
  exchange
})

export default rootReducer
