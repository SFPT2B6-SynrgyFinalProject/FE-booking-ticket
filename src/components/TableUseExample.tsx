// this example shows how to use the table component for menu-pengguna
import Table from './Table';

const data = [
    { name: 'Admin', email: 'Admin@gmail.com', nohp: '08123456789', role: 'Admin', status: 'AKTIF' },
    { name: 'Pengguna', email: 'Pengguna@gmail.com', nohp: '08123456789', role: 'Pembeli', status: 'AKTIF' },
    { name: 'Pengguna', email: 'Pengguna@gmail.com', nohp: '08123456789', role: 'Pembeli', status: 'AKTIF' },
    { name: 'Pengguna', email: 'Pengguna@gmail.com', nohp: '08123456789', role: 'Pembeli', status: 'AKTIF' },
    { name: 'Pengguna', email: 'Pengguna@gmail.com', nohp: '08123456789', role: 'Pembeli', status: 'AKTIF' },
    // you can add more data from backend to here.
];

// this is the header of the table.
const columns = [
    {
        name: 'Name',
        selector: 'name',
    },
    {
        name: 'Email',
        selector: 'email',
    },
    {
        name: 'No HP',
        selector: 'nohp',
    },
    {
        name: 'Peran',
        selector: 'role',
    },
    {
        name: 'Status',
        selector: 'status',
    },
];

const handleEdit = (row: any) => {
    // logics to handle edit button
    console.log(`Edit item with index ${row}`);
};

const handleDelete = (row: any) => {
    // logics to handle delete button
    console.log(`Delete item with index ${row}`);
};


const TableUseExample = () => {
    return <Table headers={columns} data={data} onEdit={handleEdit}
        onDelete={handleDelete} />;
};

export default TableUseExample;