import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import AppRoutes from "./utils/routes/routes";
const App = ()=>{
  return(
    <BrowserRouter>
    <Navbar/>
    <AppRoutes/>
    </BrowserRouter>
   
  )
}
export default App;