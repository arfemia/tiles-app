"use client";
import { TileModel } from "@/models/TileModel";
import { useRouter } from "next/navigation";
import ShiftingCountdown from "./CountDown";
import { Divider } from "./Divider";

export function TileCard({ tile }: { tile: TileModel }) {
  const router = useRouter();

  return (
    <div className="bg-slate-900 my-2  border-slate-700 border-[1px] rounded-xl shadow-md flex flex-col w-full ">
      <div className="flex flex-row justify-between">
        <h2 className="text-xl sm:text-2xl font-bold px-4 py-2 text-white">
          {tile.title}
        </h2>
        <button
          className="bg-slate-900 rounded-xl px-2 hover:bg-slate-700 text-slate-500 font-mono text-sm"
          onClick={() => {
            router.push(`/edit-tile/${tile.id}`);
          }}
        >
          View
        </button>
      </div>
      <Divider />
      <p className=" px-4 py-1 text-slate-400 font-mono">
        {"Due At: " + tile.endDate.toDate().toLocaleString()}
      </p>

      <div className="px-4 ">
        <ShiftingCountdown date={tile.endDate.toDate()}></ShiftingCountdown>
      </div>

      {/* <Divider className="mt-2" />

      {tile.description?.length !== 0 && (
        <p className=" px-4 text-slate-400 py-1 text-sm">{tile.description}</p>
      )} */}

      <i className="text-slate-500 px-4 font-mono text-xs  md:text-sm py-1 sm:py-2">
        {"Last Updated: " + tile.updatedAt.toDate().toLocaleString()}
      </i>
      {/* <i className="text-slate-500 px-4 font-mono pb-1 text-sm">
        {"Created At: " + tile.createdAt.toDate().toLocaleString()}
      </i> */}
    </div>
  );
}
