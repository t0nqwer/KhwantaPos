import React, { useState, useEffect } from "react";
import useAppContext from "../zustand/AppContext";

const Setting = () => {
  const [Ports, setPorts] = useState([]);
  const setCashDrawer = useAppContext((state) => state.setCashDrawer);
  const cashDrawer = useAppContext((state) => state.cashDrawer);

  useEffect(() => {
    async function getPort() {
      try {
        const result = await electron.getPort.invoke("getCOMPORT");
        console.log(result);
        setPorts(result);
      } catch (error) {
        console.log(error);
      }
    }
    getPort();
    console.log(cashDrawer);
    const select = document.getElementById("select");
    if (select) {
      select.value = cashDrawer;
    }
  }, []);
  useEffect(() => {
    const select = document.getElementById("select");
    if (select) {
      select.value = cashDrawer;
    }
    if (cashDrawer === "") return;
    electron.Cashdrawer(cashDrawer);
  }, [cashDrawer]);
  useEffect(() => {
    console.log(Ports);
  }, [Ports]);
  const handleSelect = (e) => {
    // electron.Cashdrawer(e.target.value);
    setCashDrawer(e.target.value);
  };

  return (
    <div className="w-full p-10 select-none">
      <div className="w-full h-full rounded-lg bg-neutral-400 bg-opacity-70">
        <h1 className="w-full py-5 text-3xl font-bold text-center">Setting</h1>
        <div className="w-full px-10 py-5">
          <select id="select" className="w-full p-3 rounded-lg" defaultValue={cashDrawer} onChange={handleSelect}>
            {Ports.map((item, i) => (
              <option key={item.path} value={item.path}>
                {item.friendlyName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Setting;
