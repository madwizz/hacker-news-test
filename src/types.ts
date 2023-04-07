export interface Story {
  id: number;
  by: string;
  time: number;
  title: string;
  url: string;
  score: number;
  text: string;
  kids: number[];
  descendants: number;
}

export interface Comment {
  id: number;
  by: string;
  time: number;
  text: string;
  kids: number[];
}
