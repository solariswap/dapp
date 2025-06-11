import { useProvider } from "~/composables/web3/use-provider.composable";
import { type BigNumberish, ethers } from "ethers";
import ERC20 from "~/utils/abi/ERC20.json";
import { useAppKitAccount } from "@reown/appkit/vue";

export const useErc20 = (address: string) => {
  const provider = useProvider();
  const account = useAppKitAccount();

  const getERC20Contract = () => {
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
    const erc20 = getERC20Contract();
    const owner = account.value.address;

    // If the allowance is already greater or equal than the requested amount,
    // do not re-approve.
    const allowance = await erc20.allowance(owner, spender);
    if (allowance.gte(value)) return;

    return erc20.approve(spender, value);
  };

  return { balanceOf, approve };
};
