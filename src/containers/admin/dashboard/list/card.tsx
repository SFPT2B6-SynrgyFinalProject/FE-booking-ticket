import { Icon } from "@iconify/react/dist/iconify.js";
import { BodyOfCardType, ContentCardType } from "./dashbord.types";
import {
  usePopularAirline,
  useTotalOrder,
  useTransaction,
  useUserActive,
} from "./dashboard.hooks";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Card({ bgColor, txtColor, icon, title, body }: ContentCardType) {
  return (
    <div
      className={`rounded-xl ${bgColor} bg-opacity-10 py-7 px-5 w-full lg:w-36 ${txtColor} space-y-4 h-36 lg:h-40 relative`}
    >
      <div>{<Icon icon={icon} width={25} />}</div>
      <div className="text-sm">
        <p>{title}</p>
        <p className="absolute bottom-3 text-lg font-semibold">{body}</p>
      </div>
    </div>
  );
}

export default function BodyOfCard() {
  const { isLoadingPopularAirline } = usePopularAirline();
  const { userActive, isLoadingUserActive } = useUserActive();
  const { totalOrder, isLoadingTotalOrder } = useTotalOrder();
  const { totalTransaction, doneTotalFlight, isLoadingTotalTrasaction } =
    useTransaction();
  const bodyOfCard: BodyOfCardType[] = [
    {
      iconName: "lucide:users",
      title: "Jumlah Pengguna",
      body: isLoadingUserActive ? (
        <Skeleton className="w-10 h-5 rounded-2xl bg-red-100" />
      ) : (
        userActive
      ),
      bgColor: "bg-red-500",
      txtColor: "text-red-600",
    },
    {
      iconName: "mdi:bank-outline",
      title: "Jumlah Pemesanan",
      body: isLoadingTotalOrder ? (
        <Skeleton className="w-10 h-5 rounded-2xl bg-teal-100" />
      ) : (
        totalOrder
      ),
      bgColor: "bg-teal-500",
      txtColor: "text-teal-600",
    },
    {
      iconName: "ion:card-outline",
      title: "Jumlah Transaksi",
      body: isLoadingTotalTrasaction ? (
        <Skeleton className="w-10 h-5 rounded-2xl bg-green-100" />
      ) : (
        totalTransaction
      ),
      bgColor: "bg-green-500",
      txtColor: "text-green-600",
    },
    {
      iconName: "pepicons-pencil:airplane",
      title: "Penerbangan Selesai",
      body: isLoadingTotalTrasaction ? (
        <Skeleton className="w-10 h-5 rounded-2xl bg-purple-100" />
      ) : (
        doneTotalFlight
      ),
      bgColor: "bg-purple-500",
      txtColor: "text-purple-600",
    },
  ];
  return (
    <>
      {bodyOfCard.map((data, index) => (
        <div key={index}>
          {isLoadingPopularAirline ? (
            <Skeleton className="lg:w-36 h-32 rounded-2xl" />
          ) : (
            <Card
              icon={data.iconName}
              title={data.title}
              body={data.body}
              bgColor={data.bgColor}
              txtColor={data.txtColor}
            />
          )}
        </div>
      ))}
    </>
  );
}
