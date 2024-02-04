export interface ISearch {
  from: string | undefined;
  to: string | undefined;
  class: string | number;
  depatureDate: string;
  depatureArrival: string;
  person: {
    adult: number;
    child: number;
    infant: number;
  };
}
