"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TaskColumn from "../components/TaskColumn";
import TaskCard from "../components/TaskCard";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";
import TextInput from "../components/TextInput";
import api from "@/services/api";

// Fungsi decode JWT
function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
}

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editTask, setEditTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const { isOpen: isEditOpen, onOpen: openEdit, onOpenChange: onEditChange } = useDisclosure()

  // Ambil token dari localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const user = token ? decodeToken(token) : null;
  const userId = user?.id;

  // FETCH - GET Native: ambil todos user
  async function getTodos(token) {
    try {
      const res = await fetch("/api/todos", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      return data; // { success, data }
    } catch (err) {
      console.error("GET error:", err);
      return null;
    }
  }

  // // FETCH - GET Axios: ambil todos user
  // async function getTodosAxios(token) {
  //   try {
  //     const res = await api.get("/todos", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     return res.data; // sesuai format BE: { success, data }
  //   } catch (err) {
  //     console.error("Axios GET error:", err);
  //     return { success: false, data: [] };
  //   }
  // }

  // FETCH - POST Native: tambah todo baru
  async function addTask() {
    if (!newTaskTitle || !token || !userId) return;

    try {
      // POST todo baru
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTaskTitle, userId }),
      });

      const data = await res.json();

      if (data.success) {
        onOpenChange(false);      // tutup modal
        setNewTaskTitle("");      // reset input

        const todos = await getTodos(token);
        if (todos?.success) setTasks(todos.data); // refresh card
      }

      return data;
    } catch (err) {
      console.error("POST fetch error:", err);
      return { success: false };
    }
  }

  // FETCH - POST Axios: tambah todo baru
  // async function addTaskAxios() {
  //   if (!newTaskTitle || !token || !userId) return;

  //   try {
  //     // POST todo baru
  //     const res = await api.post(
  //       "/todos",
  //       { title: newTaskTitle, userId },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     const data = res.data;

  //     if (data.success) {
  //       onOpenChange(false);      // tutup modal
  //       setNewTaskTitle("");      // reset input

  //       const todos = await api.get("/todos", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       setTasks(todos.data.data); // refresh card
  //     }

  //     return data;
  //   } catch (err) {
  //     console.error("POST axios error:", err);
  //     return { success: false };
  //   }
  // }

  // FETCH - PUT Native: update todo
  async function submitEdit() {
    if (!editTask || !token) return;

    try {
      const res = await fetch("/api/todos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: editTask.id,
          title: editTitle,
          completed: editTask.completed,
          // tambahin data lain kalau perlu
        }),
      });

      const data = await res.json();
      if (!data.success) return data;

      onEditChange(false); // tutup modal

      const list = await getTodos(token); // refresh card
      if (list?.success) setTasks(list.data);

      return data;
    } catch (err) {
      console.error("PUT fetch error:", err);
      return { success: false };
    }
  }

  // FETCH - PUT Axios: update todo
  // async function submitEditAxios() {
  //   if (!editTask || !token) return;

  //   try {
  //     const { data } = await api.put(
  //       "/todos",
  //       {
  //         id: editTask.id,
  //         title: editTitle,
  //         completed: editTask.completed,
  //         // tambahin data lain kalau perlu
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (!data.success) return data;

  //     onEditChange(false); // tutup modal

  //     const list = await getTodosAxios(token); // refresh card
  //     if (list?.success) setTasks(list.data);

  //     return data;
  //   } catch (err) {
  //     console.error("PUT axios error:", err);
  //     return { success: false };
  //   }
  // }

  // func open modal edit
  function onEditClick(todo) {
    setEditTask(todo);        // simpan data task yg mau diedit
    setEditTitle(todo.title); // isi input modal
    onEditChange(true);       // buka modal edit
  }

  // FETCH - DELETE Native: hapus todo
  async function deleteTask(id) {
    if (!token) return;

    try {
      const res = await fetch(`/api/todos?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!data.success) return data;

      // Refresh card setelah delete
      const list = await getTodos(token);
      if (list?.success) setTasks(list.data);

      return data;
    } catch (err) {
      console.error("DELETE fetch error:", err);
      return { success: false };
    }
  }

  // FETCH - DELETE Axios: hapus todo
  // async function deleteTaskAxios(id, token) {
  //   try {
  //     const { data } = await api.delete("/todos", {
  //       params: { id },
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const list = await getTodosAxios(token); // refresh card
  //     if (list?.success) setTasks(list.data);

  //     return data;
  //   } catch (err) {
  //     console.error("DELETE ERROR:", err.response?.data || err.message);
  //     return { success: false };
  //   }
  // }

  useEffect(() => {
    async function fetchTasks() {
      if (!token) return;

      setLoading(true);

      const result = await getTodos(token);           // menggunakan fetch native
      // const result = await getTodosAxios(token);   // menggunakan axios

      if (result?.success) {
        setTasks(result.data);
      }

      setLoading(false);
    }

    fetchTasks();
  }, [token]);

  return (
    <main className="flex h-screen bg-[#F6F7FB] overflow-hidden font-sans text-gray-800">
      <Sidebar />
      <section className="flex-1 p-8 h-screen flex flex-col">
        <Header />

        {/* Modal Add Task */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Add New Task</ModalHeader>
                <ModalBody>
                  <TextInput
                    label="Task Title"
                    placeholder="Enter new task..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  {/* <Button color="primary" onPress={addTaskAxios}> */}
                  <Button color="primary" onPress={addTask}>
                    Add
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* Modal Edit Task */}
        <Modal isOpen={isEditOpen} onOpenChange={onEditChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Edit Task</ModalHeader>
                <ModalBody>
                  <TextInput
                    label="Task Title"
                    placeholder="Edit task..."
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  {/* <Button color="primary" onPress={submitEditAxios}> */}
                  <Button color="primary" onPress={submitEdit}>
                    Save
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* Single Column (semua tasks) */}
        <div className="grid grid-cols-1 gap-8 flex-1 overflow-hidden pb-4">
          <TaskColumn
            title="All Tasks"
            colorClass="bg-blue-500"
            completed={tasks.filter((t) => t.completed).length}
            total={tasks.length}
            onAddTaskClick={onOpen}
          >
            {loading ? (
              <p>Loading...</p>
            ) : (
              tasks.map((t) => (
                <TaskCard
                  key={t.id}
                  title={t.title}
                  desc=""
                  time={new Date(t.createdAt).toLocaleString()}
                  type=""
                  isDone={t.completed}
                  onDelete={() => deleteTask(t.id)}
                  // onDelete={() => deleteTaskAxios(t.id, token)} //delete axios
                  onEdit={() => onEditClick(t)}
                />
              ))
            )}
          </TaskColumn>
        </div>
      </section>
    </main>
  );
}
