import Web3 from 'web3'
import Token from '../abis/Token.json'
import Exchange from '../abis/Exchange.json'
import { web3Loaded, web3AccountLoaded, tokenLoaded, exchangeLoaded } from "./actions"


export const loadWeb3 = async (dispatch) => {
  if(typeof window.ethereum!=='undefined'){
    const web3 = new Web3(window.ethereum)
    dispatch(web3Loaded(web3))
    return web3
  } else {
    window.alert('Please install MetaMask')
    window.location.assign("https://metamask.io/")
  }
}


export const loadAccount = async (web3, dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    dispatch(web3AccountLoaded(account))
    return account
  }



  export const loadToken = async (web3, networkId, dispatch) => {
    try {
      const networkData = Token.networks[networkId]
      const token = new web3.eth.Contract(Token.abi, networkData.address)
      dispatch(tokenLoaded(token))
      return token
    } catch (error) {
      console.log('Contract not deployed to the current network. Please select another network with Metamask.')
      return null
    }
  }


  
export const loadExchange = async (web3, networkId, dispatch) => {
    try {
      const networkDataExchange = Exchange.networks[networkId]
      const exchange = new web3.eth.Contract(Exchange.abi, networkDataExchange.address)
      dispatch(exchangeLoaded(exchange))
      return exchange
    } catch (error) {
      console.log('Contract not deployed to the current network. Please select another network with Metamask.')
      return null
    }
  }