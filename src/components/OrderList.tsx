import { Icon } from "@iconify/react/dist/iconify.js";

export default function OrderList() {
  const today = [
    {
      name: "John Smith",
      status: "success",
      price: `Rp.200.000`,
    },
  ];

  const yesterday = [
    {
      name: "Angela Smith",
      status: "success",
      price: `Rp.220.000`,
    },
    {
      name: "Mickhel Oas",
      status: "cancel",
      price: `Rp.430.000`,
    },
    {
      name: "Jack Sparow",
      status: "on-going",
      price: `Rp.340.000`,
    },
  ];

  const bgColors = (status: string) => {
    switch (status) {
      case "success":
        return "bg-blue-500";

      case "cancel":
        return "bg-red-500";

      case "on-going":
        return "bg-yellow-500";

      default:
        return "bg-red-500";
    }
  };

  const icons = (icon: string) => {
    switch (icon) {
      case "success":
        return <Icon icon="ion:airplane-outline"className="text-white" />;

      case "cancel":
        return <Icon icon="material-symbols:cancel-outline" className="text-white" />;

      case "on-going":
        return <Icon icon="material-symbols:pending-actions" className="text-white"/>;

      default:
        return <Icon icon="mi:notification" className="text-white"/>;
    }
  };

  return (
    <section>
      <div className="mt-10">
        <h3>Today</h3>
        <div>
          {today.map((val, index) => {
            return (
              <div
                key={index}
                className="flex flex-row items-center border-b border-b-gray-200 py-3"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${bgColors(
                    val.status
                  )}`}
                >
                  {icons(val.status)}
                </div>
                <div className="flex-1">
                  <div className="text-base font-medium">{val.name}</div>
                  <div className="text-sm">{val.status}</div>
                </div>
                <div className="text-green-600">+{val.price}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <h3>Yesterday</h3>
        <div>
          {yesterday.map((val, index) => {
            return (
              <div
                key={index}
                className="flex flex-row items-center border-b border-b-gray-200 py-3"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${bgColors(
                    val.status
                  )}`}
                >
                  {icons(val.status)}
                </div>
                <div className="flex-1">
                  <div className="text-base font-medium">{val.name}</div>
                  <div className="text-sm">{val.status}</div>
                </div>
                <div className="text-red-600">-{val.price}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
