import React, { useState, useEffect } from "react";
import { BsCartX } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import List from "./List";
import usePosContext from "../../zustand/PosContext";
import { notify } from "../../function/Notification";
import { IoCloseCircleOutline } from "react-icons/io5";
import useUiContext from "../../zustand/UiContext";
const Summary = () => {
  const [ordersum, setOrdersum] = useState("");
  const [Subtotal, setSubtotal] = useState(0);
  const [currentOrder, setCurrentOrder] = useState([]);

  const activeBill = usePosContext((state) => state.activeBill);
  const currentProductList = usePosContext((state) => state.currentProductList);
  const deleteBill = usePosContext((state) => state.deleteBill);
  const setCurrentProductList = usePosContext((state) => state.setCurrentProductList);
  const setDiscountModalActive = useUiContext((state) => state.setDiscountModalActive);
  const setOpenPayment = useUiContext((state) => state.setOpenPayment);
  useEffect(() => {
    let ProductList = [];
    if (activeBill?.products) {
      ProductList = activeBill.products;
    }
    if (activeBill?.customProducts) {
      ProductList = [...ProductList, ...activeBill.customProducts];
    }
    setCurrentProductList(ProductList);

    const allprice = ProductList.map((e) => e.price * e.qty).reduce((partialSum, a) => partialSum + a, 0);
    const discount = activeBill?.amount;
    const discountType = activeBill?.distype;
    if (discountType === "int") {
      setSubtotal(allprice - discount);
    } else if (discountType === "percent") {
      setSubtotal(allprice - (allprice * discount) / 100);
    } else {
      setSubtotal(allprice);
    }
  }, [activeBill]);
  useEffect(() => {
    setOrdersum(currentProductList.map((e) => e.price * e.qty).reduce((partialSum, a) => partialSum + a, 0));
  }, [currentProductList]);
  const checkout = () => {
    console.log(currentProductList);
    if (currentProductList.length === 0) {
      return notify("ยังไม่มีรายการสินค้า");
    }
    setOpenPayment(true);
  };
  return (
    <div className="flex flex-col justify-between w-2/5 h-full ml-5 select-none bg-primary">
      <div id="detail" className="flex items-center justify-between mx-5">
        <div className="flex items-center justify-center h-24 text-xl font-semibold text-white ">
          <span className="flex items-center justify-center rounded-md w-14 h-14 bg-secondary">{activeBill?.name}</span>
          <div className="flex flex-col px-5 ">
            <p>{activeBill.name && "ลูกค้าหน้าร้าน"}</p>
            <p className="text-xs">
              สินค้า {currentProductList.length} รายการ - {currentProductList.map((e) => e.qty).reduce((partialSum, a) => partialSum + a, 0)} ชิ้น
            </p>
          </div>
        </div>

        <div className="flex space-x-5">
          <div className="text-3xl text-white rounded-full ">
            <BiEditAlt />
          </div>
          <div
            className="text-3xl text-white rounded-full "
            onClick={() => {
              if (!activeBill?._id) return;
              deleteBill(activeBill?._id);

              // deleteBill(activeBill?._id)
            }}
          >
            <IoCloseCircleOutline />
          </div>
        </div>
      </div>
      {currentProductList.length > 0 && activeBill && (
        <div
          id="data"
          className=" h-fit xl:max-h-[800px] lg:max-h-[428px] overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-neutral"
        >
          {currentProductList.length > 0 &&
            currentProductList.map((e, i) => {
              if (!e._id) {
                return (
                  <List
                    key={`${e.name}${i}`}
                    barcode={``}
                    proname={e.name}
                    qty={1}
                    price={e.price}
                    row={i}
                    code={``}
                    fabric={``}
                    customProducts={true}
                    size={``}
                  />
                );
              }
              return (
                <List
                  key={e._id}
                  barcode={e._id}
                  proname={e.name}
                  qty={e.qty}
                  price={e.price}
                  row={i}
                  code={e.design}
                  fabric={e.fabric}
                  size={e.size}
                  customProducts={false}
                />
              );
            })}
        </div>
      )}

      <div id="pay" className="flex flex-col justify-end p-5 mx-5 text-white duration-500 ease-out bg-secondary transition-height grow rounded-xl ">
        {currentProductList?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <BsCartX className="mb-4 text-6xl opacity-40" />
            <span className="text-center ">ยังไม่มีรายการสินค้า</span>
          </div>
        ) : (
          <div className="flex flex-col items-start justify-start h-full text-xl font-semibold ">
            <div className="flex justify-between w-full">
              <span>ราคาสินค้ารวม</span>
              <span>{ordersum?.toLocaleString("en-US")} บาท</span>
            </div>
            <div className="flex justify-between w-full mt-3">
              <span>ส่วนลด</span>
              <span>
                {activeBill.distype === "int"
                  ? `${activeBill.amount.toLocaleString("en-US")} บาท`
                  : activeBill.distype === "percent"
                  ? `${activeBill.amount.toLocaleString("en-US")} %`
                  : "-"}
              </span>
            </div>
            <div className="w-full mt-5 outline outline-1 outline-white"></div>
            <div className="flex justify-between w-full mt-3">
              <span>ราคาสุทธิ</span>
              <span>{Math.round(Subtotal)?.toLocaleString("en-US")} บาท</span>
            </div>
          </div>
        )}

        <div className="mt-2 ">
          <div className="flex items-center justify-center space-y-3 ">
            <button
              onClick={() => {
                setDiscountModalActive(true);
              }}
              className="w-full p-3 mt-3 ml-2 mr-2 text-black rounded-full bg-slate-50 "
            >
              ลดราคา
            </button>
            <button onClick={checkout} className="w-full p-3 mt-3 ml-2 mr-2 text-black rounded-full bg-slate-50 font-body ">
              จ่ายเงิน
            </button>
          </div>
        </div>
      </div>
      <div className="h-5 "> </div>
    </div>
  );
};

export default Summary;
