import React, { useEffect, useState } from 'react';
import Select, { components } from 'react-select';
import Modal from 'react-modal';
import { getWeb3 } from '../../utils.js';
import {
  OptionContainer,
  ConnectionContainer,
	ConnectionButton
} from './WalletManagerStyles';

function WalletManager() {
  // NB: i vari ChainId vanno scritti con le lettere minuscole!!!
  const [options, setOptions] = useState([
    { value: 11155111, label: "SEPOLIA TESTNET", image: "./images/ethereum-logo.svg", dataConfig: {"chainId": "0xaa36a7", "chainName": "Sepolia", "nativeCurrency": { "name": "SepoliaETH", "symbol": "SepoliaETH", "decimals": 18}, "rpcUrls": ["https://sepolia.infura.io/v3/"], "blockExplorerUrls": ["https://sepolia.etherscan.io"]} },
    { value: 80001, label: "MUMBAI TESTNET", image: "./images/polygon-logo.svg", dataConfig: {"chainId": "0x13881", "chainName": "Mumbai", "nativeCurrency": { "name": "MATIC", "symbol": "MATIC", "decimals": 18}, "rpcUrls": ["https://rpc-mumbai.maticvigil.com/"], "blockExplorerUrls": ["https://mumbai.polygonscan.com/"]} },
    { value: 421613, label: "ARBITRUM TESTNET", image: "./images/arbitrum-logo.svg", dataConfig: {"chainId": "0x66eed", "chainName": "Arbitrum Goerli", "nativeCurrency": { "name": "AGOR", "symbol": "AGOR", "decimals": 18}, "rpcUrls": ["https://endpoints.omniatech.io/v1/arbitrum/goerli/public"], "blockExplorerUrls": ["https://goerli-rollup-explorer.arbitrum.io"]} }
  ]);
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [showModal, setShowModal] = useState(undefined);
  const { SingleValue, Option } = components;

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

  const IconSingleValue = (props) => (
    <SingleValue {...props}>
      <img src={props.data.image} style={{ height: '1rem', width: '1.5rem' }} />
    </SingleValue>
  );

  const IconOption = (props) => (
      <Option {...props}>
        <img src={props.data.image} style={{ height: '1rem', width: '1.5rem' }} />
        {props.data.label}
      </Option>
  );

  const customStyles = {
    option: (provided) => ({
      ...provided,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'transparent',
      color: '#333',
      cursor: 'pointer',
      width: '6rem',
      '&:hover': {
        backgroundColor: '#999'
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      background: 'transparent',
      color: '#000'
    }),
    control: (provided) => ({
      ...provided,
      margin: '0.1rem 0.4rem 0.1rem 1rem',
      background: '#efefef',
      cursor: 'pointer',
      border: provided.isFocused ? "0.1rem solid #efefef" : "0.1rem solid #efefef",
      boxShadow: provided.isFocused ? "0 0 1rem 0.5rem #636363" : "none",
      "&:hover": {
        border: '0.1rem solid #efefef',
        boxShadow: '0 0 1rem 0.5rem #636363',
        transition: 'box-shadow 0.4s ease-in'
      }
    }),
    menu: (provided) => ({
      ...provided,
      background: '#efefef',
      width: '6rem',
      margin: '0.55rem 0.6rem',
      fontSize: '1rem',
      textAlign: 'center'
    })
  }

  return (
    <div id="walletManager" className="WalletManager">
      {web3 ? (
        <div>
          {blockchainConnection ? (
            <div>
              <Select options={options}
                      onChange={(choice) => setNetworkId(choice.value)}
                      defaultValue={options.filter((option) => option.value === networkId)}
                      value={selectedOption}
              />
              {chainId ? (
                <div>
                  {accounts ? (
                    <div>
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
            <ConnectionContainer>
              <Select options={options}
                      onChange={(choice) => setNetworkId(choice.value)}
                      components={{SingleValue: IconSingleValue, Option: IconOption}}
                      defaultValue={options.filter((option) => option.value === networkId)}
                      value={selectedOption}
                      styles={customStyles}
              />
              <ConnectionButton id="buttonConnection" onClick={connectButton}>Connect</ConnectionButton>
            </ConnectionContainer>
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

export default WalletManager;
