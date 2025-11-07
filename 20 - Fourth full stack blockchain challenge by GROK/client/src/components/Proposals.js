function Proposals({ onHandleRead, onHandleWrite }) {
  const readCounter = () => {
    onHandleRead('proposalCounter');
  };

  const createProposal = () => {
    onHandleWrite('createProposal', 'Nuova proposta');
  };

  return (
    <div>
      <button onClick={readCounter}>Leggi contatore</button>
      <button onClick={createProposal}>Crea proposta</button>
    </div>
  );
}

export default Proposals;