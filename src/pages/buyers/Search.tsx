import SearchBox from "../../components/SearchBox";
import SearchFilter from "../../components/SearchFilter";
import SearchResult from "../../components/SearchResult";

export default function Search() {
  return (
    <>
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
  );
}
