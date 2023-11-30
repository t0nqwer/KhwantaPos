import React, { useEffect } from "react";
import { DiscountModal, Product, Openshop, Summary } from "../components";
import useUiContext from "../zustand/UiContext";
import usePosContext from "../zustand/PosContext";

const Home = () => {
  const DiscountModalActive = useUiContext((state) => state.DiscountModalActive);
  const isCashDrawerOpened = usePosContext((state) => state.isCashDrawerOpened);
  const checkShopOpen = usePosContext((state) => state.checkShopOpen);
  useEffect(() => {
    checkShopOpen();
  }, []);
  useEffect(() => {
    console.log(DiscountModalActive);
  }, [DiscountModalActive]);

  return (
    <div className="w-full h-full">
      {!isCashDrawerOpened && <Openshop />}
      {DiscountModalActive && <DiscountModal />}
      {isCashDrawerOpened && (
        <div className="flex w-full h-full ">
          <Product />
          <Summary />
        </div>
      )}
    </div>
  );
};

export default Home;
