export const formatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
});
export const toNumber = (e) => Number(e.replace(/[^0-9.-]+/g, ""));
