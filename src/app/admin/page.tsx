"use client";
import ShiftingCountdown from "@/components/CountDown";
import { TileCard } from "@/components/TileCard";
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

  const tiles = tilesState.tiles;

  tiles.sort((a, b) => b.updatedAt.toMillis() - a.updatedAt.toMillis());

  return (
    <div className="flex flex-col items-center mx-8">
      <div className="flex flex-row w-full  justify-between max-w-2xl py-2 pl-4">
        <h1 className="text-3xl font">All Tiles</h1>
        <button
          className=" rounded-xl px-2 bg-green-800 hover:bg-green-900 text-white"
          onClick={() => router.push("/create-tile")}
        >
          🗒 Create Tile
        </button>
      </div>
      <div className="bg-slate-700 w-full h-[1px] my-2 "></div>

      <div className="grid  grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        {tiles.map((tile) => (
          <TileCard tile={tile} key={tile.id} />
        ))}
      </div>
    </div>
  );
}

export default Page;
