import SearchFilter from "../../../../components/SearchFilter";
import SearchResult from "../../../../components/SearchResult";
import useAction from "./search.hooks";

export default function Search() {
  // const { searchData } = useAction();
  // console.log(searchData);
  console.log(useAction());


  return (
    <>
      <section className="mb-14 mt-[26rem]">
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
