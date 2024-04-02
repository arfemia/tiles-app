"use client";
import ShiftingCountdown from "@/components/CountDown";
import { useAuthContext } from "@/context/AuthContext";
import { useTilesContext } from "@/context/TilesContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page(): JSX.Element {
  // Access the user object from the authentication context
  const { user, id } = useAuthContext();

  const tilesState = useTilesContext();

  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page if the user is not logged in
    if (user == null) {
      router.push("/");
      return;
    }

    if (!tilesState.isInitialFetched) {
      tilesState.refresh();
    }
  }, [user, router, tilesState]); // Include 'router' in the dependency array to resolve eslint warning

  return (
    <div className="flex flex-col items-center mx-8">
      <div className="flex flex-row w-full  justify-between max-w-2xl py-2 pl-4">
        <h1 className="text-3xl ">Your Tiles</h1>
        <button
          className="bg-slate-600 rounded-xl px-2 hover:bg-slate-700"
          onClick={() => router.push("/create-tile")}
        >
          ☑️ Create Tile
        </button>
      </div>
      <div className="bg-slate-700 w-full h-[1px] my-2  max-w-2xl"></div>
      {tilesState.tiles.map((e) => (
        <div
          key={e.id}
          className="bg-slate-900 my-2 p-4  border-slate-700 border-[1px] rounded-xl shadow-md flex flex-col w-full max-w-2xl"
        >
          <h2 className="text-2xl font-bold">{e.title}</h2>
          <p className="text-slate-300">{e.description}</p>

          <b className="text-slate-300">
            {"Due At: " + e.endDate.toDate().toLocaleString()}
          </b>
          {/* <ShiftingCountdown days={}></ShiftingCountdown> */}

          <i className="text-slate-500">
            {"Updated At: " + e.updatedAt.toDate().toLocaleString()}
          </i>
          <i className="text-slate-500">
            {"Created At: " + e.createdAt.toDate().toLocaleString()}
          </i>
        </div>
      ))}
    </div>
  );
}

export default Page;
