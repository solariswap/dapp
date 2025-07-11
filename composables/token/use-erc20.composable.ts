import { useProvider } from "~/composables/web3/use-provider.composable";
import { type BigNumberish, ethers } from "ethers";
import ERC20 from "~/utils/abi/ERC20.json";
import { useAppKitAccount } from "@reown/appkit/vue";

export const useErc20Factory = () => {
  const provider = useProvider();
  const account = useAppKitAccount();

  const construct = (address: string) => {
    const getERC20Contract = () => {
      console.log("getSigner", provider.getSigner());
      return new ethers.Contract(address, ERC20.abi, provider.getSigner()!);
    };

    const balanceOf = (to?: string) => {
      const owner = to ?? account.value.address;

      const erc20 = getERC20Contract();

      try {
        return erc20.balanceOf(owner);
      } catch {
        return 0;
      }
    };

    /**
     * Approves a spender to transfer a specified amount of tokens on behalf of the owner.
     *
     * This function interacts with an ERC-20 token contract to grant transfer allowance to
     * a specific spender. Before approving, it checks the current allowance and skips the
     * approval process if the existing allowance is greater than or equal to the requested amount.
     *
     * @param spender - The address of the spender to be approved.
     * @param value - The amount of tokens to authorize for transfer.
     * @returns A promise resolving to the transaction result when the approval is processed,
     * or void if no approval transaction is required.
     */
    const approve = async (spender: string, value: BigNumberish) => {
      console.log("Approving spender:", spender, "for value:", value);
      const erc20 = getERC20Contract();
      console.log("ERC20 contract:", erc20);
      const owner = account.value.address;

      console.log("Owner address:", owner);
      // If the allowance is already greater or equal than the requested amount,
      // do not re-approve.
      const allowance = await erc20.allowance(owner, spender);
      console.log("Current allowance:", allowance.toString());
      if (allowance.gte(value)) return;
      console.log(
        "Allowance is less than requested value, proceeding with approval.",
      );

      const tx = await erc20.approve(spender, value);
      console.log("Transaction sent:", tx.hash);

      return tx.wait();
    };

    return { balanceOf, approve };
  };

  return { construct };
};
