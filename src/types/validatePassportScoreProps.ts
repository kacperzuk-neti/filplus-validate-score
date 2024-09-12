import { Address } from "viem";

export interface ValidatePassportScoreProps {
  decoderContractAddress: Address;
  scoreDivider: bigint;
  wagmiConfig: any;
  walletAddress?: Address;
  onLoading?: (isLoading: boolean) => void;
  onError?: (message: string) => void;
  onScoreChange?: (score: number | null) => void;
  IndicatorComponent?: any;
}
