import { Timestamp } from "firebase/firestore";

export type TileModelType = {
  id: string;
  title: string;
  description: string;
  type: TileType;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  author: string;
  endDate: Timestamp;
};

export class TileModel {
  id: string;
  title: string;
  description: string | null;
  type: TileType;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  endDate: Timestamp;
  author: string;

  constructor({
    id,
    title,
    description,
    type,
    createdAt,
    updatedAt,
    author,
    endDate,
  }: TileModelType) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.type = type;
    this.description = description;
    this.endDate = endDate;
  }
}

export type OneTimeTileModel = TileModel & {};

export type RucurringTileModel = TileModel & {};

export type TileType = "recurring" | "onetime";
