import React from "react";
import DataTable from "react-data-table-component";

interface TableProps {
  columns: any;
  data?: any;
  customStyles?: any;
  isPending?: boolean;
}

const Tablev2: React.FC<TableProps> = ({ isPending, columns, data, customStyles }) => {
  const newColumns = [
    {
      name: "No",
      selector: (row: any) => row.index,
      sortable: false,
      width: "5rem",
    },
    ...columns,
  ];

  const newData = data.map((item: any, index: number) => ({
    ...item,
    index: index + 1,
  }));

  return (
    <div className="grid grid-cols-1 my-8 overflow-hidden border border-gray-200 rounded-md md:rounded-xl">
      <div className="border-gray-300">
        <DataTable
          columns={newColumns}
          progressPending={isPending}
          data={newData}
          customStyles={customStyles}
          highlightOnHover
          pointerOnHover
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20, 50]}
        ></DataTable>
      </div>
    </div>
  );
};

export default Tablev2;
