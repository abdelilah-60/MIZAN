import Dexie, { type Table } from 'dexie';

export interface Farm {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  syncStatus: 'synced' | 'pending' | 'failed';
  user: { fullName: string; phoneNumber?: string };
}

export interface Field {
  id: string;
  name: string;
  farmId: string;
  cropType: string;
  geoPolygon: unknown;
  area: number;
  plantingDate?: string;
  agronomicData?: Record<string, string>;
  createdAt: string;
  syncStatus: 'synced' | 'pending' | 'failed';
  farm: { name: string };
  seasonSummary?: Array<{
    currentStage: string;
    accumulatedGdd: number;
    gddToNextStage?: number;
    accumulatedChilling: number;
    bioFixReached: boolean;
    predictedHarvestDate?: string;
  }>;
}

export class MizanDatabase extends Dexie {
  farms!: Table<Farm, string>;
  fields!: Table<Field, string>;

  constructor() {
    super('MizanOfflineDB');
    this.version(2).stores({
      farms: 'id, name, syncStatus, createdAt',
      fields: 'id, name, farmId, syncStatus, createdAt'
    });
  }
}

export const db = new MizanDatabase();
