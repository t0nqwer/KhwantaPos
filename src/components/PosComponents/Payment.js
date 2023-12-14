import React, { useEffect, useState } from "react";
import { BsCashCoin, BsFillCreditCard2FrontFill, BsCartX } from "react-icons/bs";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { notify } from "../../function/Notification";
import usePosContext from "../../zustand/PosContext";
import useUiContext from "../../zustand/UiContext";
import useGetDateTime from "../../function/getdatetime";
import ConfirmCredit from "./modal/ConfirmCredit";
import ConfirmQrcode from "./modal/ConfirmQrcode";
import { formatter, toNumber } from "../../function/PriceFormat";
import Paymentlist from "./Paymentlist";
import useAppContext from "../../zustand/AppContext";
const Payment = () => {
  const [ordersum, setOrdersum] = useState("");
  const [Subtotal, setSubtotal] = useState(0);
  const [PayValue, setPayvalue] = useState("0.00");
  const [inputValue, setInputvalue] = useState("");
  const [sentdata, setSentdata] = useState({});
  const [openConfirmCredit, setOpenConfirmCredit] = useState(false);
  const [openConfirmQrcode, setOpenConfirmQrcode] = useState(false);
  const setOpenResult = useUiContext((state) => state.setOpenResult);
  const FinishPayment = usePosContext((state) => state.FinishPayment);
  const cashDrawer = useAppContext((state) => state.cashDrawer);

  const activeBill = usePosContext((state) => state.activeBill);
  const currentProductList = usePosContext((state) => state.currentProductList);
  useEffect(() => {
    const allprice = currentProductList.map((e) => e.price * e.qty).reduce((partialSum, a) => partialSum + a, 0);
    const discount = activeBill?.amount;
    const discountType = activeBill?.distype;

    if (discountType === "int") {
      setSubtotal(allprice - discount);
    } else if (discountType === "percent") {
      setSubtotal(allprice - (allprice * discount) / 100);
    } else {
      setSubtotal(allprice);
    }
    setOrdersum(allprice);
    if (currentProductList.length === 0) {
      setSubtotal(0);
      setOpenPayment(false);
    }
  }, [currentProductList]);
  useEffect(() => {
    setSentdata({
      Name: activeBill.name,
      Product: currentProductList.map((product) => {
        if (!product.barcode) {
          return { barcode: "", proname: product.name, qty: 1, price: product.price };
        }
        return {
          barcode: product.barcode,
          proname: `${product.design}${product.fabric} ${product.size}`,
          qty: product.qty,
          price: product.price,
        };
      }),
      customer: "",
      item: activeBill?.products?.map((e) => e.qty).reduce((partialSum, a) => partialSum + a, 0),
      distype: activeBill?.distype,
      amount: activeBill?.amount,
      productsum: +currentProductList.map((e) => e.price * e.qty).reduce((partialSum, a) => partialSum + a, 0),
    });
  }, [currentProductList, activeBill]);
  useEffect(() => {
    setPayvalue(formatter.format(inputValue));
  }, [inputValue]);

  const touchinput = (e) => {
    setInputvalue(`${inputValue}${e.target.id}`);
  };

  const PrintReceipt = () => {
    const date = useGetDateTime();
    const data = { ...sentdata, subtotal: +Subtotal, time: date.time, Paytype: "-", Payamt: "-" };
    console.log(data);
    electron.Print.Print(data);
  };

  const PayCash = () => {
    if (toNumber(PayValue) < Subtotal) return notify("จำนวนเงินไม่เพียงพอ");
    const date = useGetDateTime();
    const data = {
      ...sentdata,
      subtotal: +Subtotal,
      time: date.time,
      Paytype: "เงินสด",
      Payamt: toNumber(PayValue),
      Change: toNumber(PayValue) - Subtotal,
    };

    FinishPayment("cash", Subtotal, data.productsum, inputValue, inputValue - Subtotal);
    setOpenResult(true);
    electron.Print.Print(data);
    electron.Cashdrawer(cashDrawer);
  };
  const valuechange = (e) => {
    setPayvalue(e.target.value);
  };
  const PayCreditCard = () => {
    const date = useGetDateTime();
    const data = { ...sentdata, subtotal: +Subtotal, time: date.time, Paytype: "บัตรเครดิต", Payamt: "0" };
    FinishPayment("credit", Subtotal, data.productsum, 0, 0);
    setOpenResult(true);
    electron.Print.Print(data);
    electron.Cashdrawer(cashDrawer);
  };
  const PayQRCode = () => {
    const date = useGetDateTime();
    const data = { ...sentdata, subtotal: +Subtotal, time: date.time, Paytype: "QR Code", Payamt: "0" };
    FinishPayment("transfer", Subtotal, data.productsum, 0, 0);
    setOpenResult(true);
    electron.Print.Print(data);
    electron.Cashdrawer(cashDrawer);
  };
  const setOpenPayment = useUiContext((state) => state.setOpenPayment);
  return (
    <div className="fixed flex w-full h-full select-none bg-secondary z-100">
      {openConfirmCredit && <ConfirmCredit subtotal={Subtotal} func={PayCreditCard} back={setOpenConfirmCredit} />}
      {openConfirmQrcode && <ConfirmQrcode subtotal={Subtotal} func={PayQRCode} back={setOpenConfirmQrcode} />}
      <div className="flex flex-col w-3/5 h-full px-5 ">
        <div className="grid w-full h-24 grid-cols-3 p-3 text-center text-white align-middle rounded-b-lg bg-primary place-content-center ">
          <div className="self-center col-start-2 "> เลขที่บิล</div>
          <div className="text-4xl">{activeBill.name}</div>
        </div>
        <div className="w-full py-5 mt-3 rounded-lg h-fit bg-primary">
          <div className="grid h-full grid-cols-4 text-white">
            <div className="grid h-full grid-rows-3 gap-2 text-right align-middle ">
              <div className="self-center "> จำนวนรายการ :</div>
              <div className="self-center "> จำนวนชิ้น :</div>
              <div className="self-center "> ราคารวมก่อนลด :</div>
              <div className="self-center "> ส่วนลด :</div>
            </div>
            <div>
              <div className="grid h-full col-span-2 grid-rows-4 text-center align-middle ">
                <div className="self-center "> {activeBill?.product?.length} รายการ</div>
                <div className="self-center "> {activeBill?.products?.map((e) => e.qty).reduce((partialSum, a) => partialSum + a, 0)} ชิ้น</div>
                <div className="self-center ">{currentProductList.map((e) => e.price * e.qty).reduce((partialSum, a) => partialSum + a, 0)} </div>
                <div className="self-center ">
                  {activeBill.distype === "int"
                    ? `${activeBill.amount.toLocaleString("en-US")} บาท`
                    : activeBill.distype === "percent"
                    ? `${activeBill.amount.toLocaleString("en-US")} %`
                    : "-"}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full col-span-2 text-center text-white ">
              <h2>ราคารวม</h2>
              <h2 className="mt-2 text-4xl ">{formatter.format(Subtotal)}</h2>
            </div>
          </div>
        </div>

        <div className="w-full mt-3 mb-10 overflow-y-scroll grow scrollbar-thin scrollbar-thumb-neutral-600 srollbar-thumb-rounded-full">
          <div className="h-full rounded-md ">
            {currentProductList.map((e, i) => {
              if (!e._id) {
                return (
                  <Paymentlist
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
                <Paymentlist
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
        </div>
      </div>
      <div className="w-2/5 h-full pb-5 pr-5 text-white rounded-b-md ">
        <div className="w-full h-full p-5 rounded-b-lg bg-primary">
          <div className="flex w-full mb-3 space-x-3">
            <div
              className="flex items-center justify-center w-1/2 h-12 text-center align-middle rounded-md select-none bg-slate-800 hover:bg-slate-600 active:bg-slate-900"
              onClick={() => {
                setOpenPayment(false);
              }}
            >
              <h1>กลับ</h1>
            </div>
            <div
              className="flex items-center justify-center w-1/2 h-12 text-center align-middle rounded-md select-none bg-slate-800 hover:bg-slate-600 active:bg-slate-900"
              onClick={PrintReceipt}
            >
              <h1> พิมพ์ใบแจ้งหนี้ </h1>
            </div>
          </div>
          <div className="ิ bg-secondary px-5 h-20 text-center align-middle flex flex-col justify-center items-center mb-3  rounded-md select-none">
            <div>ข้อมูลลุกค้า</div>
            <div>ชื่อลูกค้า</div>
          </div>

          <div className="flex h-12 my-3 overflow-hidden text-black bg-white rounded-lg ">
            <div
              className="flex items-center justify-center h-full px-2 text-center text-white align-middle w-36 bg-secondary hover:bg-zinc-600 active:bg-zinc-800"
              onClick={(e) => {
                setInputvalue(Subtotal);
                setPayvalue(formatter.format(Subtotal));
              }}
            >
              <p>เท่าราคารวม</p>
            </div>
            <input
              type="text"
              value={PayValue}
              onChange={valuechange}
              onFocus={(e) => setPayvalue("")}
              onBlur={(e) => {
                setPayvalue(formatter.format(PayValue));
              }}
              className="w-full h-full text-3xl text-center text-black focus:shadow"
            />
          </div>
          <div className="grid grid-cols-3 my-3 mt-5 px-14 grow place-items-center">
            <div className="grid grid-rows-4 gap-5 place-items-center">
              <div id="7" onClick={touchinput} className=" calculator">
                7
              </div>
              <div id="4" onClick={touchinput} className=" calculator">
                4
              </div>
              <div id="1" onClick={touchinput} className=" calculator">
                1
              </div>
              <div
                onClick={() => {
                  setInputvalue("0");
                }}
                className="calculator"
              >
                c
              </div>
            </div>
            <div className="grid grid-rows-4 gap-5">
              <div id="8" onClick={touchinput} className=" calculator">
                8
              </div>
              <div id="5" onClick={touchinput} className=" calculator">
                5
              </div>
              <div id="2" onClick={touchinput} className=" calculator">
                2
              </div>
              <div id="0" onClick={touchinput} className=" calculator">
                0
              </div>
            </div>
            <div className="grid grid-rows-4 gap-5">
              <div id="9" onClick={touchinput} className=" calculator">
                9
              </div>
              <div id="6" onClick={touchinput} className=" calculator">
                6
              </div>
              <div id="3" onClick={touchinput} className=" calculator">
                3
              </div>
              <div id="." onClick={touchinput} className=" calculator">
                .
              </div>
            </div>
          </div>
          <div>วิธีการจ่ายเงิน</div>
          <div className="mt-3 ">
            <div className="w-full ">
              <button
                id="cash"
                className="flex justify-center w-full px-5 py-3 mb-3 rounded-md cursor-pointer hover:outline-2 outline outline-1 hover:bg-neutral-50 hover:outline-none hover:text-primary active:bg-secondary "
                onClick={PayCash}
              >
                <div className="flex items-center text-center">
                  <span className="">
                    <BsCashCoin className="self-end w-full mr-8 text-4xl justify-self-end" />
                  </span>
                  <span className="flex justify-center w-full mt-1">เงินสด</span>
                </div>
              </button>
            </div>
            <div className="flex w-full space-x-3 ">
              <button
                id="card"
                className="flex justify-center w-full px-5 py-3 mb-3 rounded-md cursor-pointer hover:outline-2 outline outline-1 hover:bg-neutral-50 hover:outline-none hover:text-primary active:bg-secondary "
                onClick={() => {
                  setOpenConfirmCredit(true);
                }}
              >
                <div className="flex items-center text-center">
                  <span className="">
                    <BsFillCreditCard2FrontFill className="self-end w-full mr-8 text-4xl justify-self-end" />
                  </span>
                  <span className="flex justify-center w-full mt-1">บัตรเครดิต</span>
                </div>
              </button>
              <button
                id="qr"
                className="flex justify-center w-full px-5 py-3 mb-3 rounded-md cursor-pointer hover:outline-2 outline outline-1 hover:bg-neutral-50 hover:outline-none hover:text-primary active:bg-secondary "
                onClick={() => {
                  setOpenConfirmQrcode(true);
                }}
              >
                <div className="flex items-center text-center">
                  <span className="">
                    <MdOutlineQrCodeScanner className="self-end w-full mr-8 text-4xl justify-self-end" />
                  </span>
                  <span className="flex justify-center w-full mt-1">qr code / โอน</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
