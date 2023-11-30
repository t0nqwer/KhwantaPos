import React, { useEffect, useState } from "react";
import useAppContext from "../zustand/AppContext";
import axios from "axios";
import { urlAddress } from "../url";

const RegisShop = () => {
  const [storeList, setStoreList] = useState([]);
  const [selectStore, setSelectStore] = useState("");
  const setStoreName = useAppContext((state) => state.setStoreName);
  const setLoading = useAppContext((state) => state.setLoading);

  const getStoreList = async () => {
    setLoading(true);
    const { data } = await axios.get(`${urlAddress}/app/StoreList`);
    setStoreList(data);
    setLoading(false);
  };
  useEffect(() => {
    getStoreList();
  }, []);
  const confirmStore = async () => {
    if (!selectStore) {
      alert("กรุณาเลือกร้านค้า");
      return;
    }
    setLoading(true);
    const { data } = await axios.post(`${urlAddress}/app/SelectStore`, {
      name: selectStore,
    });
    if (data.status === "success") {
      setStoreName(data.storeName);
    } else {
      alert(data.message);
    }
    setLoading(false);
  };
  return (
    <div className="w-full h-full bg-primary">
      <div className="flex items-center justify-center h-full">
        <div className="w-fit">
          <div className="flex justify-center w-full mb-5 text-5xl text-center text-white tracking-widestt">
            <span>เลือกร้านค้า</span>
          </div>

          <select
            className="px-5 py-5 text-3xl text-center rounded-md tracking-widestt"
            required
            onChange={(e) => setSelectStore(e.target.value)}
            defaultValue={""}
          >
            <option className="text-gray-500 " value="" disabled hidden>
              เลือกร้านค้า...
            </option>
            {storeList.map((store) => (
              <option key={store._id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>

          <div
            className="flex justify-center w-full p-5 mt-10 text-5xl text-center text-white rounded-md cursor-pointer bg-highlight hover:bg-secondary2 active:bg-primary tracking-widestt"
            onClick={() => confirmStore()}
          >
            ยืนยัน
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisShop;
