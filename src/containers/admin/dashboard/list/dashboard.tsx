import "react-swipeable-list/dist/styles.css";
import OrderList from "./detailTransaction";
import { useTransaction } from "./dashboard.hooks";
import "react-loading-skeleton/dist/skeleton.css";
import BodyOfCard from "./card";
import PopularAirline from "./popularairline";

export default function Dashboard() {
  const {
    detailTransactionToday,
    detailTransactionYesterday,
    isLoadingDetailTransaction,
  } = useTransaction();
  return (
    <>
      <div className="px-8 flex-1 pb-10">
        <h3 className="font-semibold text-xl text-blue-700 my-5">
          Selamat datang, Admin!
        </h3>
        <div className="flex gap-5 flex-col lg:flex-row">
          <BodyOfCard />
        </div>
        <h3 className="mt-5 text-blue-700 text-xl font-semibold">
          Pesawat Terpopuler
        </h3>
        <div className="mt-5">
          <PopularAirline />
        </div>
      </div>
      <section className="w-96 md:hidden xl:block  hidden rounded-tl-[3rem] overflow-hidden px-8 mt-0">
        <div className="flex justify-end space-x-9 items-center"></div>
        <OrderList
          detailTransaction={detailTransactionToday}
          day="Hari ini"
          isLoading={isLoadingDetailTransaction}
        />
        <OrderList
          detailTransaction={detailTransactionYesterday}
          day="Kemarin"
          isLoading={isLoadingDetailTransaction}
        />
      </section>
    </>
  );
}
