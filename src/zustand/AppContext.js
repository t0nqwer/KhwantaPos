import { create } from "zustand";
import axios from "axios";
import { notify } from "../function/Notification";
import { urlAddress } from "../url";
const useAppContext = create((set) => ({
  loading: false,
  storeName: "1",
  setLoading: (loading) => set(() => ({ loading })),
  setStoreName: (storeName) => set(() => ({ storeName })),
  cashDrawer: "",
  getCashDrawer: async () => {
    try {
      const { data } = await axios.get(`${urlAddress}/app/GetCashDrawer`);
      set({ cashDrawer: data });
    } catch (error) {
      notify(error.response.data);
    }
  },
  setCashDrawer: async (cashDrawer) => {
    console.log(cashDrawer);

    try {
      const { data } = await axios.post(`${urlAddress}/app/SetCashDrawer`, { cashDrawer });
      set({ cashDrawer: data.cashDrawerPath });
    } catch (error) {
      notify(error.response.data);
    }
  },
  fetchStoreName: async () => {
    try {
      const { data } = await axios.get(`${urlAddress}/app/StartApp`);
      set({ storeName: data.storeName, cashDrawer: data.cashDrawerPath });
    } catch (error) {
      notify(error.response.data);
    }
  },
}));

export default useAppContext;
