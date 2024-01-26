import React from "react";
import DataTable from "react-data-table-component";

interface TableProps {
  columns: any;
  data?: any;
  customStyles?: any;
}

const Tablev2: React.FC<TableProps> = ({ columns, data, customStyles }) => {

  return (
    <div className="w-full my-8 border border-gray-200 rounded-xl overflow-hidden">
      <div className="border-gray-300">
        <DataTable
          columns={columns}
          data={data}
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
