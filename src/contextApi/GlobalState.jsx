import React, {  createContext } from 'react';



const GlobalContext = createContext()


const GlobalProvider = ({ children, account }) => {

    // const [account, setAccount] = useState('');
    // const [loading, setLoading] = useState(true);


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



    return (
        <GlobalContext.Provider value={{ 
           
            
            }}>

            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalProvider, GlobalContext }