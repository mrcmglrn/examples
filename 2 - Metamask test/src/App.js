import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Modal from 'react-modal';
import { getWeb3, getSimpleStorage } from './utils.js';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [blockchainConnection, setBlockchainConnection] = useState(undefined);
  const [networkId, setNetworkId] = useState(undefined);
  const [chainId, setChainId] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState(undefined);
  const [options, setOptions] = useState([
    { value: 1, label: "ETHEREUM", dataConfig: {"chainId": "0x1", "chainName": "Ethereum Mainnet", "nativeCurrency": { "name": "ETH", "symbol": "ETH", "decimals": 18}, "rpcUrls": ["https://mainnet.infura.io/v3/"], "blockExplorerUrls": ["https://etherscan.io"]} },
    { value: 56, label: "BSC", dataConfig: {"chainId": "0x38", "chainName": "BSC Mainnet", "nativeCurrency": { "name": "BNB", "symbol": "BNB", "decimals": 18}, "rpcUrls": ["https://bsc-dataseed.binance.org/"], "blockExplorerUrls": ["https://bscscan.com"]} },
    { value: 137, label: "POLYGON", dataConfig: {"chainId": "0x89", "chainName": "Polygon Mainnet", "nativeCurrency": { "name": "MATIC", "symbol": "MATIC", "decimals": 18}, "rpcUrls": ["https://polygon-rpc.com/"], "blockExplorerUrls": ["https://polygonscan.com/"]} }
  ]);
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [showModal, setShowModal] = useState(undefined);

  // [] => Only called one time at the beginning.
  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const networkId = 137;
      const blockchainConnection = false;
      //const options = PER RENDERLE DINAMICHE VANNO RECUPERATE DA DB IN MANIERA ASINCRONA ALLA LOGIN (vedi appunti WEEK2 per caricamento REACT-SELECT/ASYNC)
      const showModal = false;
      setWeb3(web3);
      setNetworkId(networkId);
      setBlockchainConnection(blockchainConnection);
      //setOptions(options);
      setShowModal(showModal);
    };
    init();
  }, []);

  // [accounts] => Called once at the beginning and each time the accounts changes.
  useEffect(() => {
    // Skip first call before connection.
    if(accounts.length > 0) {
      setBlockchainConnection(true);
    } else {
      setBlockchainConnection(false);
    }
  }, [accounts]);

  // [networkId] => Called once at the beginning and each time the networkId changes.
  useEffect(() => {
    // Skip first call before connection.
    if(blockchainConnection) {
      checkNetwork();
    }
  }, [networkId]);

  // [chainId] => Called once at the beginning and each time the chainId changes.
  useEffect(() => {
    const updateReactSelectByMetamask = async () => {
      // Skip first call before connection.
      if(blockchainConnection) {
        let wrongNetwork = true;

        options.forEach(function (option, index) {
          if(option.dataConfig.chainId === chainId){
            setNetworkId(options[index].value);
            setSelectedOption(options[index]);
            wrongNetwork = false;
          }
        });

        if(wrongNetwork) {
          setShowModal(true);
        }
      }
    };
    updateReactSelectByMetamask();
  }, [chainId]);

  /*
  // [showModal] => Called once at the beginning and each time the showModal changes.
  useEffect(() => {
    const retieveCorrectNetwork = async () => {
      // Skip first call before connection.
      if(blockchainConnection && !showModal) {
        checkNetwork();
      }
    };
    retieveCorrectNetwork();
  }, [showModal]);
  */

  // [chainId] => Called once at the beginning and each time the chainId changes.
  useEffect(() => {
    const manageCloseModal = async () => {
      // Skip first call before connection.
      if(blockchainConnection && showModal) {
        setShowModal(false);
      }
    };
    manageCloseModal();
  }, [chainId]);

  //window.ethereum.on("chainChanged", handleChainChanged);
  //
  //async function handleChainChanged(_chainId) {
  const handleChainChanged = async (_chainId) => {
    try {
      // Pre REACT, in REACT just update the app state.
      //window.location.reload();
      setChainId(_chainId);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccounts(accounts);
      const balanceInWei = await web3.eth.getBalance(accounts[0]);
      const balance = await web3.utils.fromWei(balanceInWei, "ether");
      setBalance(balance);
    } catch(error){
      // This error message is generated only for Brave Browser, but everything works fine in this situation as well.
      if(error.message !== "Cannot read properties of undefined (reading 'eth')") {
        console.log(error);
      }
    }
  }

  window.ethereum.on("chainChanged", handleChainChanged);

  //window.ethereum.on("accountsChanged", handleAccountsChanged);
  //
  //async function handleAccountsChanged(_accounts) {
  const handleAccountsChanged = async (_accounts) => {
    try {
      setAccounts(_accounts);
      const balanceInWei = await web3.eth.getBalance(_accounts[0]);
      const balance = await web3.utils.fromWei(balanceInWei, "ether");
      setBalance(balance);
    } catch(error){
      // This error message is generated only for Brave Browser, but everything works fine in this situation as well.
      if(error.message !== "Cannot read properties of undefined (reading 'eth')") {
        console.log(error);
      }
    }
  }

  window.ethereum.on("accountsChanged", handleAccountsChanged);

  const addNetwork = async (dataConfig) => {
    console.log("SONO NELL'ADD");

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: dataConfig.chainId,
            chainName: dataConfig.chainName,
            nativeCurrency:
              {
                name: dataConfig.nativeCurrency.name,
                symbol: dataConfig.nativeCurrency.symbol,
                decimals: dataConfig.nativeCurrency.decimals
              },
            rpcUrls: dataConfig.rpcUrls,
            blockExplorerUrls: dataConfig.blockExplorerUrls
          }
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }

  const switchNetwork = async () => {
    console.log("SONO NELLO SWITCH");

    const dataConfig = options.filter((option) => option.value === networkId).map(option => option.dataConfig)[0];
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: dataConfig.chainId }],
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (error.code === 4902) {
        addNetwork(dataConfig);
      } else {
        console.log(error);
      }
    }
  }

  const checkNetwork = async () => {
    console.log("SONO NEL CHECK");

    if(showModal) {
      document.getElementById('buttonModal').disabled = true;
    }

    /* JavaScript Comparison Operators
     *
     *  ==    equal value
     *  !=    not equal value
     *  ===   equal value and equal type
     *  !==   not equal value or not equal type
     */
    const networkIdFromMetamask = await window.ethereum.networkVersion;
    if (networkIdFromMetamask !== networkId) {
      switchNetwork();
    }

    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      setChainId(chainId);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccounts(accounts);
      const balanceInWei = await web3.eth.getBalance(accounts[0]);
      const balance = await web3.utils.fromWei(balanceInWei, "ether");
      setBalance(balance);
    } catch(error){
      if(error.message !== "Cannot read properties of undefined (reading 'eth')") {
        console.log(error);
      }
    }
  }

  const connectButton = async () => {
    console.log("SONO NEL CONNECTION");
    document.getElementById('buttonConnection').disabled = true;
    await checkNetwork();
  }

  if(
    typeof web3 === 'undefined'
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div id="app" className="App">
      {web3 ? (
        <div>
          WEB3 ACTIVE!

          {blockchainConnection ? (
            <div>
              SEI CONNESSO!

              <Select options={options}
                      onChange={(choice) => setNetworkId(choice.value)}
                      defaultValue={options.filter((option) => option.value === networkId)}
                      value={selectedOption}
              /> 
                
              {chainId ? (
                <div>
                  CHAINID DETECTED: {chainId}

                  {accounts ? (
                    <div>
                      <div>
                        ACCOUNTS DETECTED: {accounts[0]}
                      </div>
                      <div>
                        CURRENT BALANCE: {balance}
                      </div>
                      <div>
                        <Modal 
                          isOpen={showModal}
                          contentLabel="Minimal Modal Example"
                          appElement={document.getElementById('app')}
                        >
                          <p>QUESTA DAPP FUNZIONA SOLO CON ETH, BSC E MATIC</p>
                          <button id="buttonModal" onClick={checkNetwork}>CHANGE NETWORK</button>
                        </Modal>
                      </div>
                    </div>
                  ) : (
                    <div>
                      ACCOUNTS NOT DETECTED!!!
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  CHAINID NOT DETECTED!!!
                </div>
              )}
            </div>
          ) : (
            <div>
              <button id="buttonConnection" onClick={connectButton}>Connect</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          WEB3 NOT ACTIVE!!!
        </div>
      )}
    </div>
  );
}

export default App;
