import { Icon } from "@iconify/react/dist/iconify.js";
import { SwipeableList, SwipeableListItem, Type } from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import OrderList from "./OrderList";
import {
  trailingActions,
  usePopularAirline,
  useTransaction,
} from "./dashboard.hooks";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BodyOfCard from "./card";

export default function Dashboard() {
  const { popularAirline, isLoadingPopularAirline } = usePopularAirline();
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
          {isLoadingPopularAirline
            ? Array.from(Array(5)).map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-full h-20 rounded-2xl mb-4"
                />
              ))
            : popularAirline?.airlines.map((airline) => (
                <div
                  key={airline.number}
                  className="rounded-2xl bg-primary-normal mb-4 "
                >
                  <SwipeableList type={Type.IOS}>
                    <SwipeableListItem
                      trailingActions={trailingActions(airline.number)}
                    >
                      <div className="bg-white py-4 px-5 rounded-2xl lg:rounded-2xl xl:rounded-xl border border-gray-300 flex w-full items-center gap-4">
                        <div className="p-2 bg-primary-normal rounded-xl">
                          <Icon
                            icon="jam:plane-f"
                            className="text-white"
                            width={25}
                          />
                        </div>
                        <div className="text-sm">
                          <div className="text-gray-900 font-semibold text-base">
                            {airline.name}{" "}
                            <span className="font-normal">
                              ({airline.code})
                            </span>
                          </div>
                        </div>
                      </div>
                    </SwipeableListItem>
                  </SwipeableList>
                </div>
              ))}
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
