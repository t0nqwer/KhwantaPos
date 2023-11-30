import React from "react";
import usePosContext from "../../zustand/PosContext";

const Card = ({ ProName, ProPrice, BgColor, Barcode, code, fabric, size }) => {
  const setBarcode = usePosContext((state) => state.setBarcode);
  return (
    <div
      className="w-full h-32 rounded-md select-none bg-third "
      //  style={{ backgroundColor: `${BgColor}` }}
    >
      <div
        className="flex flex-col justify-end h-full p-3 "
        id={Barcode}
        onClick={() => setBarcode(Barcode)}
      >
        <div className="flex justify-between w-full ">
          <span className="text-xl font-bold text-highlight opacity-95 ">
            {code ? code.toUpperCase() : ProName}
          </span>
          <span className="text-xl font-semibold ">{size}</span>
        </div>
        <span className="text-sm opacity-80">{fabric}</span>
        <span className="text-xs opacity-80">{ProPrice}</span>
      </div>
    </div>
  );
};

export default Card;
