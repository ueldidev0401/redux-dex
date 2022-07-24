import { IWalletConnectionState } from "store/reducers/wallet";

export const WalleteState = (state: any) => state.wallet as IWalletConnectionState;
