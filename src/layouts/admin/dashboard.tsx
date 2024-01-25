import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactNode } from "react";
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import OrderList from "../../components/OrderList";

interface ContentCard {
  bgColor: string;
  txtColor: string;
  icon: ReactNode;
  label: ReactNode;
}

function Card({ bgColor, txtColor, icon, label }: ContentCard) {
  return (
    <div
      className={`rounded-xl ${bgColor} bg-opacity-10 py-7 px-5 w-full lg:w-36 ${txtColor} space-y-4`}
    >
      <div>{icon}</div>
      <div>{label}</div>
    </div>
  );
}

export default function Dashboard() {
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => console.info("swipe action triggered")}>
        <div className="flex items-center px-4">
          <Icon icon="ph:eye" width={20} className="text-white" />
        </div>
      </SwipeAction>

      <SwipeAction destructive={true} onClick={() => console.info("swipe action triggered")}>
        <div className="flex items-center px-4">
          <Icon icon="uil:edit" width={20} className="text-white" />
        </div>
      </SwipeAction>

      <SwipeAction destructive={true} onClick={() => console.info("swipe action triggered")}>
        <div className="w-12">
          {/* <FiEye size={20} color="white" /> */}
          {/* <Icon icon="ph:eye" width={20} className="text-white" /> */}
        </div>
      </SwipeAction>
    </TrailingActions>
  );
  return (
    <>
      <div className="px-8 flex-1 pb-10">
        {/* <InputComponent
          type="text"
          placeholder="Search"
          id="search-dashboard"
          name="search-dashboard"
          icon="mingcute:search-line"
          iconPosition="left"
        /> */}
        <h3 className="font-semibold text-xl text-blue-700 my-5">Welcome back Admin!</h3>
        <div className="flex gap-5 flex-col lg:flex-row">
          <Card
            bgColor={"bg-green-500"}
            txtColor={"text-green-600"}
            icon={<Icon icon="bx:money" width={25} />}
            label={
              <span className="text-sm">
                Income <br />
                +Rp.1000.000
              </span>
            }
          />
          <Card
            bgColor={"bg-red-500"}
            txtColor={"text-red-600"}
            icon={<Icon icon="bx:outline" width={25} />}
            label={
              <span className="text-sm">
                Income <br />
                -Rp.500.000
              </span>
            }
          />
          <Card
            bgColor={"bg-yellow-500"}
            txtColor={"text-yellow-600"}
            icon={<Icon icon="bx-user" width={25} />}
            label={
              <span className="text-sm">
                Account <br />
                1129 person
              </span>
            }
          />
          <Card
            bgColor={"bg-teal-500"}
            txtColor={"text-teal-600"}
            icon={<Icon icon="lucide:home" width={25} />}
            label={
              <span className="text-sm">
                Account <br />
                1129 person
              </span>
            }
          />
        </div>
        <div className="mt-5">
          {Array.from(Array(5)).map((_, index) => (
            <div key={index} className="rounded-2xl bg-blue-700 mb-4">
              <SwipeableList threshold={0.9} type={Type.IOS}>
                <SwipeableListItem trailingActions={trailingActions()}>
                  <div className="bg-white p-4 rounded-2xl lg:rounded-2xl xl:rounded-xl border border-gray-300 flex w-full">
                    <img
                      src="https://images.pexels.com/photos/157606/girl-black-dress-portrait-hair-157606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover mr-3"
                    />
                    <div className="text-sm">
                      <div className="text-gray-900">John Smith</div>
                      <div className="text-xs text-gray-400">johnsmith@gmail.com</div>
                    </div>
                  </div>
                </SwipeableListItem>
              </SwipeableList>
            </div>
          ))}
        </div>
      </div>
      <section className="w-96 md:hidden xl:block bg-gray-100 hidden rounded-tl-[3rem] overflow-hidden px-8 mt-0">
        <div className="flex justify-end space-x-9 items-center">
          {/* <GrNotification size={20} /> */}
          {/* <BiUser size={20} /> */}
          {/* <img
            src="https://images.pexels.com/photos/157606/girl-black-dress-portrait-hair-157606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="User"
            className="w-9 h-9 object-cover rounded-full"
          /> */}
        </div>
        <div>
          <OrderList />
        </div>
      </section>
    </>
  );
}
