import { TileModel } from "@/models/TileModel";
import ShiftingCountdown from "./CountDown";

export function TileCard({ tile }: { tile: TileModel }) {
  return (
    <div
      key={tile.id}
      className="bg-slate-900 my-2 p-4  border-slate-700 border-[1px] rounded-xl shadow-md flex flex-col w-full max-w-2xl"
    >
      <h2 className="text-2xl font-bold">{tile.title}</h2>
      <p className="text-slate-300">{tile.description}</p>

      <b className="text-slate-300">
        {"Due At: " + tile.endDate.toDate().toLocaleString()}
      </b>
      <ShiftingCountdown date={tile.endDate.toDate()}></ShiftingCountdown>

      <i className="text-slate-500">
        {"Updated At: " + tile.updatedAt.toDate().toLocaleString()}
      </i>
      <i className="text-slate-500">
        {"Created At: " + tile.createdAt.toDate().toLocaleString()}
      </i>
    </div>
  );
}
