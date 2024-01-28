// Example usage in another component
import React, { useState } from "react";
import Button from "./Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import InputComponent from "./Input";
import Tablev2 from "./Tablev2";
import { FormModal } from "./FormModal";

const MyComponent: React.FC = () => {
  interface Row {
    id: number;
    name: string;
    email: string;
    nohp: string;
    role: string;
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function handleEdit(id: number): void {
    console.log(`Editing record with ID ${id}`);
  }

  function handleDelete(id: number): void {
    console.log(`Deleting record with ID ${id}`);
  }

  const columns = [
    {
      name: "Name",
      selector: (row: Row) => row.name,
      sortable: true,
    },
    {
      name: "Nomor Telepon",
      selector: (row: Row) => row.nohp,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: Row) => row.email,
      sortable: true,
    },

    {
      name: "Role",
      selector: (row: Row) => row.role,
      sortable: true,
    },
    {
      name: "Action",
      center: true,
      cell: (row: Row) => (
        <div className="flex items-center py-2">
          <Button
            onClick={() => handleEdit(row.id)}
            className={`mr-2 text-sm font-bold bg-blue-900 text-white rounded-lg`}
            size="xs"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(row.id)}
            className={`text-sm font-bold bg-red-600 text-white rounded-lg`}
            size="xs"
          >
            Hapus
          </Button>
        </div>
      ),
    },
  ];



  const data = [
    {
      id: 1,
      name: "Admin",
      nohp: "081234567890",
      email: "Admin@gmail.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Pengguna",
      nohp: "081234567890",
      email: "Pengguna@gmail.com",
      role: "Pembeli",
    },
    {
      id: 3,
      name: "Pengguna",
      nohp: "081234567890",
      email: "Pengguna@gmail.com",
      role: "Pembeli",
    },
    {
      id: 4,
      name: "Pengguna",
      nohp: "081234567890",
      email: "Pengguna@gmail.com",
      role: "Pembeli",
    },
    {
      id: 5,
      name: "Pengguna",
      nohp: "081234567890",
      email: "Pengguna@gmail.com",
      role: "Pembeli",
    },
  ];

  return (
    <>
      <div className="my-10">
        <div className="flex justify-center">
          <Button type="primary-dark" color="primary-dark" onClick={openModal}>
            Click Me!
          </Button>
        </div>

        <FormModal title="Payment successful" isOpen={isOpen}>
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-10">
              Your payment has been successfully submitted. Weve sent you an email with all of the
              details of your order. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Laboriosam et fuga minima debitis, sit enim soluta inventore eveniet nisi numquam?
            </p>
          </div>

          <div className="mt-4 flex gap-x-4 justify-center">
            <Button
              type="secondary"
              className="border border-gray-300 hover:bg-gray-100 rounded-xl"
              color="secondary-normal"
              size="sm"
              onClick={closeModal}
            >
              Close
            </Button>

            <Button type="primary-dark" className=" rounded-xl" color="primary-dark" size="sm">
              Simpan
            </Button>
          </div>
        </FormModal>
      </div>

      {/* <div className="flex justify-center my-10">
        <Button type="primary-dark" width="default">
          Click Me
        </Button>
      </div> */}

      <div className="my-10">
        <Tablev2 columns={columns} data={data} />
      </div>

      <div className="flex justify-start flex-col px-10 py-8 mt-20">
        <h1 className="title text-4xl mb-4">Button Components</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 bg-[#222] rounded-[64px] p-10 gap-14">
          <div className="flex flex-col gap-4">
            <h4 className="text-xl text-white">Button Size</h4>
            <div className="flex flex-col gap-3 items-center">
              <Button type="primary" size="lg" disabled>
                Large
              </Button>
              <Button type="primary" size="md">
                Medium
              </Button>
              <Button type="primary" size="base">
                Normal
              </Button>
              <Button type="primary" size="sm">
                Small
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-xl text-white">Button Split - Enable</h4>
            <div className="flex flex-col gap-3 items-center">
              <Button type="primary" color="primary-normal">
                Primary
              </Button>
              <Button type="secondary" color="secondary-v">
                Secondary
              </Button>
              <Button type="tertiary" color="tertiary-normal">
                Tertiary
              </Button>
              <Button type="text" color="text">
                Button Text
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-xl text-white">Split Button - With Icon</h4>
            <div className="flex flex-col gap-3 items-center">
              <Button type="primary" color="primary-dark">
                Primary <Icon icon="tabler:arrow-right" width={24} height={24} />
              </Button>
              <Button type="secondary" color="secondary-normal">
                Secondary
                <Icon icon="tabler:arrow-right" width={24} height={24} />
              </Button>
              <Button type="tertiary">
                Tertiary <Icon icon="tabler:arrow-right" width={24} height={24} />
              </Button>
              <Button type="text">
                Button Text <Icon icon="tabler:arrow-right" width={24} height={24} />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-xl text-white">Full width button - Enable</h4>
            <div className="flex flex-col gap-3 items-center">
              <Button type="primary" width="full" color="primary-normal">
                Primary
              </Button>
              <Button type="secondary" width="full" color="secondary-normal">
                Secondary
              </Button>
              <Button type="tertiary" width="full" color="tertiary-normal">
                Tertiary
              </Button>
              <Button type="text" width="full" color="text">
                Button Text
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-xl text-white">Full width button - With Icon</h4>
            <div className="flex flex-col gap-3 items-center">
              <Button type="primary" width="full" color="primary-normal">
                Primary <Icon icon="tabler:arrow-right" width={24} height={24} />
              </Button>
              <Button type="secondary" width="full" color="secondary-normal">
                Secondary <Icon icon="tabler:arrow-right" width={24} height={24} />
              </Button>
              <Button type="tertiary" width="full" color="tertiary-normal">
                Tertiary <Icon icon="tabler:arrow-right" width={24} height={24} />
              </Button>
              <Button type="text" width="full" color="text">
                Button Text <Icon icon="tabler:arrow-right" width={24} height={24} />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-xl text-white">Full width button - Disable</h4>
            <div className="flex flex-col gap-3 items-center">
              <Button type="primary" width="full" color="primary-normal" disabled>
                Primary <Icon icon="tabler:arrow-right" width={24} height={24} />
              </Button>
              <Button type="secondary" width="full" color="secondary-normal" disabled>
                Secondary <Icon icon="tabler:arrow-right" width={24} height={24} />
              </Button>
              <Button type="tertiary" width="full" color="tertiary-normal" disabled>
                Tertiary <Icon icon="tabler:arrow-right" width={24} height={24} />
              </Button>
              <Button type="text" width="full" color="text" disabled>
                Button Text <Icon icon="tabler:arrow-right" width={24} height={24} />
              </Button>
            </div>
          </div>
        </div>

        <h1 className="title text-4xl mb-4 mt-20">Input Components</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 bg-[#fff] border border-[#ddd] shadow-xl rounded-[64px] p-10 gap-14">
          <div className="flex flex-col gap-4">
            <p>Input with icon - left</p>
            <InputComponent
              type="text"
              placeholder="Username"
              icon="mingcute:eye-line"
              iconPosition="left"
            />
            <p>Input with icon - right</p>
            <InputComponent
              type="email"
              placeholder="Enter your email"
              icon="eva:email-outline"
              iconPosition="right"
            />
            <p>Input disabled</p>
            <InputComponent type="password" placeholder="Enter your password" disabled />
          </div>
          <div className="flex flex-col gap-4">
            <p>Input rounded large</p>
            <InputComponent type="text" placeholder="Username" customStyle="!rounded-[40px]" />
          </div>
          <div className="flex flex-col gap-4"></div>
          <div className="flex flex-col gap-4"></div>
          <div className="flex flex-col gap-4"></div>
          <div className="flex flex-col gap-4"></div>
        </div>
      </div>
    </>
  );
};

export default MyComponent;
