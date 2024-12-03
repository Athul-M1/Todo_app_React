import React, { useState, useEffect } from 'react';
import './Todoform.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Todolist from './Todolist';

const Todoform = () => {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [newTask, setNewTask] = useState(''); // State for input field

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
      }
    }
  }, []);

  // Add a new task
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks, { id: Date.now(), text: newTask, completed: false }];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save to localStorage
      setNewTask(''); // Clear input after adding
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save updated tasks to localStorage
  };

  // Delete a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save updated tasks to localStorage
  };

  return (
    <>
      <div className="container rounded-5 shadow-lg mt-5 p-5">
        <div className="heading text-center mb-3">
          <h3 className='text-light'>TODO APP</h3>
        </div>
        <div className="d-flex">
          <input
            type="text"
            placeholder="Enter your task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="form-control w-75 mx-auto"
          />
          <button
            className="btn btn-primary"
            onClick={handleAddTask}
          >
            <i className="fa-solid fa-circle-plus me-2"></i>Add
          </button>
        </div>
        <div className="mt-4 todo-list-container">
          {tasks.map((task) => (
            <Todolist
              key={task.id}
              todo={task}
              onToggle={toggleTaskCompletion}
              onDelete={deleteTask}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Todoform;
