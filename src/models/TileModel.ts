import { Timestamp } from "firebase/firestore";

export type TileModelType = {
  id: string;
  title: string;
  description: string;
  type: TileType;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  author: string;
};

export class TileModel {
  id: string;
  title: string;
  description: string | null;
  type: TileType;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  author: string;

  constructor({
    id,
    title,
    description,
    type,
    createdAt,
    updatedAt,
    author,
  }: TileModelType) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.type = type;
    this.description = description;
  }
}

export type OneTimeTileModel = TileModel & {};

export type RucurringTileModel = TileModel & {};

export type TileType = "recurring" | "onetime";
