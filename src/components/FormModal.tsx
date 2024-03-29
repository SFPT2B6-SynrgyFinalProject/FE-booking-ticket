import React, { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface FormModalProps {
  title?: string;
  isOpen: boolean; // Properti untuk mengontrol keadaan modal
  // closeModal: () => void;
  children?: ReactNode;
  className?: string;
}

export const FormModal: React.FC<FormModalProps> = ({ title, isOpen, children, className = "w-full max-w-md" }) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 select-none" onClose={() => false}>
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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={`transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all ${className}`}>
                  <div className="bg-primary-normal px-6 py-4">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-white font-sans"
                    >
                      {title}
                    </Dialog.Title>
                  </div>
                  <div className="px-6 py-4 pb-8">
                    {children}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
