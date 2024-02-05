import gambarbg from "../../../../assets/images/plane-is-flying-blue-sky.jpg";
import gambar1 from "../../../../assets/images/famous-borobudur-temple-mungkid-indonesia.webp";
import gambar2 from "../../../../assets/images/kelingking-beach-sunset-nusa-penida-island-bali-indonesia.webp";
import gambar3 from "../../../../assets/images/temple-gates-lempuyang-luhur-temple-bali-indonesia.jpg";
// import useAction from "./home.hooks";

export default function Home() {
  return (
    <div>
      <div
        className="w-full h-[25rem] bg-center bg-cover"
        style={{
          backgroundImage: `url(${gambarbg})`,
        }}
      >
        <div className="flex justify-center w-full h-full bg-gray-800/40">
          <div className="container text-center">
            <p className="pt-28 text-white text-center font-outfit text-4xl leading-10 tracking-tight">
              Let's Start Booking Your Tickets and Soar to Your Dream
              Destinations!
            </p>
          </div>
        </div>
      </div>

      <div className="container mt-72 lg:mt-56 sm:mt-80 md:mt-80 sm:mb-16 lg:mb-24">
        <div className="flex justify-center">
          <h1 className="font-outfit text-3xl font-medium leading-10 tracking-wide">
            Top Destinations
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-28 mt-20 place-items-center">
          <div className="w-[18rem] h-[17.4rem] mb-10 lg:mb-0">
            <img
              src={gambar3}
              alt="Top 1"
              className="h-full object-cover object-center rounded-3xl shadow-xl"
            />
          </div>
          <div className="w-[18rem] h-[17.4rem] mb-10 lg:mb-0">
            <img
              src={gambar2}
              alt="Top 2"
              className="h-full object-cover object-center rounded-3xl shadow-xl"
            />
          </div>
          <div className="w-[18rem] h-[17.4rem] mb-10 lg:mb-0">
            <img
              src={gambar1}
              alt="Top 3"
              className="h-full object-cover object-center rounded-3xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
