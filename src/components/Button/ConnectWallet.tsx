import ConnectWalletModal from "../Modal/ConnectWalletModal";
import AlephiumWalletConnectButton from "../WalletConnect/AlephiumWalletConnect";
import { ClientFactory, Args, bytesToStr } from "@massalabs/massa-web3";
import { IAccount, providers, IProvider } from "@massalabs/wallet-provider";
import React, { useEffect, useState } from "react";

const ConnectWallet = async () => {
  const [account, setAccount] = useState<IAccount | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [errorMessage, setErrorMessage] = useState<any>("");
  const [lastOpId, setLastOpId] = useState<string | null>(null);
  const [ratingsModalOpen, setRatingModalOpen] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const onConfirm = async () => {
    setRatingModalOpen(false);
  };
  useEffect(() => {
    (async () => {
      try {
        let provider = (await providers(true, 10000))[0];
        let accounts = await provider.accounts();
        if (accounts.length === 0) {
          setErrorMessage("No accounts found");
          return;
        }

        setProvider(provider);
        setAccount(accounts[0]);
      } catch (e) {
        console.log(e);
        setErrorMessage(
          "Please install massa station and the wallet plugin of Massa Labs and refresh."
        );
      }
    })();
  }, []);
  return (
    <>
      <AlephiumWalletConnectButton />

      <ConnectWalletModal
        isOpen={ratingsModalOpen}
        onClose={() => {
          setRatingModalOpen(false);
        }}
        fromNav
        onConfirm={onConfirm}
        error={error}
      />
    </>
  );
};

export default ConnectWallet;
