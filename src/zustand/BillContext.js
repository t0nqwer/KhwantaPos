import { create } from "zustand";
import axios from "axios";
import { notify } from "../function/Notification";
import { urlAddress } from "../url";

const useBillStore = create((set) => ({
  bills: [],
  singleBill: {},
  fetchBills: async () => {
    try {
      const { data } = await axios.get(`${urlAddress}/product/GetFinishBillList`);
      set({ bills: data });
    } catch (error) {
      notify("ไม่สามารถดึงข้อมูลบิลได้");
    }
  },
  fetchSingleBill: async (id) => {
    try {
      const { data } = await axios.get(`${urlAddress}/bill/GetBill/${id}`);
      set({ singleBill: data });
    } catch (error) {
      notify("ไม่สามารถดึงข้อมูลบิลได้");
    }
  },
  setSingleBill: (singleBill) => set({ singleBill }),
}));

export default useBillStore;
