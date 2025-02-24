import React from "react";
import EditTaskForm from "@/components/EditTaskForm";

interface EditTaskPageProps {
  params: { id: string };
}

const getTaskById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch task");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const EditTaskPage = async ({ params }: EditTaskPageProps) => {
  const { id } = await params;
  const { data } = await getTaskById(id);
  const { judul, deskripsi, status } = data;
  return (
    <div>
      <EditTaskForm
        id={id}
        judul={judul}
        deskripsi={deskripsi}
        status={status}
      />
    </div>
  );
};

export default EditTaskPage;
