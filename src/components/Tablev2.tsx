import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Button from "./Button";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Row {
  id: number;
  name: string;
  email: string;
  nohp: string;
  role: string;
}

interface TableColumn {
  name: any;
  width?: any;
  selector?: (row: Row) => string;
  sortable?: any;
}

interface TableProps {
  columns: TableColumn[];
  data: Row[];
}

const Tablev2: React.FC<TableProps> = ({ columns, data }) => {
  const [records, setRecords] = useState(data);

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const newData = data.filter((row) => {
      return (
        row.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.role.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setRecords(newData);
  }

  const customStyles = {
    rows: {
      style: {
        fontSize: "16px",
      },
    },
    headRow: {
      style: {
        fontSize: "16px",
        background: "#F0F0F0",
      },
    },
  };

  return (
    <div className="w-full mx-auto my-6">
      <div className="border-gray-300 p-4 rounded-xl">
        <div className="flex justify-between items-center mt-3 mb-10">
          <Button className={`bg-green-700 text-white rounded-lg`} size="sm">
            Tambah Pengguna <Icon icon="prime:file-import" width={20} className="text-white" />
          </Button>
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-400 px-4 py-2 rounded-xl"
              onChange={handleFilter}
            />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={records}
          customStyles={customStyles}
          highlightOnHover
          pointerOnHover
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        ></DataTable>
      </div>
    </div>
  );
};

export default Tablev2;
