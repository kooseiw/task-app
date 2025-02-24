import React from "react";
import Status from "./Status";
import DeleteTask from "./DeleteTask";
import Link from "next/link";

const getTasks = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/tasks", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.log("Error:", error);
    return [];
  }
};

const TaskList = async () => {
  const data = await getTasks();
  console.log("Tasks di komponen:", data);

  if (!data) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(data)) {
    console.error("Data bukan array:", data);
    return <div>Terjadi kesalahan saat memuat data</div>;
  }

  return (
    <>
      {data.length === 0 ? (
        <div className="mt-10 flex items-center justify-center">
          <h1 className="text-2xl font-bold">Belum ada task</h1>
        </div>
      ) : (
        data.map((task: any) => (
          <div key={task._id}>
            <div className="mt-10 flex items-center justify-between gap-10">
              <div className="box">
                <h1
                  className={`font-bold text-xl/loose w-fit ${
                    task.status === "Belum Mulai"
                      ? "text-red-500"
                      : task.status === "Sedang Proses"
                      ? "text-yellow-500"
                      : "text-green-500 line-through"
                  }`}
                >
                  {task.judul}
                </h1>
                <p className="text-sm text-slate-400">{task.deskripsi}</p>
              </div>
              <div className="box flex gap-2 items-center">
                <Status status={task.status} />
                <Link href={`/edit-task/${task._id}`}>
                  <i className="ri-pencil-fill ri-2x text-sky-400 cursor-pointer hover:text-sky-300"></i>
                </Link>
                <DeleteTask id={task._id} />
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default TaskList;
