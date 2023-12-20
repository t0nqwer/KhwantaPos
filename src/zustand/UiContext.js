import { create } from "zustand";

const useUiContext = create((set) => ({
  SideBarActive: false,
  OpenResult: false,
  OpenPayment: false,
  DiscountModalActive: false,
  CloseShopModalActive: false,
  BillModalActive: false,
  setDiscountModalActive: (DiscountModalActive) => {
    console.log(DiscountModalActive);
    set(() => ({ DiscountModalActive }));
  },
  setSideBarActive: (SideBarActive) => set(() => ({ SideBarActive })),
  setOpenResult: (OpenResult) => set(() => ({ OpenResult })),
  setOpenPayment: (OpenPayment) => set(() => ({ OpenPayment })),
  setCloseShopModalActive: (CloseShopModalActive) => set(() => ({ CloseShopModalActive })),
  setBillModalActive: (BillModalActive) => set(() => ({ BillModalActive })),
}));

export default useUiContext;
