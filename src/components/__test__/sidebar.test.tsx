import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "../Sidebar";

describe("Sidebar", () => {
  test("renders sidebar with menu items", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Sidebar />
      </MemoryRouter>
    );

    // Memastikan semua item menu dirender dengan benar
    const menuItems = screen.getAllByRole("link");
    expect(menuItems).toHaveLength(6);

    // Memastikan setiap item menu memiliki ikon dan teks yang sesuai
    const menuNames = [
      "Dashboard",
      "Pengguna",
      "Bandara",
      // "Rute",
      "Maskapai",
      "Pemesanan",
      "Transaksi",
    ];
    menuNames.forEach((name, index) => {
      const menuItem = menuItems[index];
      expect(menuItem).toBeInTheDocument();
      expect(menuItem).toHaveTextContent(name);
    });

    // Memastikan kelas aktif diterapkan dengan benar pada menu yang sesuai dengan URL saat ini
    expect(menuItems[0]).toHaveClass("flex flex-row items-center hover:text-blue-700"); // Dashboard harus aktif saat URL adalah '/dashboard'
  });
});
