import Body from "./components/Body";
import { Header } from "./components/Header";
import { Provider } from "react-redux";
import reduxstore from "./utils/reduxstore";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Watchpage from "./components/Watchpage";
import MainContainer from "./components/MainContainer";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "/watch",
        element: <Watchpage />,
      },
    ],
  },
]);
function App() {
  return (
    <Provider store={reduxstore}>
      <div className="">
        <Header />
        <RouterProvider router={appRouter}>
          <Body />
        </RouterProvider>
      </div>
    </Provider>
  );
}

export default App;
