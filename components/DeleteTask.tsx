"use client";

import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface DeleteTaskProps {
  id: string;
}

const DeleteTask = ({ id }: DeleteTaskProps) => {
  const router = useRouter();
  const deleteTask = async () => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
      toast.success("Task berhasil dihapus");
    } else {
      toast.error("Gagal menghapus task");
    }
  };

  return (
    <div>
      <i
        className="ri-delete-bin-fill ri-2x text-red-400 cursor-pointer hover:text-red-300"
        onClick={() =>
          confirm("Apakah anda yakin ingin menghapus task ini?")
            ? deleteTask()
            : ""
        }
      ></i>
    </div>
  );
};

export default DeleteTask;
