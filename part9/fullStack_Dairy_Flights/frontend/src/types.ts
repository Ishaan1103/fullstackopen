export interface Dairy {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment: string;
}

export type NewDairy = Omit<Dairy,'id'>

export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
  }
  
  export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
  }

  
export interface AddDairyProps {
    addValue: (newObj: { date: string; visibility: string; weather: string; comment: string }) => void;
}