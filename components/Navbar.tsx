"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { coustard, unbounded } from "@/components/Fonts";
import { ConnectButton, darkTheme } from "thirdweb/react";

import { createWallet } from "thirdweb/wallets";
import { defineChain } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { client } from "@/app/_lib/thirdweb/client";

export default function Navbar() {
	const path = usePathname();
	console.log(path);
	const wallet = [createWallet("com.coinbase.wallet")];
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className="bg-black w-full">
			<div className="max-w-screen-2xl w-11/12 mx-auto py-4 flex items-center justify-between">
				<div className="flex items-center gap-x-8 text-sm">
					<Link href="/">
						<Image
							src={"/logo.svg"}
							alt="logo"
							width={500}
							height={500}
							className="w-48"
						/>
					</Link>
					{path !== "/" &&
						[
							{ title: "creator", href: "/creator" },
							// { title: "play", href: "/play" },
							{ title: "dashboard", href: "/dashboard" },
						].map(({ title, href }, index) => (
							<Link
								key={index}
								className={`${
									path.includes(href)
										? "bg-pink border-none"
										: "bg-none"
								}  text-pearl px-8 py-2 rounded-lg border border-pearl/30 hidden md:block ${
									coustard.className
								}`}
								href={href}
							>
								{title}
							</Link>
						))}
				</div>
				<div className="hidden md:block">
					<ConnectButton
						client={client}
						wallets={wallet}
						chain={defineChain(baseSepolia)}
						theme={darkTheme({
							colors: {
								primaryButtonBg: "#161616",
								primaryButtonText: "#dfdfdf",
								selectedTextBg: "#161616",
								borderColor: "#161616",
							},
						})}
					/>
				</div>
				<div className="md:hidden">
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="text-pearl focus:outline-none"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							{isMenuOpen ? (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							) : (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16m-7 6h7"
								/>
							)}
						</svg>
					</button>
					{isMenuOpen && (
						<div className="absolute right-0 mt-2 mr-2 space-y-2 pb-4 w-48 bg-black border border-purple-grey-800 rounded-md shadow-lg z-20">
							<ConnectButton
								client={client}
								wallets={wallet}
								chain={defineChain(baseSepolia)}
								theme={darkTheme({
									colors: {
										primaryButtonBg: "#161616",
										primaryButtonText: "#dfdfdf",
										selectedTextBg: "#161616",
										borderColor: "#161616",
									},
								})}
							/>
							<Link href="/redeem" className="text-pearl px-4">
								Withdraw Earnings
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
