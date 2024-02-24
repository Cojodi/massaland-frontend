import githubLogo from "../../assets/github-icon.svg";
import githubLogoLight from "../../assets/github-light.svg";
import massaLogoLight from "../../assets/massa-logos/massa-logo-light.png";
import massaLogoDark from "../../assets/massa-logos/massa-logo.png";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

interface FooterProps {
  currentTheme?: string;
}

const Footer = ({ currentTheme }: FooterProps) => {
  const donationWalletAddr =
    "AU1VefqkYDNGHNoX6uoD4x9cqXVEfwatjF5cicPNaxLTGHhwgZLG";
  return (
    <section>
      <footer className="w-full py-6 px-4 border-t border-border-grey dark:border-white/10 flex flex-col md:flex-row justify-between">
        <div className="flex flex-row items-center justify-center mb-4 md:mb-0">
          <div>
            <a
              href={"https://github.com/cojodi/massaland-frontend"}
              className="flex justify-center items-center"
            >
              <Image
                src={currentTheme === "dark" ? githubLogoLight : githubLogo}
                width={50}
                alt="GitHub Logo"
              />
            </a>
          </div>
          <p className="font-medium text-base leading-[16px]">Powered by</p>
          <div>
            <a
              className="flex justify-center items-center"
              href={"https://massa.net"}
            >
              <Image
                src={currentTheme === "dark" ? massaLogoLight : massaLogoDark}
                width={150}
                height={50}
                alt={"massa logo"}
              />
            </a>
          </div>
        </div>
        <p className="text-center font-medium text-base leading-[16px] mb-4 md:mb-0">
          <Link href="/disclosure-statement">
            <a className="inline-block mx-2">Disclosure statement</a>
          </Link>
          <Link href="/terms" className="inline-block my-4 mx-4">
            <a className="inline-block mx-2">Terms of use</a>
          </Link>
          <Link href="/privacy" className="inline-block my-4 mx-4">
            <a className="inline-block mx-2">Privacy policy</a>
          </Link>
        </p>
        <button
          onClick={() => {
            navigator.clipboard.writeText(donationWalletAddr).then(() => {
              toast.success(`Copied: ${donationWalletAddr}`);
            });
          }}
        >
          <p className="text-center font-normal  text-xs text-base leading-[16px] ">
            Donations (MASSA): <br /> {donationWalletAddr}
          </p>
        </button>
      </footer>
    </section>
  );
};

export default Footer;
