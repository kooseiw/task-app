"use client";

import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface EditTaskFormProps {
  id: string;
  judul: string;
  deskripsi: string;
  status: string;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({
  id,
  judul,
  deskripsi,
  status,
}) => {
  const [judulBaru, setJudulBaru] = useState(judul);
  const [deskripsiBaru, setDeskripsiBaru] = useState(deskripsi);
  const [statusBaru, setStatusBaru] = useState(status);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          judulBaru,
          deskripsiBaru,
          statusBaru,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      toast.success("Task updated successfully");
      router.refresh();
      router.push("/");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="mt-10">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="judul" className="font-semibold text-slate-200">
            Judul Task
          </label>
          <input
            type="text"
            name="judul"
            id="judul"
            placeholder="Masukkan Judul Task"
            className="p-2 bg-slate-700 rounded"
            autoComplete="off"
            value={judulBaru}
            onChange={(e) => setJudulBaru(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="deskripsi" className="font-semibold text-slate-200">
            Deskripsi Task
          </label>
          <textarea
            name="deskripsi"
            id="deskripsi"
            placeholder="Masukkan Deskripsi Task"
            className="p-2 bg-slate-700 rounded"
            autoComplete="off"
            value={deskripsiBaru}
            onChange={(e) => setDeskripsiBaru(e.target.value)}
          />
        </div>
        <div className="flex gap-4 items-center justify-start">
          <label htmlFor="status" className="font-semibold text-slate-200">
            Status Task
          </label>
          <select
            name="status"
            id="status"
            className="p-2 bg-slate-700 rounded"
            value={statusBaru}
            onChange={(e) => setStatusBaru(e.target.value)}
          >
            <option value="Belum Mulai ">Belum Mulai</option>
            <option value="Sedang Proses">Sedang Proses</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded text-lg hover:bg-blue-500"
        >
          Edit Task
        </button>
      </form>
    </div>
  );
};

export default EditTaskForm;
