"use client";
import { TileModel, TileModelType } from "@/models/TileModel";
import { getCollection, getDocument } from "@/firebase/firestore/getData";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { collection, DocumentReference } from "firebase/firestore";
import { useAuthContext } from "./AuthContext";

export type TilesContextState = {
  tiles: TileModel[];
  loading: boolean;
  error: Object | null;
  refresh: () => Promise<any>;
  isInitialFetched: boolean;
};

export const TilesContext = createContext<TilesContextState>({
  tiles: [],
  loading: false,
  error: null,
  refresh: async () => {},
  isInitialFetched: false,
});

export const useTilesContext = () => useContext(TilesContext);

export function TilesContextProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { id } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [isInitialFetched, setIsInitialFetched] = useState(false);

  const [error, setError] = useState<any>(null);
  const [tiles, setTiles] = useState<TileModel[]>([]);

  const refresh = async () => {
    if (loading) {
      return;
    }

    setError(null);
    setLoading(true);

    const { result, error: err } = await getCollection(`users/${id}/tiles`);

    if (err != null || err != undefined) {
      setError(error);
      setLoading(false);
      return;
    }

    const resultList = result?.docs.map((doc) => doc.data());

    const tiles = resultList?.map((res) => {
      const result = res as TileModelType;

      return new TileModel(result);
    });

    setTiles(tiles ?? []);

    console.log({ result, err, error, resultList, tiles });

    setIsInitialFetched(true);
    setLoading(false);
  };

  const value: TilesContextState = {
    loading,
    refresh,
    error,
    tiles,
    isInitialFetched,
  };

  return (
    <TilesContext.Provider value={value}>{children}</TilesContext.Provider>
  );
}
