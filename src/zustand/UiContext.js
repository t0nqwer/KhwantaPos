import { create } from "zustand";

const useUiContext = create((set) => ({
  SideBarActive: false,
  OpenResult: false,
  OpenPayment: false,
  DiscountModalActive: false,
  setDiscountModalActive: (DiscountModalActive) => {
    console.log(DiscountModalActive);
    set(() => ({ DiscountModalActive }));
  },
  setSideBarActive: (SideBarActive) => set(() => ({ SideBarActive })),
  setOpenResult: (OpenResult) => set(() => ({ OpenResult })),
  setOpenPayment: (OpenPayment) => set(() => ({ OpenPayment })),
}));

export default useUiContext;
