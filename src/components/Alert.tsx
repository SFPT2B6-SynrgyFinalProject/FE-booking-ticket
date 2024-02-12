import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

export interface AlertProps {
  type: "success" | "fail" | "process";
  message?: string;
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  const refDiv = useRef(null);

  // console.log(message);
  let alertIcon;

  switch (type) {
    case "success":
      alertIcon = (
        <Icon
          icon={"mingcute:check-circle-line"}
          className="text-green-500 w-16 h-16 sm:w-16 sm:h-16"
        ></Icon>
      );
      break;
    case "fail":
      alertIcon = (
        <Icon
          icon={"line-md:close-circle"}
          className="text-red-500 w-16 h-16 sm:w-16 sm:h-16"
        ></Icon>
      );
      break;
    case "process":
      alertIcon = (
        <Icon
          icon={"uim:process"}
          className="animate-spin rotate-180 text-blue-500 w-16 h-16 sm:w-20 sm:h-20"
        ></Icon>
      );
      break;
  }

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        initialFocus={refDiv}
        as="div"
        className="relative z-10 select-none"
        onClose={() => false}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div ref={refDiv} className="fixed inset-0 overflow-y-auto">
          <div className="flex lg:min-h-screen items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white align-middle shadow-xl transition-all px-2 sm:px-5">
                <div className="py-5 sm:py-6 flex justify-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-black font-sans"
                  >
                    {alertIcon}
                  </Dialog.Title>
                </div>
                <div className="pb-8 sm:pb-9 text-base sm:text-xl text-gray-700 font-semibold">
                  {message}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Alert;
