import { useBgColor, useIcon } from "./dashboard.hooks";
import { rupiahFormatter } from "../../../../lib";
import { dayTransaction } from "./dashbord.types";
import Skeleton from "react-loading-skeleton";

export default function DetailTransaction({
  detailTransaction,
  day,
  isLoading,
}: dayTransaction) {
  return (
    <>
      <div className="mt-5">
        <h3 className=" text-xl mb-4">{day}</h3>
        <div>
          {detailTransaction.length === 0 ? (
            isLoading ? (
              Array.from(Array(3)).map((_, index) => {
                return <Skeleton key={index} height={30} className="mb-5" />;
              })
            ) : (
              <p className="text-gray-500 text-center">Tidak ada transaksi</p>
            )
          ) : (
            detailTransaction.map((val, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row items-center border-b border-b-gray-200 py-3"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${useBgColor(
                      val.status === "Selesai" ? "success" : ""
                    )}`}
                  >
                    {useIcon(val.status === "Selesai" ? "success" : "")}
                  </div>
                  <div className="flex-1">
                    <div className="text-base font-medium">{val.orderId}</div>
                    <div className="text-sm">{val.status}</div>
                  </div>
                  <div className="hidden sm:block text-green-600">
                    {rupiahFormatter(Number(val.paymentTotal))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
