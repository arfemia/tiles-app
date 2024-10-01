"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useTilesContext } from "@/context/TilesContext";
import addData from "@/firebase/firestore/addData";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Page({ params }: { params: { tileId: string } }): JSX.Element {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDateTime, setEndDateTime] = useState<number | null>(null);
  const router = useRouter();

  const toastId = "loading-tile-edit-id";

  const { user, id } = useAuthContext();

  const tilesState = useTilesContext();

  useEffect(() => {
    // Redirect to the home page if the user is not logged in
    if (user == null) {
      router.push("/");
      return;
    }

    if (!tilesState.isInitialFetched) {
      tilesState.refresh().then(() => {
        const tile = tilesState.tiles.find((value) => {
          return value.id === params.tileId;
        });

        if (tile != null) {
          return;
        }

        setTitle(tile!.title);
        setDescription(tile!.description ?? "");
        setEndDateTime(tile!.endDate.toMillis());
      });
    }
  }, [
    user,
    router,
    tilesState,
    setDescription,
    setEndDateTime,
    setTitle,
    params,
  ]);

  const submitTile = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (title.length === 0 || endDateTime === null) {
      toast.error("Please fill out title and end date");
      return;
    }

    toast.loading("Submitting Tile...", { toastId });

    try {
      const { result, error } = await addData(
        `users/${id}/tiles/${params.tileId}`,
        {
          title,
          description,
          endDate: Timestamp.fromMillis(endDateTime),
          author: id,
          type: "onetime",
        },
        undefined,
        true
      );

      if (error !== undefined && error != null) {
        console.log(error);
        toast.error("Error submitting tile, please try again");
        return;
      }

      toast.success("Submitted Tile successfully");

      tilesState.refresh();

      router.push("/admin");
    } catch (err) {
      console.log(err);

      toast.error("Error submitting tile, please try again");
    }

    toast.done(toastId);
  };

  if (tilesState.loading) {
    return <div>loading...</div>;
  }

  const tile = tilesState.tiles.find((value) => {
    return value.id === params.tileId;
  });

  if (!tile) {
    return (
      <>
        <p>Error</p>
        <button onClick={() => router.push("/admin")}>Go back</button>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center mx-8 ">
      <h1 className="text-2xl">Edit Tile</h1>
      <div className="bg-slate-700 w-full h-[1px] my-2  max-w-2xl"></div>
      <div className="  w-full  max-w-2xl mb-4">
        <label className="">Title</label>
        <input
          placeholder={tile.title}
          className=" border-slate-700 rounded bg-slate-800 w-full my-1 px-2 text-white"
          type={"text"}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>
      <div className=" w-full  max-w-2xl mb-4">
        <label className="my-4">Description</label>
        <textarea
          placeholder={
            tile.description ?? "Add your task description/notes here"
          }
          aria-multiline={true}
          className="bg-slate-800 h-20 w-full my-1 px-2 text-white"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className=" w-full  max-w-2xl mb-4 ">
        <label className="my-4">End Date</label>

        <input
          className="bg-slate-800 w-full my-1 px-2 text-white"
          onChange={(e) => setEndDateTime(Date.parse(e.target.value))}
          type={"datetime-local"}
        ></input>
        <label className="my-4">Previous</label>
        <p>{tile.endDate.toDate().toString()}</p>
      </div>
      <div className="flex flex-row justify-between w-full  max-w-2xl my-4">
        <button
          className="bg-slate-700 rounded-xl py-2 hover:bg-slate-800 my-4 px-4 text-white"
          onClick={() => router.back()}
        >
          ❌ Cancel
        </button>
        <button
          className="bg-green-800 hover:bg-green-900 rounded-xl py-2  my-4 px-4 text-white"
          onClick={submitTile}
        >
          ☑️ Save Tile
        </button>
      </div>
    </div>
  );
}

export default Page;
