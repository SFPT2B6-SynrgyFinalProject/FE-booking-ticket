import SearchBox from "../../components/SearchBox";
import SearchFilter from "../../components/SearchFilter";
import SearchResult from "../../components/SearchResult";

export default function Search() {
    return (
        <>
            <nav className="navbar w-full h-[84px] shadow fixed top-0 z-50 font-outfit bg-white">
                <div className="container">
                    <div className="w-full h-full flex items-center justify-between">
                        <div className="logo">
                            <img src="https://ik.imagekit.io/1ishtw6qg/Group%2011.png?updatedAt=1705907981897" alt="logo" />
                        </div>
                        <ul className="flex gap-10 text-sm">
                            <a href=""><li>Beranda</li></a> 
                            <a href=""><li>Penerbangan</li></a>
                            <a href=""><li>Promo</li></a>
                            <a href=""><li>Pesanan</li></a>
                            <a href=""><li>Notifikasi</li></a>
                            <a href=""><li>Bantuan</li></a>
                            <a href=""><li>Unduh App</li></a>
                            <a href=""><li>User</li></a>
                        </ul>
                    </div>
                </div>
            </nav>
            <SearchBox />
            <section>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[26px] mt-[50px]">
                        <SearchFilter />
                        <SearchResult />
                    </div>
                </div>
            </section>
        </>
    )
}