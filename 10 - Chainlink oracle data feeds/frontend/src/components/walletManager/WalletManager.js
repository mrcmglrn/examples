import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getWeb3 } from '../../utils.js';
import SelectManager from '../../components/selectManager/SelectManager.js';
import OracleManager from '../../components/oracleManager/OracleManager.js';
import {
  ConnectionAddress,
  ConnectionContainer,
	ConnectionButton,
  OracleContainer
} from './WalletManagerStyles';

const WalletManager = () => {
  // NB: i vari ChainId vanno scritti con le lettere minuscole!!!
  const [options, setOptions] = useState([
    { value: 11155111, label: "SEPOLIA TESTNET", image: "./images/ethereum-logo.svg", dataConfig: {"chainId": "0xaa36a7", "chainName": "Sepolia", "nativeCurrency": { "name": "SepoliaETH", "symbol": "SepoliaETH", "decimals": 18}, "rpcUrls": ["https://sepolia.infura.io/v3/"], "blockExplorerUrls": ["https://sepolia.etherscan.io"]} },
    { value: 80001, label: "MUMBAI TESTNET", image: "./images/polygon-logo.svg", dataConfig: {"chainId": "0x13881", "chainName": "Mumbai", "nativeCurrency": { "name": "MATIC", "symbol": "MATIC", "decimals": 18}, "rpcUrls": ["https://rpc-mumbai.maticvigil.com/"], "blockExplorerUrls": ["https://mumbai.polygonscan.com/"]} },
    { value: 421613, label: "ARBITRUM TESTNET", image: "./images/arbitrum-logo.svg", dataConfig: {"chainId": "0x66eed", "chainName": "Arbitrum Goerli", "nativeCurrency": { "name": "AGOR", "symbol": "AGOR", "decimals": 18}, "rpcUrls": ["https://endpoints.omniatech.io/v1/arbitrum/goerli/public"], "blockExplorerUrls": ["https://goerli-rollup-explorer.arbitrum.io"]} }
  ]);
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [showModal, setShowModal] = useState(undefined);

  const [web3, setWeb3] = useState(undefined);
  const [blockchainConnection, setBlockchainConnection] = useState(undefined);
  const [networkId, setNetworkId] = useState(undefined);
  const [chainId, setChainId] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState(undefined);

  // [] => Only called one time at the beginning.
  useEffect(() => {
    const init = async () => {
      const _web3 = await getWeb3();
      const _networkId = 80001;
      const _blockchainConnection = false;
      //const options = PER RENDERLE DINAMICHE VANNO RECUPERATE DA DB IN MANIERA ASINCRONA ALLA LOGIN (vedi appunti WEEK2 per caricamento REACT-SELECT/ASYNC)
      const _showModal = false;
      setWeb3(_web3);
      setNetworkId(_networkId);
      setBlockchainConnection(_blockchainConnection);
      //setOptions(options);
      setShowModal(_showModal);
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
    console.log("CHANGECHANGECHANGE");
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

  // [] => Only called one time at the beginning.
  useEffect(() => {
    const handleDisconnect = async () => {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch(error){
        // This error message is generated only for Brave Browser, but everything works fine in this situation as well.
        if(error.message !== "Cannot read properties of undefined (reading 'eth')") {
          console.log(error);
        }
      }
    }

    // Add an event listener for 'disconnect all accounts'
    window.ethereum.on("disconnect", handleDisconnect);

    return () => {
      // Remove the event listener for 'disconnect'
      window.ethereum.removeListener('disconnect', handleDisconnect);
    };
  }, []);

  // [] => Only called one time at the beginning.
  useEffect(() => {
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

    // Add an event listener for 'chainChanged'
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      // Remove the event listener for 'chainChanged'
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  // [] => Only called one time at the beginning.
  useEffect(() => {
    const handleAccountsChanged = async (_accounts) => {
      try {
        if (_accounts.length > 0) {
          setAccounts(_accounts);
          const balanceInWei = await web3.eth.getBalance(_accounts[0]);
          const balance = await web3.utils.fromWei(balanceInWei, "ether");
          setBalance(balance);
        } else {
          setSelectedOption(undefined);
          setShowModal(false);
          setBlockchainConnection(false);
          setChainId(undefined);
          setAccounts([]);
          setBalance(undefined);
  
          console.log("disconnected");
        }
      } catch(error){
        // This error message is generated only for Brave Browser, but everything works fine in this situation as well.
        if(error.message !== "Cannot read properties of undefined (reading 'eth')") {
          console.log(error);
        }
      }
    }

    // Add an event listener for 'accountsChanged'
    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      // Remove the event listener for 'accountsChanged'
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

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

  const shortenEthereumAddress = (address) => {
    return `${address.slice(0, 7)}...${address.slice(-5)}`;
  }

  if(
    typeof web3 === 'undefined'
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div id="walletManager" className="WalletManager">
      {web3 ? (
        <div>
          <ConnectionContainer>
            <SelectManager options={options} selectedOption={selectedOption} networkId={networkId} setNetworkId={setNetworkId} />
            {blockchainConnection ? (
              <div>
                <ConnectionAddress>{shortenEthereumAddress(accounts[0])}</ConnectionAddress>

                <div>
                  {chainId ? (
                    <div>
                      {accounts ? (
                        <div>
                          <Modal 
                            isOpen={showModal}
                            contentLabel="Minimal Modal Example"
                            appElement={document.getElementById('app')}
                          >
                            <p>QUESTA DAPP FUNZIONA SOLO CON LE TESTNETS: SEPOLIA, MUMBAI E ARBITRUM</p>
                            <button id="buttonModal" onClick={checkNetwork}>CHANGE NETWORK</button>
                          </Modal>
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
              </div>
            ) : (
                <ConnectionButton id="buttonConnection" onClick={connectButton}>Connect</ConnectionButton>
            )}
          </ConnectionContainer>

          <OracleContainer>
            {blockchainConnection ? (
              <div>
                <OracleManager web3={web3} networkId={networkId} />
              </div>
            ) : (
              <div></div>
            )}
          </OracleContainer>
        </div>
      ) : (
        <div>
          WEB3 NOT ACTIVE!!!
        </div>
      )}
    </div>
  );
}

export default WalletManager;
