import { create } from "zustand";
import axios from "axios";
import { notify } from "../function/Notification";
import { urlAddress } from "../url";
const useShopContext = create((set, get) => ({
  isCashDrawerOpened: false,
  shopDetail: {},
  checkShopOpen: async () => {
    try {
      const { data } = await axios.get(`${urlAddress}/app/checkStore`);
      console.log(data);
      set((state) => ({
        ...state,
        isCashDrawerOpened: true,
        shopDetail: data,
      }));
    } catch (error) {
      notify(error.response.data);
    }
  },
  openShop: async (cash) => {
    try {
      const { data } = await axios.post(`${urlAddress}/app/OpenStore`, {
        cash: +cash,
      });
      console.log(data);
      set((state) => ({
        ...state,
        isCashDrawerOpened: true,
        shopDetail: data,
      }));
    } catch (error) {
      notify(error.response.data.message);
    }
  },
  closeShop: async (cash) => {
    try {
      const { data } = await axios.post(`${urlAddress}/app/closeStore`, {
        cash: +cash,
      });
      electron.Print.PrintSummary(data);
      set((state) => ({
        ...state,
        isCashDrawerOpened: false,
        shopDetail: {},
      }));
    } catch (error) {
      notify(error.response.data.message);
    }
  },
  printReport: async (data) => {
    try {
      const { data } = await axios.get(`${urlAddress}/app/printReport`);
      electron.Print.PrintSummary(data);
    } catch (error) {
      notify(error.response.data.message);
    }
  },
  cashInFnc: async (reqdata) => {
    try {
      const { data } = await axios.post(`${urlAddress}/app/cashIn`, { ...reqdata, id: get().shopDetail._id });
      console.log(data);
      set((state) => ({
        ...state,
        shopDetail: data,
      }));
    } catch (error) {
      console.log(error);
      notify(error.response.data.message);
    }
  },
  cashOutFnc: async (reqdata) => {
    try {
      const { data } = await axios.post(`${urlAddress}/app/cashOut`, { ...reqdata, id: get().shopDetail._id });

      set((state) => ({
        ...state,
        shopDetail: data,
      }));
    } catch (error) {
      notify(error.response.data.message);
    }
  },
}));

export default useShopContext;
