"use client";
import React from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import Card from "@/components/Card";
import { coustard, unbounded } from "@/components/Fonts";

export default function page() {
	return (
		<div className="flex flex-col gap-y-12 text-cream w-full">
			<div className="w-full flex flex-col rounded-lg">
				<div className="w-11/12 mx-auto flex items-center justify-between bg-black text-cream  py-4 px-2 ">
					<div className="flex items-center gap-x-3">
						<Image
							src="/arcade-white.svg"
							alt="alt"
							width={1000}
							height={1000}
							className="w-8"
						/>
						<div className="flex flex-col">
							<h6
								className={`${unbounded.className} text-lg font-bold`}
							>
								Onboarding Games
							</h6>
						</div>
					</div>
				</div>
				<div className="pl-6 py-6 flex flex-row w-full overflow-x-scroll gap-x-4 rounded-b-lg">
					{[
						{
							title: "The Flying Burd",
							image: "/flappyBird.png",
							slug: "flappy-bird",
						},
					].map((item, index) => (
						<Card
							key={index}
							title={item.title}
							image={item.image}
							slug={item.slug}
						/>
					))}
				</div>
			</div>

			<div className="w-full flex flex-col rounded-lg">
				<div className="w-11/12 mx-auto flex items-center justify-between bg-black text-cream  py-4 px-2 ">
					<div className="flex items-center gap-x-3">
						<Image
							src="/solo.svg"
							alt="alt"
							width={1000}
							height={1000}
							className="w-8"
						/>
						<div className="flex flex-col">
							<h6
								className={`${unbounded.className} text-lg font-bold`}
							>
								Enganging Games
							</h6>
						</div>
					</div>
				</div>
				<div className="pl-6 py-6 flex flex-row w-full overflow-x-scroll gap-x-4 rounded-b-lg">
					{[
						{
							title: "Racing Kars",
							image: "/carfighter.png",
							slug: "racing-kars",
						},
					].map((item, index) => (
						<Card
							key={index}
							title={item.title}
							image={item.image}
							slug={item.slug}
						/>
					))}
				</div>
			</div>

			<div className="w-full flex flex-col rounded-lg">
				<div className="w-11/12 mx-auto flex items-center justify-between bg-black text-cream  py-4 px-2 ">
					<div className="flex items-center gap-x-3">
						<Image
							src="/slot.svg"
							alt="alt"
							width={1000}
							height={1000}
							className="w-8"
						/>
						<div className="flex flex-col">
							<h6
								className={`${unbounded.className} text-lg font-bold`}
							>
								Degen Games
							</h6>
						</div>
					</div>
				</div>
				<div className="pl-6 py-6 flex flex-row w-full overflow-x-scroll gap-x-4 rounded-b-lg">
					{[
						{
							title: "Made my day",
							image: "/poker.png",
							slug: "pooker",
						},
					].map((item, key) => (
						<Card
							key={key}
							title={item.title}
							image={item.image}
							slug={item.slug}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
