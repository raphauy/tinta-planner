"use client";

import { useParams } from "next/navigation";


interface IEmptyState {
  message: string;
}

export default function EmptyState({ message }: IEmptyState) {
  const params = useParams();
  if (!params)
    throw Error("useParams() is not working")

  const slug= params.slug

  return (
    <div className="flex items-center justify-center flex-grow px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
      <div className="flex flex-col items-center text-center">
        <h3 className="mt-2 text-2xl font-semibold text-gray-900">
          {message} {slug}
        </h3>
      </div>
    </div>
  );
}
