import React, { useState, useEffect } from "react";
import usePosContext from "../../zustand/PosContext";

const List = ({ proname, qty, price, row, code, fabric, size, barcode, customProducts }) => {
  const [Expand, setExpand] = useState(false);
  const removeqty = usePosContext((state) => state.removeqty);
  const removeBarcode = usePosContext((state) => state.removeBarcode);
  const addqty = usePosContext((state) => state.addqty);
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
      <div id={barcode} className="items-center justify-between mx-5 mb-2 overflow-hidden duration-500 ease-in-out rounded-md h-fit">
        <div id={`${proname}list`} className="flex items-center justify-between h-full py-2 pl-5 pr-5 bg-secondary grow" onClick={expandHandler}>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 mr-4 font-bold text-center text-black bg-white rounded-full">
              <span>{row + 1}</span>
            </div>
            <div>
              <div className="flex space-x-5 font-medium text-white rounded-full tracking-1 ">
                <p>{code ? code : proname}</p> <p> {size} </p> <p> {qty} </p>
              </div>
              <div className="text-sm text-white rounded-full tracking-1">
                {fabric} {price.toLocaleString("en-US")}฿
              </div>
            </div>
          </div>
          <span className="px-2 font-medium text-white rounded-full ">{(price * qty).toLocaleString("en-US")}฿</span>
        </div>
        {Expand ? (
          <div className="flex h-8 overflow-hidden font-extrabold text-center text-white bg-opacity-50 bg-secondary justify-evenly">
            <button
              className="flex items-center justify-center w-20 h-full bg-green-500 rounded-md hover:text-xl active:text-base disabled:bg-secondary"
              disabled={customProducts}
              onClick={plus}
            >
              +
            </button>
            <button
              className="flex items-center justify-center w-20 h-full bg-red-500 rounded-md hover:text-xl active:text-base disabled:bg-secondary"
              disabled={customProducts}
              onClick={minus}
            >
              -
            </button>
            <button className="flex items-center justify-center w-20 h-full bg-red-800 rounded-md hover:text-xl active:text-base" onClick={Del}>
              ลบ
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default List;
