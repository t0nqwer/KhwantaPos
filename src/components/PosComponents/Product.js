import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import usePosContext from "../../zustand/PosContext";
import { useHorizontalScroll } from "../../function/HorizontalScroll";
import Card from "./Card";
import CustomerTab from "./CustomerTab";

const Product = () => {
  const scrollRef = useHorizontalScroll();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const nameRef = useRef(null);
  const priceRef = useRef(null);

  const productList = usePosContext((state) => state.productList);
  const fetchProduct = usePosContext((state) => state.fetchProduct);
  const activeBillList = usePosContext((state) => state.activeBillList);
  const setBarcode = usePosContext((state) => state.setBarcode);
  const addCustomProduct = usePosContext((state) => state.addCustomProduct);
  const activeBill = usePosContext((state) => state.activeBill);
  const setCurrentProductList = usePosContext((state) => state.setCurrentProductList);
  const createBill = usePosContext((state) => state.createBill);
  const fetchBillList = usePosContext((state) => state.fetchBillList);

  useEffect(() => {
    fetchBillList();
  }, []);
  useEffect(() => {
    fetchProduct(search);
  }, [search]);
  useEffect(() => {
    if (searchInput === search) return;
    const timmer = setInterval(() => {
      setSearch(searchInput);
    }, 500);
    return () => clearInterval(timmer);
  }, [searchInput]);
  return (
    <div className="relative flex flex-col w-3/5 h-full pl-8 bg-primary">
      <div className="flex items-center justify-end w-full h-24 shrink-0">
        <div className="flex mx-5 rounded-full bg-neutral-200">
          <input
            className="w-full py-2 pl-5 pr-10 text-xl rounded-full bg-none bg-neutral-200"
            id="scannerInput"
            type="text"
            autoFocus
            placeholder="ค้นหาสินค้า"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            value={searchInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setBarcode(e.target.value, true);
                setSearchInput("");
                setSearch("");
              }
            }}
          />
          <button className="mr-5 text-xl ">
            <FaSearch className="opacity-50 " />
          </button>
        </div>
      </div>
      {/* Product */}
      <div className="h-full overflow-x-hidden overflow-y-scroll scrollbar-none ">
        <div className="flex h-max">
          <div className="grid w-full grid-cols-4 gap-3 ">
            {productList.map((e, i) => {
              return <Card key={e._id} ProName={e.name} ProPrice={e.price} code={e.design} fabric={e.fabric} size={e.size} Barcode={e._id} />;
            })}
          </div>
        </div>
      </div>
      {/* CustomProduct */}
      <div className="w-full mt-3 h-[165px] bg-third rounded-md py-3 px-10 ">
        <div className="flex items-center w-full space-x-3 ">
          <label htmlFor="from" className="w-20 ">
            ชื่อสินค้า :
          </label>
          <input
            ref={nameRef}
            className="w-full p-2 border-transparent rounded-md outline-none bg-light text-dark placeholder-primary focus:border-transparent focus:ring-0"
          />
        </div>
        <div className="flex items-center w-full mt-3 space-x-3 ">
          <label htmlFor="from" className="w-20 ">
            ราคา :
          </label>
          <input
            ref={priceRef}
            type="number"
            className="w-full p-2 border-transparent rounded-md outline-none bg-light text-dark placeholder-primary focus:border-transparent focus:ring-0"
          />
        </div>
        <div className="flex justify-end mt-2">
          <button
            className="p-2 text-white rounded-md bg-highlight hover:bg-light"
            onClick={() => {
              addCustomProduct(nameRef.current.value, priceRef.current.value);
            }}
          >
            เพิ่มสินค้า
          </button>
        </div>
      </div>

      {/* BIll */}
      <div
        className="flex items-center w-full h-20 mt-3 space-x-5 overflow-x-scroll overflow-y-hidden shrink-0 scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-thumb-rounded-full "
        ref={scrollRef}
      >
        {activeBillList.length > 0 &&
          activeBillList?.map((e) => {
            if (e._id !== activeBill._id) {
              return <CustomerTab id={e._id} key={e._id} Name={e.name} Customer={e?.customer} Item={e.products} />;
            }
          })}
        <div onClick={() => createBill()} className="relative flex items-center h-full p-3 text-white cursor-pointer" role="button" tabIndex={0}>
          <span className="flex items-center justify-center w-10 h-10 text-4xl font-light text-white rounded-md cursor-pointer select-none bg-secondary">
            +
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
