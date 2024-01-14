import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateProvider from "./providers/PrivateProvider";
import PublicProvider from "./providers/PublicProvider";
import NotFound from "./pages/NotFound";
import MyComponent from "./components/Doc";

const router = createBrowserRouter([
	{
		element: <PrivateProvider/>,
		children: [
			{
				path: "/",
				element: <Home/>
			}
		]
	},
	{
		element: <PublicProvider/>,
		children: [
			{
				path: "/login",
				element: <Login/>
			},
			{
				path: "/register",
				element: <Register/>
			},
			{
				path: "/components",
				element: <MyComponent/>
			}
		]
	},
	{
		path: "*",
		element: <NotFound/>
	}
]);

export default function App () {
    return <RouterProvider router={router}/>
}