export const callRead = async (contract, functionName, ...args) => {
  if (!contract?.[functionName]) {
    throw new Error(`Function ${functionName} not found on contract`);
  }
  const result = await contract[functionName](...args);
  return result.toString();
};

export const sendWrite = async (contract, functionName, ...args) => {
  if (!contract?.[functionName]) {
    throw new Error(`Function ${functionName} not found on contract`);
  }

  // If last arg has .value, managed it
  const hasOptions = args.length > 0 && args[args.length - 1]?.value !== undefined;
  const options = hasOptions ? args.pop() : {};

  const tx = await contract[functionName](...args, options);
  return tx;
};