"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { coustard } from "@/components/Fonts";
import { useAccount } from "wagmi";
import { Gamepad2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Card({
  title,
  image,
  slug,
}: {
  title: string;
  image: string;
  slug: string;
}) {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  const handleLinkClick = () => {
    if (!isConnected) {
      // Show alert if not connected
      setShowAlert(true);
    } else {
      // Navigate to the specified route if connected
      router.push(`/${slug}`);
    }
  };

  return (
    <>
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
            <div onClick={handleLinkClick} className="size-6 cursor-pointer">
              <Image
                src="/circle-play.svg"
                alt="alt"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
        {/* Conditional rendering of Alert */}
        {!isConnected && showAlert && (
          <Alert>
            <Gamepad2 className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              Please connect your wallet to play
            </AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
}
