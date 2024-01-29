import SearchBox from "../../../../components/SearchBox";
import SearchFilter from "../../../../components/SearchFilter";
import SearchResult from "../../../../components/SearchResult";
import useAction from "./search.hooks";

export default function Search() {
  const { searchData } = useAction();
  console.log(searchData);

  return (
    <div className="mt-24">
      <SearchBox />
      <section className="mb-14">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[26px] mt-[50px]">
            <SearchFilter />
            <SearchResult />
          </div>
        </div>
      </section>
    </div>
  );
}
