import { NavigateFunction, useNavigate } from "react-router-dom";
import MyComponent from "../components/Doc";
import { useSelector } from "react-redux";
import { RootState } from "../config/redux/store";

export default function Home() {
  const navigate: NavigateFunction = useNavigate();
  const userData = useSelector((state: RootState) => state.userReducer);
  const { fullName, gender, noHp, birthDate, email } = userData;
  const handleLogout = function () {
    const isLogout = confirm("Apakah anda yakin ingin logout?");
    if(isLogout) {
      localStorage.clear();
      navigate("/login");
    }
  }  
  return (
    <div>
        <h1 className="text-3xl text-center font-semibold">{`Hello, ${fullName}`}</h1>
        <ol className="text-center">
          <li>{gender}</li>
          <li>{noHp}</li>
          <li>{birthDate}</li>
          <li>{email}</li>
        </ol>
        <button onClick={handleLogout}>Logout</button>
      <MyComponent />
    </div>
  )
}