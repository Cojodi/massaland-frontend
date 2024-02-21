"use client";

import power from "../../assets/icons/power.svg";
import powerLight from "../../assets/icons/powerLight.svg";
import powerorange from "../../assets/icons/powerOrange.svg";
import { useDarkMode } from "../../hooks/useDarkMode";
import ConnectWalletModal from "../Modal/ConnectWalletModal";
import AlephiumWalletConnectButton from "../WalletConnect/AlephiumWalletConnect";
import { IAccount, IProvider } from "@massalabs/wallet-provider";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ConnectWallet = () => {
  const { currentTheme } = useDarkMode();

  const [account, setAccount] = useState<IAccount | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [errorMessage, setErrorMessage] = useState<any>("");
  const [lastOpId, setLastOpId] = useState<string | null>(null);
  const [ratingsModalOpen, setRatingModalOpen] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const onConfirm = async () => {
    setRatingModalOpen(false);
  };
  const onConnectClicked = async () => {
    try {
      const { providers } = await import("@massalabs/wallet-provider");
      let provider = (await providers(true, 10000))[0];
      let accounts = await provider.accounts();
      if (accounts.length === 0) {
        setErrorMessage("No accounts found");
        return;
      }
      console.log(provider);
      setProvider(provider);
      setAccount(accounts[0]);
    } catch (e) {
      console.log(e);
      setErrorMessage("Please install a Massa Wallet Provider and refresh.");
    }
    toast.info("Install a supported Massa wallet provider to connect!");
  };

  const onDisconnectClicked = () => {
    throw "not implemented";
  };

  return (
    <>
      {!account?.address() ? (
        <button
          onClick={account?.address() ? onDisconnectClicked : onConnectClicked}
          className="group relative flex items-center justify-between border-solid border border-black dark:border-white bg-none rounded-3xl hover:border-orange dark:hover:border-orange px-4 py-[12.5px] lg:py-[10.5px] text-black dark:text-white hover:text-orange dark:hover:text-orange w-full lg:w-auto"
        >
          <div className="font-semibold mr-[20px] flex justify-center lg:justify-start items-center lg:items-start w-full lg:w-auto">
            Connect
          </div>
          <div className="absolute w-[1px] h-full bg-black dark:bg-white right-10 group-hover:bg-orange" />
          <div>
            <div className="flex group-hover:hidden">
              <Image
                src={currentTheme === "dark" ? powerLight : power}
                alt="power-icon"
                className="text-orange"
                color="orange"
              />
            </div>
            <div className="hidden group-hover:flex">
              <Image
                src={powerorange}
                alt="power-icon"
                className="text-orange"
                color="orange"
              />
            </div>
          </div>
        </button>
      ) : (
        <div className={"flex-wrap break-words"}>
          Connected to: {account?.address()}
        </div>
      )}
      <div></div>

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
