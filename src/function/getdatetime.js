import React from "react";

export default function useGetDateTime() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  let currentDate = `${day}${month.toString().length === 1 ? `0${month}` : month}${year}${hour.toString().length === 1 ? `0${hour}` : hour}${
    min.toString().length === 1 ? `0${min}` : min
  }${sec.toString().length === 1 ? `0${sec}` : sec}`;
  let currenttime = `${day}/${month.toString().length === 1 ? `0${month}` : month}/${year}-${hour.toString().length === 1 ? `0${hour}` : hour}.${
    min.toString().length === 1 ? `0${min}` : min
  }.${sec.toString().length === 1 ? `0${sec}` : sec}`;
  return { date: currentDate, time: currenttime };
}
