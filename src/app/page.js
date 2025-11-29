'use client'

import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TaskColumn from '../components/TaskColumn';
import TaskCard from '../components/TaskCard';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";
import TextInput from '../components/TextInput';

// Fungsi decode JWT
function decodeToken(token) {
  try {
    const payload = token.split('.')[1];
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

  // Ambil token dari localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const user = token ? decodeToken(token) : null;
  const userId = user?.id;

  // Fetch tasks
  useEffect(() => {
    async function fetchTasks() {
      if (!token) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/todos`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        console.log("Backend response:", data);
        if (res.ok && data.success) setTasks(data.data);
        else console.error("Backend error:", data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [token]);

  // Tambah task baru
  async function addTask() {
    if (!newTaskTitle || !token || !userId) return;

    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: newTaskTitle, userId })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setTasks(prev => [data.data, ...prev]);
        setNewTaskTitle('');
        onOpenChange(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Delete task
  async function deleteTask(id) {
    try {
      const res = await fetch(`/api/todos?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

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
                  <Button color="danger" variant="light" onPress={onClose}>Cancel</Button>
                  <Button color="primary" onPress={addTask}>Add</Button>
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
            completed={tasks.filter(t => t.completed).length}
            total={tasks.length}
            onAddTaskClick={onOpen}
          >
            {loading ? (
              <p>Loading...</p>
            ) : (
              tasks.map(t => (
                <TaskCard
                  key={t.id}
                  title={t.title}
                  desc="" // kosong karena backend belum punya
                  time={new Date(t.createdAt).toLocaleString()}
                  type="" // kosong
                  isDone={t.completed}
                  onDelete={() => deleteTask(t.id)}
                />
              ))
            )}
          </TaskColumn>
        </div>
      </section>
    </main>
  );
}
