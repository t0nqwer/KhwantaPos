import React, { useEffect } from "react";
import { ToastBar, Toaster, toast } from "react-hot-toast";
import { io } from "socket.io-client";
import { IoMdCloseCircle } from "react-icons/io";
import { Loading } from "./components";
import { RegisShop, Pos } from "./page";
import useAppContext from "./zustand/AppContext";
const socketConnect = io("http://localhost:9901");

const App = () => {
  const loading = useAppContext((state) => state.loading);
  const storeName = useAppContext((state) => state.storeName);
  const fetchStoreName = useAppContext((state) => state.fetchStoreName);
  useEffect(() => {
    fetchStoreName();
  }, []);
  return (
    <div>
      <Toaster>
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== "loading" && (
                  <button onClick={() => toast.dismiss(t.id)}>
                    <IoMdCloseCircle />
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
      {loading && <Loading />}
      {!storeName && <RegisShop />}
      {storeName && <Pos />}
    </div>
  );
};

export default App;
