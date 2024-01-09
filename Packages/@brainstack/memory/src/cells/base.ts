import { generateUUID } from "../utils/generateuuid";

export type UID = string;

export interface IMemoryCell {
  uid: UID;
  content: any;
  createdAt: Date;
  lastAccessed: Date;
  weight: number;
  associations: UID[];
}

export class BaseMemoryCell implements IMemoryCell {
  uid: UID;
  content: any;
  createdAt: Date;
  lastAccessed: Date;
  weight: number;
  associations: UID[]; 

  constructor(content: any) {
    this.uid = generateUUID();
    this.content = content;
    this.createdAt = new Date();
    this.lastAccessed = new Date();
    this.weight = 0;
    this.associations=[]
  }

  // Additional methods specific to BaseMemoryCell
}
