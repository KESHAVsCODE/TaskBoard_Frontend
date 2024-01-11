import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../index.css";
import { ListsDataContextProvider } from "./context/listsDataContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ListsDataContextProvider>
    <App />
  </ListsDataContextProvider>
);
