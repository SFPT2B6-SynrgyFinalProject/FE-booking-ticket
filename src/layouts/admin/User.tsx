// Contoh penggunaan komponen Tablev2 di halaman lain
import Tablev2 from "../../components/Tablev2";
import Button from "../../components/Button";


const User = () => {
  function handleEdit(id: number): void {
    console.log(`Editing record with ID ${id}`);
  }

  function handleDelete(id: number): void {
    console.log(`Deleting record with ID ${id}`);
  }

  const columns = [
    {
      name: "Name",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
      sortable: true,
    },
    {
      name: "Nomor Telepon",
      selector: (row: any) => row.nohp,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row: any) => row.role,
      sortable: true,
    },
    {
      name: "Action",
      center: true,
      width: "20rem",
      cell: (row: any) => (
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
    <div className="w-full">
      <Tablev2 columns={columns} data={data} />
    </div>
  );
};

export default User;

