import React from "react";
import IndexRoute from "../routes/IndexRoute";
import Navbar from "../components/layout/Navbar";
import Popup from "../components/layout/Popup";
import GetStartedExplore from "../components/layout/GetStarted";
import { UseData } from "../context/MainContext";
import { config } from "../config/config";

const App = () => {
  const {Popup} = UseData();
  // console.log(config.BASE_URL);
  return (
    <div className="min-h-screen w-full  bg-[#F9FAFB] text-slate-950 dark:bg-[#0B0F19]  overflow-x-hidden">
      {/* <Navbar user={{name:"Prince"}}/> */}
      <GetStartedExplore />
     {Popup && <Popup/>}
      <IndexRoute />
    </div>
  );
};

export default App;
