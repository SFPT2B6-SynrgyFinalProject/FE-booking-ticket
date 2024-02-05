/* eslint-disable react-hooks/exhaustive-deps */
import { ISearch } from "../home.types";
import { useSelector } from "react-redux";
import { RootState } from "../../../../config/redux/store";

export default function useHome() {
  // const [homeData, setHomeData] = useState<ISearch[]>([]);
  const resultSearch = useSelector(
    (state: RootState) => state.resultSearchReducer
  );
  const optionAirport = useSelector((state: RootState) => state.airportReducer);
  const fromAirport = optionAirport.data.find(
    (airport) => airport.code === resultSearch.departureCode
  );
  const toAirport = optionAirport.data.find(
    (airport) => airport.code === resultSearch.arrivalCode
  );

  const convertDate = (date: string) => {
    const getDate = new Date(date);
    const day = getDate.getUTCDate().toString().padStart(2, "0");
    const month = (getDate.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = getDate.getUTCFullYear();
    return `${day}-${month}-${year}`;
  };

  // misal data from api
  // const data = [
  //   {
  //     from: "Jakarta Search Result",
  //     to: "Denpasar Search Result",
  //     class: "Ekonomi Search Result",
  //     depatureDate: "29-01-2024 Search Result",
  //     depatureArrival: "30-01-2024 Search Result",
  //     person: "Dewasa 1 Search Result",
  //   },
  // ];
  const data: ISearch[] = [
    {
      from: fromAirport?.cityName,
      to: toAirport?.cityName,
      class: resultSearch.classId,
      depatureDate: convertDate(resultSearch.departureDateStart),
      depatureArrival: convertDate(resultSearch.departureDateEnd),
      person: resultSearch.passenger,
    },
  ];

  // const fetchhomeData = async () => {
  //   try {
  //     // logic fetch data
  //     setHomeData(data);
  //   } catch (error) {
  //     console.log("error");
  //   }
  // };

  // useEffect(() => {
  //   fetchhomeData();
  // }, []);

  return data;
}
