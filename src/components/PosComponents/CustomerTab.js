import React from "react";
import usePosContext from "../../zustand/PosContext";
import { IoIosCloseCircle } from "react-icons/io";

const CustomerTab = ({ Customer, Name, Item, id }) => {
  const setorder = (e) => {
    setActiveBill(e.currentTarget.id);
  };
  const setActiveBill = usePosContext((state) => state.setActiveBill);
  const deleteBill = usePosContext((state) => state.deleteBill);

  const DelOrder = (e) => {
    deleteBill(e.currentTarget.id);
  };
  return (
    <div className="relative ">
      <div onClick={setorder} key={Name} id={Name} className="relative flex items-center py-3 text-white cursor-pointer select-none">
        <span id={Name} className="p-2 font-semibold text-white rounded-md cursor-pointer bg-secondary">
          {Name}
        </span>
        <div className="flex flex-col pr-2 ml-4 truncate ">
          <span>{Customer ? Customer : "ลูกค้าหน้าร้าน"}</span>
          <span className="text-xs ">
            {Item.length} รายการ - {Item?.map((e) => e.qty).reduce((partialSum, a) => partialSum + a, 0)}
            ชิ้น
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomerTab;
