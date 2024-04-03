import { TileModel } from "@/models/TileModel";
import { toast } from "react-toastify";
import ShiftingCountdown from "./CountDown";
import { Divider } from "./Divider";

export function TileCard({ tile }: { tile: TileModel }) {
  return (
    <div className="bg-slate-900 my-2  border-slate-700 border-[1px] rounded-xl shadow-md flex flex-col w-full max-w-2xl">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold px-4 py-2 ">{tile.title}</h2>
        <button
          className="bg-slate-900 rounded-xl px-2 hover:bg-slate-700 text-slate-500 font-mono"
          onClick={() => {
            toast.info("Coming Soon");
          }}
        >
          Edit
        </button>
      </div>
      <Divider />
      {tile.description?.length !== 0 && (
        <p className=" px-4 text-slate-400 py-1 text-sm">{tile.description}</p>
      )}

      <b className=" px-4 py-1 text-slate-400">
        {"Due At: " + tile.endDate.toDate().toLocaleString()}
      </b>

      <Divider />

      <div className="px-4 py-2">
        <ShiftingCountdown date={tile.endDate.toDate()}></ShiftingCountdown>
      </div>
      <i className="text-slate-500 px-4 font-mono text-sm">
        {"Updated At: " + tile.updatedAt.toDate().toLocaleString()}
      </i>
      <i className="text-slate-500 px-4 font-mono pb-1 text-sm">
        {"Created At: " + tile.createdAt.toDate().toLocaleString()}
      </i>
    </div>
  );
}
