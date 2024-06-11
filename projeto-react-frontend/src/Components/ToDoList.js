import React from 'react';
import '../Assets/css/ToDoList.css';

const ToDoList = () => {
  return (
    <section className="ToDoList-section" >
      <h2 className='underline-colorido underline-colorido-spaced'>To-do List</h2>
      <p>Drag and drop to set your main priorities, check <br/> when done and create what´s new.</p>
    </section>
  );
};

export default ToDoList;