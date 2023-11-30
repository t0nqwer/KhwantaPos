import React, { useState, useEffect } from "react";

import usePosContext from "../../zustand/PosContext";

const Paymentlist = ({ proname, qty, price, row, code, fabric, size, barcode, customProducts }) => {
  const [Expand, setExpand] = useState(false);
  const addqty = usePosContext((state) => state.addqty);
  const removeqty = usePosContext((state) => state.removeqty);
  const removeBarcode = usePosContext((state) => state.removeBarcode);
  const removeCustomProduct = usePosContext((state) => state.removeCustomProduct);
  const expandHandler = () => {
    setExpand(!Expand);
  };
  const plus = () => {
    addqty(barcode);
  };
  const minus = () => {
    removeqty(barcode);
  };
  const Del = () => {
    if (customProducts) {
      return removeCustomProduct(proname);
    }
    removeBarcode(barcode);
  };
  return (
    <div>
      <div key={proname} id={proname} className="items-center justify-between mb-2 overflow-hidden duration-500 ease-in-out rounded-md h-fit">
        <div id={`${proname}list`} className="flex items-center justify-between h-full py-2 pl-5 pr-5 grow" onClick={expandHandler}>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 mr-4 font-bold text-center text-black bg-white rounded-full">
              <span>{row + 1}</span>
            </div>
            <div>
              <span className="font-medium text-white rounded-full tracking-1 ">
                {proname} x {qty}
              </span>
              <div className="font-medium text-white rounded-full tracking-1 ">{price.toLocaleString("en-US")}฿</div>
            </div>
          </div>
          <span className="px-2 font-medium text-white rounded-full ">{(price * qty).toLocaleString("en-US")}฿</span>
        </div>
        {Expand ? (
          <div className="flex h-8 overflow-hidden font-extrabold text-center text-white bg-opacity-50 justify-evenly">
            <div
              className="flex items-center justify-center w-20 h-full bg-green-500 rounded-md hover:text-xl active:text-base disabled:bg-secondary"
              disabled={customProducts}
              onClick={plus}
            >
              +
            </div>
            <div
              className="flex items-center justify-center w-20 h-full bg-red-500 rounded-md hover:text-xl active:text-base disabled:bg-secondary"
              disabled={customProducts}
              onClick={minus}
            >
              -
            </div>
            <div className="flex items-center justify-center w-20 h-full bg-red-800 rounded-md hover:text-xl active:text-base" onClick={Del}>
              ลบ
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Paymentlist;
