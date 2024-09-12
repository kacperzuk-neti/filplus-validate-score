import { Address } from "viem";

export interface GetScoreProps {
  decoderContractAddress: Address;
  wagmiConfig: any;
  walletAddress?: Address;
}
