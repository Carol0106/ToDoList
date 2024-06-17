import React, { useEffect, useState } from 'react';
import '../Assets/css/Cards.css';
import api from '../Utils/api';
import ModalTask from './ModalTask';
import { isAuthenticated } from '../Utils/auth'; 

const Cards = () => {
  const [showModalTask, setShowModalTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [disableDeleteAll, setDisableDeleteAll] = useState(true); 

  useEffect(() => {
    fetchTasks();
    setIsLoggedIn(isAuthenticated()); 
  }, []);

  useEffect(() => {
    setDisableDeleteAll(tasks.length === 0 || !isLoggedIn);
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      const todo = response.data.filter(task => !task.done);
      const done = response.data.filter(task => task.done);
      setTasks(todo);
      setDoneTasks(done);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDeleteAllTodo = async () => {
    try {
      await Promise.all(tasks.map(task => api.delete(`/tasks/${task._id}`)));
      fetchTasks();
    } catch (error) {
      console.error('Error deleting all todo tasks:', error);
    }
  };

  const handleDeleteAllDone = async () => {
    try {
      await Promise.all(doneTasks.map(task => api.delete(`/tasks/${task._id}`)));
      fetchTasks();
    } catch (error) {
      console.error('Error deleting all done tasks:', error);
    }
  };

  const handleToggleDone = async (task) => {
    try {
      const updatedTask = { ...task, done: !task.done }; // Invertendo o valor de done
      console.log('Valor do estado "done" antes de enviar a requisição:', task.done);
      await api.put(`/tasks/${task._id}`, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setShowModalTask(true);
  };

  const handleUpdateTask = async (taskId, newTitle) => {
    try {
      await api.put(`/tasks/${taskId}`, { title: newTitle });
      console.log('Task updated');
      fetchTasks();
      setShowModalTask(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleCloseModalTask = () => {
    setEditTask(null);
    setShowModalTask(false);
  };

  return (
    <section className="Cards-section">
      <div className="Cards-container row">
        <div className="Cards todo">
          <h3>To-do</h3>
          <p>Take a breath. <br /> Start doing.</p>
          <ul>
            {tasks.map(task => (
              <li key={task._id}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={task.done} 
                    onChange={() => handleToggleDone(task)} 
                  /> 
                  <span>{task.title}</span>
                </label>
                {isLoggedIn && (
                  <React.Fragment>
                    <span className="delete" onClick={() => handleEdit(task)} disabled={!isLoggedIn}>edit</span>
                    <span className="delete" onClick={() => handleDelete(task._id)} disabled={!isLoggedIn}>delete</span>
                  </React.Fragment>
                )}
              </li>
            ))}
            <li>
              <label>
                <input type="checkbox" /> <span style={{color: '#E38D3F'}}>Editing an item...</span>
              </label>
            </li>
          </ul>
          <button className="erase-button" onClick={handleDeleteAllTodo} disabled={disableDeleteAll}>erase all</button>
        </div>
        <div className="Cards done">
          <h3>Done</h3>
          <p>Congratulations! <br />
            <span>You have done {doneTasks.length} tasks</span></p>
          <ul>
            {doneTasks.map(task => (
              <li key={task._id}>
                <label style={{ maxWidth: '200px'}}>
                  <input 
                    type="checkbox" 
                    checked={task.done} 
                    onChange={() => handleToggleDone(task)} 
                  /> 
                  <span>{task.title}</span>
                </label>
                
                {isLoggedIn && (
                  <React.Fragment>
                    <span className="delete" onClick={() => handleDelete(task._id)} disabled={!isLoggedIn}>delete</span>
                  </React.Fragment>
                )}
              </li>
            ))}
          </ul>
          <button className="erase-button" onClick={handleDeleteAllDone} disabled={disableDeleteAll}>erase all</button>
        </div>
      </div>
      {showModalTask && (
        <ModalTask
          show={showModalTask}
          handleClose={handleCloseModalTask}
          task={editTask}
          onUpdate={handleUpdateTask}
        />
      )}
    </section>
  );
};

export default Cards;
