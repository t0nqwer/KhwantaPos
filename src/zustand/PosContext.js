import { create } from "zustand";
import axios from "axios";
import { notify } from "../function/Notification";
import { urlAddress } from "../url";
const url = urlAddress;
const usePosContext = create((set, get) => ({
  isCashDrawerOpened: false,
  productList: [],
  activeBillList: [],
  activeBill: {},
  currentProductList: [],
  ResultData: {},
  checkShopOpen: async () => {
    try {
      const { data } = await axios.get(`${urlAddress}/app/checkStore`);
      console.log(data);
      set((state) => ({
        ...state,
        isCashDrawerOpened: true,
        PosID: data._id,
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
      set((state) => ({
        ...state,
        isStoreOpened: true,
        isCashDrawerOpened: true,
        PosID: data._id,
      }));
    } catch (error) {
      notify(error.response.data.message);
    }
  },
  closeShop: async () => {},
  fetchProduct: async (search) => {
    try {
      const { data } = await axios.get(`${url}/product/ListProduct?search=${search ? search : ""}`);
      set((state) => ({ ...state, productList: data }));
    } catch (error) {
      notify("ไม่สามารถดึงข้อมูลสินค้าได้");
    }
  },
  fetchBillList: async () => {
    const { data } = await axios.get(`${url}/product/GetBillList`);
    set((state) => ({ ...state, activeBillList: data }));
  },
  createBill: async () => {
    const { data } = await axios.get(`${url}/product/CreateBill`);
    set((state) => ({ ...state, activeBillList: data.list, activeBill: data.current }));
  },
  deleteBill: async (id) => {
    console.log(id);
    const { data } = await axios.delete(`${url}/product/DeleteBill/${id}`);
    set((state) => ({ ...state, activeBillList: data, activeBill: {} }));
  },
  setActiveBill: (name) => {
    const state = get();
    const [selectdata] = state.activeBillList.filter((item) => item.name === name);
    if (!selectdata) return;
    set((state) => ({ ...state, activeBill: selectdata }));
  },
  setBarcode: async (barcode, IsScan) => {
    const state = get();
    if (IsScan) {
    }
    if (state.activeBill?.products?.some((item) => item.barcode === barcode)) {
      return state.addqty(barcode);
    }
    ///NEW CODE
    const [selectdata] = state.productList.filter((item) => item._id === barcode);
    if (!selectdata) return;
    const { data } = await axios.post(`${url}/product/AddProduct`, {
      billName: state.activeBill.name,
      barcode: barcode,
    });
    set((state) => ({ ...state, activeBill: data }));
  },
  addCustomProduct: async (name, price) => {
    const state = get();
    const check = state.activeBill.customProducts?.some((item) => item.name === name);
    if (check) return notify("มีสินค้านี้อยู่แล้ว");
    const { data } = await axios.post(`${url}/product/customProduct`, {
      billName: state.activeBill.name,
      name: name,
      price: price,
    });
    set((state) => ({ ...state, activeBill: data }));
  },
  setCurrentProductList: async (productList) => {
    set((state) => ({ ...state, currentProductList: productList }));
  },
  addqty: async (barcode) => {
    const state = get();
    const { data } = await axios.post(`${url}/product/AddQty`, {
      billName: state.activeBill.name,
      barcode: barcode,
    });
    set((state) => ({ ...state, activeBill: data }));
  },
  removeqty: async (barcode) => {
    const state = get();
    const [checkqty] = state.activeBill.products.filter((item) => item.barcode === barcode);
    if (checkqty.qty <= 1) {
      const { data } = await axios.post(`${url}/product/DecreseQty`, {
        billName: state.activeBill.name,
        barcode: barcode,
        pull: true,
      });
      set((state) => ({ ...state, activeBill: data }));
    } else {
      const { data } = await axios.post(`${url}/product/DecreseQty`, {
        billName: state.activeBill.name,
        barcode: barcode,
        pull: false,
      });
      set((state) => ({ ...state, activeBill: data }));
    }
  },
  removeBarcode: async (barcode) => {
    const state = get();
    const { data } = await axios.post(`${url}/product/DeleteProduct`, {
      billName: state.activeBill.name,
      barcode: barcode,
    });
    set((state) => ({ ...state, activeBill: data }));
  },
  removeCustomProduct: async (name) => {
    const state = get();
    const { data } = await axios.put(`${url}/product/customProduct`, {
      billName: state.activeBill.name,
      name: name,
    });
    set((state) => ({ ...state, activeBill: data }));
  },
  setDiscount: async (type, amount) => {
    const state = get();
    const { data } = await axios.post(`${url}/product/SetDiscount`, {
      billName: state.activeBill.name,
      type: type,
      amount: amount,
    });
    set((state) => ({ ...state, activeBill: data }));
  },
  FinishPayment: async (type, totalBfDiscount, totalPay, cash, change) => {
    const state = get();
    console.log(type, totalBfDiscount, totalPay, cash, change);
    const { data } = await axios.post(`${url}/product/finishBill`, {
      billName: state.activeBill.name,
      type: type,
      totalBfDiscount,
      totalPay,
      cash,
      change,
    });
    console.log(data);
    set((state) => ({ ...state, activeBill: {}, ResultData: data }));
  },
  reset: async () => {
    set((state) => ({ ...state, activeBill: {}, ResultData: {} }));
  },
}));

export default usePosContext;
