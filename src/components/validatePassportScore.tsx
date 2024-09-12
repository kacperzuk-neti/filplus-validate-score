import { useEffect, useState } from "react";
import useGetScore from "../hooks/useGetScore";
import { ValidatePassportScoreProps } from "../types/validatePassportScoreProps";

const ValidatePassportScore = (props: ValidatePassportScoreProps) => {
  const [score, setScore] = useState<number | null>(null);

  const {
    IndicatorComponent,
    scoreDivider,
    walletAddress,
    decoderContractAddress,
    wagmiConfig,
    onError,
    onScoreChange,
    onLoading,
  } = props;

  const {
    data: scoreResult,
    error,
    loading: scoreLoading,
    getScore,
  } = useGetScore({ wagmiConfig, walletAddress, decoderContractAddress });

  useEffect(() => {
    let scoreResponse = null;

    if (scoreResult) {
      const calcScore = scoreResult / scoreDivider;
      scoreResponse = Number(calcScore);
    }

    if (error) {
      onError && onError(error);
      setScore(0);
      return;
    }

    setScore(scoreResponse);
    onScoreChange && onScoreChange(scoreResponse);
  }, [scoreResult, error]);

  useEffect(() => {
    onLoading && onLoading(scoreLoading);
  }, [scoreLoading]);

  useEffect(() => {
    (async () => {
      getScore();
    })();
  }, [walletAddress]);

  if ((scoreLoading || !walletAddress) && IndicatorComponent) {
    return <IndicatorComponent />;
  }

  if (score != null) {
    return (
      <div className="text-center">{`Current passport score: ${score}`}</div>
    );
  }
};

export default ValidatePassportScore;
