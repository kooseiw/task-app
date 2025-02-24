import React from "react";

const Status = ({ status }: { status: string }) => {
  let bgColor = "";

  if (status === "Belum Mulai") {
    bgColor = "bg-red-600";
  } else if (status === "Sedang Proses") {
    bgColor = "bg-yellow-600";
  } else if (status === "Selesai") {
    bgColor = "bg-green-600";
  }
  return (
    <span className={`p-2 rounded w-fit h-fit text-center ${bgColor}`}>
      {status}
    </span>
  );
};

export default Status;
