import React from 'react';
import './Todolist.css';

const Todolist = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="cards d-flex align-items-center ps-3 ms-3 mt-3 form-control">
      <div className="checkbox-wrapper d-flex">
        <input
          id={`checkbox-${todo.id}`}
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <label htmlFor={`checkbox-${todo.id}`}>
          <div className="tick_mark"></div>
        </label>
      </div>
      <div className={`todos ${todo.completed ? 'completed' : ''}`}>
        <p>{todo.text}</p>
      </div>
      <div className="del-icon">
        <i
          className="fa-solid fa-trash text-danger btn"
          onClick={() => onDelete(todo.id)}
        ></i>
      </div>
    </div>
  );
};

export default Todolist;
