import { useCallback, useState } from "react";
import { getAddress } from "viem";
import { readContract } from "viem/actions";
import { abi } from "../blockchain/abi";
import { GetScoreProps } from "../types/getScoreProps";

export default function useGetScore({
  walletAddress,
  decoderContractAddress,
  wagmiConfig,
}: GetScoreProps) {
  const [data, setData] = useState<bigint | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getScore = useCallback(async () => {
    if (!walletAddress) return;

    setLoading(true);

    try {
      const client = wagmiConfig.getClient();

      const contractScoreResult = await readContract(client, {
        address: getAddress(decoderContractAddress),
        functionName: "getScore",
        abi: abi,
        args: walletAddress && [walletAddress],
      });

      setData(contractScoreResult);
      setError(null);
    } catch (err) {
      console.error("Error reading contract:", err);
      setError((err as Error).message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [decoderContractAddress, abi, walletAddress]);

  return { data, error, loading, getScore };
}
