import { useProvider } from "~/composables/web3/use-provider.composable";
import { ethers } from "ethers";
import Quoter from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
import { fromReadableAmount } from "~/utils/function/token.function";

export const useQuoter = () => {
  const provider = useProvider();
  const runtimeConfig = useRuntimeConfig();

  const getQuoter = () => {
    return new ethers.Contract(
      runtimeConfig.public.quoterAddress,
      Quoter.abi,
      provider.getProvider()!,
    );
  };

  const getQuote = async (base: string, quote: string, fee: number) => {
    const quoter = getQuoter();

    try {
      const [amountOut] = await quoter.callStatic.quoteExactInputSingle(
        base,
        quote,
        fee,
        fromReadableAmount(1, 18),
        0,
      );

      return parseFloat(ethers.utils.formatUnits(amountOut, 18));
    } catch (e) {
      return null;
    }
  };

  return { getQuote };
};
