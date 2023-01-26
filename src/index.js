import ReactDOM from "react-dom/client";
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import { LoginContextProvider } from "./Store/LoginContext";

import "./index.css";
import App from "./App";
import { ExpenseContextProvider } from "./Store/ExpenseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LoginContextProvider>
    <ExpenseContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ExpenseContextProvider>
  </LoginContextProvider>
);
