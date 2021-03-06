import React, { useEffect, useState } from 'react';
//import Web3 from 'web3'
import Token from './abis/Token.json'
import './App.css';
import { loadWeb3, loadAccount, loadToken, loadExchange } from './store/interactions'
import { connect } from 'react-redux'

function App({ dispatch }) {
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(true);


  useEffect(() => {


    loadBlockchainData(dispatch);
  })


  // const loadWeb3 = async () => {

  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum)
  //     await window.ethereum.enable()
  //   }
  //   else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider)
  //   } else {
  //     window.alert('Non-Ethereum browser detected. You should consider trying MetaMaask!')
  //   }
  // }




  const loadBlockchainData = async (dispatch) => {

    const web3 = await loadWeb3(dispatch);


    // Load account
    const accounts = await loadAccount(web3, dispatch)

    // set account number in state
     setAccount(accounts)

    // Get network id below
    const networkId = await web3.eth.net.getId();

    // get network data based off network id
    const networkData = Token.networks[networkId]

    // If we get back network data base from network id
    if (networkData) {

      const token = await loadToken(web3, networkId, dispatch)
      //const token = new web3.eth.Contract(Token.abi, networkData.address)
      const totalSupply = await token.methods.totalSupply().call()
      console.log("totalSupply", totalSupply)

      setLoading(false)

      const exchange = await loadExchange(web3, networkId, dispatch)
      if (!exchange) {
        window.alert('Exchange smart contract not detected on the current network. Please select another network with Metamask.')
        return
      }

    } else {
      window.alert('Exchange contract not deployed to dectectd network')
    }

  }





  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/#">Link 1</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">Link 2{loading}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">Link 3 {account}</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="content">
        <div className="vertical-split">
          <div className="card bg-dark text-white">
            <div className="card-header">
              Card Title
            </div>
            <div className="card-body">
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="/#" className="card-link">Card link</a>
            </div>
          </div>
          <div className="card bg-dark text-white">
            <div className="card-header">
              Card Title
            </div>
            <div className="card-body">
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="/#" className="card-link">Card link</a>
            </div>
          </div>
        </div>
        <div className="vertical">
          <div className="card bg-dark text-white">
            <div className="card-header">
              Card Title
            </div>
            <div className="card-body">
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="/#" className="card-link">Card link</a>
            </div>
          </div>
        </div>
        <div className="vertical-split">
          <div className="card bg-dark text-white">
            <div className="card-header">
              Card Title
            </div>
            <div className="card-body">
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="/#" className="card-link">Card link</a>
            </div>
          </div>
          <div className="card bg-dark text-white">
            <div className="card-header">
              Card Title
            </div>
            <div className="card-body">
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="/#" className="card-link">Card link</a>
            </div>
          </div>
        </div>
        <div className="vertical">
          <div className="card bg-dark text-white">
            <div className="card-header">
              Card Title
            </div>
            <div className="card-body">
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="/#" className="card-link">Card link</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(App);
