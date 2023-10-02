# Info generali sui progetti

## 1 - Frontend sito personale

È il frontend in React.js del mio sito. Puoi vedere il codice ma mancando backend e database se lo esegui non va.
Comunque il sito è fatto con stack MERN, deployato su render, raggiungibile all'indirizzo www.marcomigliorini.com

## 2 - Metamask test

È un frontend minimale per forzare metamask a utilizzare un sottoinsieme di chain.

## 3 - Smart Contract NFT minting collection

Sono due Smart Contract, ERC721 fatto "a mano" e ERC1155 facco con "OpenZeppelin", di cui si può eseguire il deploy su Mumbai, e ricercarli su OpenSea.

## 4 - Frontend NFT collection (execute after 3)

È un frontend di prova per visualizzare gli NFT deployati su Mumbai. E' basilare ma funziona.

## 5 - Smart Contract wallet multisig

Sono due Smart COontract per un wallet multisig MxN, uno semplice e l'altro un po' più articolato.

## 6 - Smart Contract dex

È lo Smart Contract del dex di cui vi parlavo al colloquio. Era scritto per Solidity v0.6.3 quindi utilizza ancora il contratto SafeMath.sol per la gestione dell'artitmetica.

## 7 - Test Smart Contract dex

È la parte di test, fatti tramite Truffle, per il precedente smart contract.

## 8 - dApp game

È il gioco carta/forbice/sasso fatti tipo dApp.

## 9 - Challenge

Exploit di smart contract deployato su Mumbai.

### "Attacker.sol" contract address

L'address dello smart contract Attacker.sol su Mumbai è: 0x1B8D0E15cd04d4A678cBd50Ab0624f9BfdCcb4D4.

### 'node index.js' to performe exploit of smart contract

Da cmd eseguendo il comando 'node index.js' si esegue l'exploit di "InformationVault.sol" deployato su Mumbai all'indirizzo 0xe27AdBD639a6B4e5F04eC1C8C45F1C796F45c862.

### ".env" contains the parameters to be set to run the exploit

Nel file .env, versionato per semplicità, è possibile modificare i parametri: ATTACKER_PAYLOAD e ATTACKER_METHOD_SIGNATURE, per cambiare rispettivamente il payload con cui si vuole sovrascrivere lo STORAGE dello smart contract exploitato, e la funzione da richiamare per effettuare l'override stesso, tramite delegateCall.

### "AbiEncoder.sol" utility smart contract to encode payload to execute exploit

Lo smart "AbiEncoder.sol" può essere utilizzato per generare il payload d'interesse per la funzione che s'intende richiamare con la delegateCall.
