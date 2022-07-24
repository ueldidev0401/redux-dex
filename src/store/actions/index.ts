import {
  createAction as action,
  createAsyncAction as asnycAction,
} from "typesafe-actions";

export const updateWalletConnection = action(
  "walletstate/UPDATE_WALLET_CONNECTION"
)<any>();
// add here.
