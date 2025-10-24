export const readContract = async (contract) => {
  try {
    const result = await contract.totalSupply();
    return result.toString();
  } catch (error) {
    throw new Error('Failed to call read function: ' + error.message);
  }
};

export const writeContract = async (contract, to) => {
  try {
    const tx = await contract.mint(to);
    return tx;
  } catch (error) {
    throw new Error('Failed to call write function: ' + error.message);
  }
};

export const writeUserContract = async (contract) => {
  try {
    const mintPrice = await contract.mintPrice();
    const tx = await contract.publicMint({ value: mintPrice });
    return tx;
  } catch (error) {
    throw new Error('Failed to call write user function: ' + error.message);
  }
};
