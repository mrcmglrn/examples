import {
  isAddress,
  Contract,
  JsonRpcProvider,
  getDefaultProvider,
  formatUnits,
} from "ethers";
import contractABI from "../utils/contractABI.js";
import contractAddress from "../utils/contractAddress.js";

export async function getTokenBalance(req, res) {
  try {
    const { address } = req.params;

    if (!address) {
      return res.status(400).json({ error: "Missing address parameter" });
    }

    if (!isAddress(address)) {
      return res.status(500).json({ error: "Invalid Ethereum address" });
    }

    // Choose provider: use RPC_URL (or ALCHEMY_URL/INFURA_URL) if provided, otherwise default provider
    const rpcUrl = process.env.SEPOLIA_RPC;
    const provider = rpcUrl
      ? new JsonRpcProvider(rpcUrl)
      : getDefaultProvider();

    // Instantiate contract
    const contract = new Contract(contractAddress, contractABI, provider);

    // Read decimals and balance.
    // If decimals call fails, assume 18.
    const decimalsPromise = await contract.decimals().catch(() => 18);
    const balancePromise = await contract.balanceOf(address);
    const [decimals, rawBalance] = await Promise.all([
      decimalsPromise,
      balancePromise,
    ]);

    // rawBalance is a BigInt-like BigNumber; format into human-readable string
    const balance = formatUnits(rawBalance, Number(decimals));

    return res.status(200).json(balance);
  } catch (error) {
    console.error("Error fetching token balance:", error);
    return res.status(500).json({ error: "Failed to fetch token balance" });
  }
}
