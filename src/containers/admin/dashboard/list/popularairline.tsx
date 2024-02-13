import { SwipeableList, SwipeableListItem, Type } from "react-swipeable-list";
import { trailingActions, usePopularAirline } from "./dashboard.hooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import Skeleton from "react-loading-skeleton";

export default function PopularAirline() {
  const { popularAirline, isLoadingPopularAirline } = usePopularAirline();
  return (
    <>
      {isLoadingPopularAirline
        ? Array.from(Array(5)).map((_, index) => (
            <Skeleton key={index} className="w-full h-20 rounded-2xl mb-4" />
          ))
        : popularAirline.map((airline) => (
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
                        <span className="font-normal">({airline.code})</span>
                      </div>
                    </div>
                  </div>
                </SwipeableListItem>
              </SwipeableList>
            </div>
          ))}
    </>
  );
}
