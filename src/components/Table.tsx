import DataTable from 'react-data-table-component';
import Button from './Button';

interface TableColumn {
    name: any;
    selector: any;
}


interface TableProps {
    headers: TableColumn[];
    data: any[];
    onEdit?: (row: any) => void;
    onDelete?: (row: any) => void;
}

const Table: React.FC<TableProps> = ({ headers, data, onEdit, onDelete }) => {
    const columns = [
        ...headers,
        {
            name: 'Aksi',
            cell: (row: any) => {
                return (
                    <div className="flex items-center space-x-2 py-4">
                        {onEdit && (
                            <Button className='bg-blue-800 py-1.5 px-1.6 rounded-lg' onClick={() => onEdit(row)} size='sm'>Edit</Button>
                        )}
                        {onDelete && (
                            <Button className='bg-red-600 py-1.5 px-1.6 rounded-lg' onClick={() => onDelete(row)} size='sm'>Delete</Button>
                        )}
                    </div>
                );
            }
        }
    ];

    return (
        <div className="overflow-x-auto">
            <DataTable
                columns={columns}
                data={data}
                noHeader
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15]}
                highlightOnHover
                pointerOnHover
                responsive
            />
        </div>
    );


    // return (
    //     <>
    //         <div className="flex justify-start space-x-2 py-2 px-2">
    //             <Button className='bg-green-600 py-1.5 px-1.5 rounded-lg' size='sm'>Tambah Pengguna</Button>
    //         </div>
    //         <div className="overflow-x-auto">
    //             <table className='w-full table-auto'>
    //                 <thead className='border-b-2 bg-gray-200'>
    //                     <tr>
    //                         <th className='border-b p-2 text-left py-2'>No</th>
    //                         {headers.map((header, index) => (
    //                             <th key={index} className='border-b p-2 text-left py-2'>{header}</th>
    //                         ))}
    //                         <th className='border-b p-2 text-left py-2'>Aksi</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {data.map((item, index) => (
    //                         <tr key={index} className='hover:bg-gray-50 border-b-2'>
    //                             <td>{index + 1}</td>
    //                             {renderRow(item, index)}
    //                             <td className="flex items-center space-x-2 py-4">
    //                                 {onEdit && (
    //                                     <Button className='bg-blue-800 py-1.5 px-1.6 rounded-lg' onClick={() => onEdit(index)} size='sm'>Edit</Button>
    //                                 )}
    //                                 {onDelete && (
    //                                     <Button className='bg-red-600 py-1.5 px-1.6 rounded-lg' onClick={() => onDelete(index)} size='sm'>Delete</Button>
    //                                 )}
    //                             </td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //         </div>
    //     </>
    // );
};

export default Table;