// export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

// export type Visibility = 'great' | 'good' | 'ok' | 'poor';

import { z } from "zod";
import { NewEntrySchema } from "./utils";

export interface DiaryEntry extends NewDairyEntry {
    id: number;
  }
export type NonSensitiveDiaryEntry = Omit<DiaryEntry,'comment'>;

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}
export enum Visibility{
  Great= 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export type NewDairyEntry = z.infer<typeof NewEntrySchema>