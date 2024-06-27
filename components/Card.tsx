import Image from "next/image";
import React from "react";
import Link from "next/link";
import { coustard, unbounded } from "@/components/Fonts";

export default function Card({
	title,
	image,
	slug,
}: {
	title: string;
	image: string;
	slug: string;
}) {
	return (
		<div className="border-4 border-purple-grey-800 rounded-t-md rounded-b-lg max-w-72">
			<div className="p-4 bg-purple-grey">
				<Image
					src={image}
					alt="alt"
					className="w-fit object-cover h-40 border-x-[3px] border-purple-grey-800"
					width={1000}
					height={1000}
				/>
			</div>
			<div
				className={`bg-pearl px-2 pt-4 pb-6 text-purple-800 border-t rounded-b-xl border-purple-grey-800 flex flex-col gap-y-2`}
			>
				<div className="flex items-center justify-between">
					<h6 className={`${coustard.className} text-xl font-bold`}>
						{title}
					</h6>
					<Link href={`/${slug}`}>
						<Image
							src="/circle-play.svg"
							alt="alt"
							width={500}
							height={500}
							className="size-6"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
}
