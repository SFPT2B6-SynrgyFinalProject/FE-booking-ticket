// this example shows how to use the table component for menu-pengguna
import { Table } from './Table';

const data = [
    { name: 'Admin', email: 'Admin@gmail.com', nohp: '08123456789', role: 'Admin', status: 'AKTIF' },
    { name: 'Pengguna', email: 'Pengguna@gmail.com', nohp: '08123456789', role: 'Pembeli', status: 'AKTIF' },
    { name: 'Pengguna', email: 'Pengguna@gmail.com', nohp: '08123456789', role: 'Pembeli', status: 'AKTIF' },
    { name: 'Pengguna', email: 'Pengguna@gmail.com', nohp: '08123456789', role: 'Pembeli', status: 'AKTIF' },
    { name: 'Pengguna', email: 'Pengguna@gmail.com', nohp: '08123456789', role: 'Pembeli', status: 'AKTIF' },
    // you can add more data from backend to here.
];

// this is the header of the table.
const headers = ['Nama', 'Email', 'No HP', 'Peran', 'Status'];

const renderRow = (item: any) => (
    <>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.nohp}</td>
        <td>{item.role}</td>
        <td>{item.status}</td>
    </>
);

const handleEdit = (index: number) => {
    // logics to handle edit button
    console.log(`Edit item with index ${index}`);
};

const handleDelete = (index: number) => {
    // logics to handle delete button
    console.log(`Delete item with index ${index}`);
};


const TableUseExample = () => {
    return <Table headers={headers} data={data} renderRow={renderRow} onEdit={handleEdit}
        onDelete={handleDelete} />;
};

export default TableUseExample;