import MetamaskWallet from "./components/MetamaskWallet";
import Proposals from "./components/Proposals";

function App() {
  return (
    <MetamaskWallet>
      {({ handleRead, handleWrite }) => ( // Render Props
        <Proposals onHandleRead={handleRead} onHandleWrite={handleWrite} />
      )}
    </MetamaskWallet>
  );
}

export default App;