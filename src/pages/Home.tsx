import { NavigateFunction, useNavigate } from "react-router-dom";
import MyComponent from "../components/Doc";
import Footer from "../components/footer";

export default function Home() {
  const navigate: NavigateFunction = useNavigate()
  const handleLogout = function () {
    localStorage.clear();
    navigate("/login");
  }  
  return (
    <div>
        <h1 className="text-3xl text-center font-semibold">Hello world!</h1>
        <button onClick={handleLogout}>Logout</button>
      <MyComponent />
      <Footer />
    </div>
  )
}