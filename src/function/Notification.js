import toast from "react-hot-toast";
export const notify = (e) =>
  toast(e, {
    style: {
      border: "1px solid #d14a13",
      padding: "13px",
      color: "white",
      backgroundColor: "#d14a13",
    },
  });
export const notifyImportant = (e) => {
  toast(e, {
    icon: "💬",
    position: "top-right",
    duration: 600000,
    style: {
      border: "1px solid #d14a13",
      padding: "13px",
      color: "white",
      backgroundColor: "#d14a13",
    },
  });
};
