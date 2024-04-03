import { TileModel } from "@/models/TileModel";
import ShiftingCountdown from "./CountDown";
import { Divider } from "./Divider";

export function TileCard({ tile }: { tile: TileModel }) {
  return (
    <div className="bg-slate-900 my-2  border-slate-700 border-[1px] rounded-xl shadow-md flex flex-col w-full max-w-2xl">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold px-4 py-2 ">{tile.title}</h2>
        <button
          className="bg-slate-900 rounded-xl px-2 hover:bg-slate-700 text-slate-500 font-mono"
          onClick={() => {}}
        >
          Edit
        </button>
      </div>
      <Divider />
      <p className=" px-4 text-slate-400 py-1">{tile.description}</p>

      <b className="text-slate-300 px-4 py-1 ">
        {"Due At: " + tile.endDate.toDate().toLocaleString()}
      </b>
      <div className="px-4">
        <ShiftingCountdown date={tile.endDate.toDate()}></ShiftingCountdown>
      </div>

      <i className="text-slate-500 px-4 font-mono">
        {"Updated At: " + tile.updatedAt.toDate().toLocaleString()}
      </i>
      <i className="text-slate-500 px-4 font-mono pb-1">
        {"Created At: " + tile.createdAt.toDate().toLocaleString()}
      </i>
    </div>
  );
}
