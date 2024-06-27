import Image from "next/image";
import React from "react";

export default function page({ params }: { params: { slug: string } }) {
	return (
		<div className="w-11/12 mx-auto mb-6">
			<div className="flex flex-1 h-[70vh] flex-col px-2 py-4 border-x-[3px] border-t-[3px] border-b-2 border-purple-grey-800 bg-purple-grey rounded-t-md">
				<div className="flex-1 border-2 border-purple-grey-800"></div>
			</div>
			<div className="border-b-[3px] border-x-[3px] bg-pearl border-purple-800 rounded-b-md p-4">
				<Image
					src="/controllers.svg"
					alt="alt"
					className="w-fit"
					width={500}
					height={500}
				/>
			</div>
		</div>
	);
}
