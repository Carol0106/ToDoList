import React, { useEffect, useState } from 'react';
import '../Assets/css/Cards.css';
import api from '../Api';
import ModalEdit from './ModalEdit'; 

const Cards = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

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

  const handleDeleteAll = async () => {
    try {
      await Promise.all(tasks.map(task => api.delete(`/tasks/${task._id}`)));
      fetchTasks();
    } catch (error) {
      console.error('Error deleting all tasks:', error);
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
    setNewTitle(task.title);
    setShowEditModal(true); 
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${editTask._id}`, { title: newTitle });
      setEditTask(null);
      setNewTitle('');
      fetchTasks();
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
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
                <span className="delete" onClick={() => handleEdit(task)}>edit</span>
                <span className="delete" onClick={() => handleDelete(task._id)}>delete</span>
              </li>
            ))}
           
            <li>
              <label>
                <input type="checkbox" /> <span style={{color: '#E38D3F'}}>Editing an item...</span>
              </label>
            </li>
          </ul>
          <button className="erase-button" onClick={handleDeleteAll}>erase all</button>
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
                <span className="delete" onClick={() => handleDelete(task._id)}>delete</span>
              </li>
            ))}
          </ul>
          <button className="erase-button" onClick={handleDeleteAll}>erase all</button>
        </div>
      </div>
      {editTask && (
         <ModalEdit 
         show={showEditModal}
         onHide={() => setShowEditModal(false)} 
         onUpdate={handleUpdate} 
         newTitle={newTitle} 
         setNewTitle={setNewTitle}
       />
     )}
   </section>
 );
};

//         <form onSubmit={handleUpdate} className="edit-form">
//           <input
//             type="text"
//             placeholder="Title"
//             value={newTitle}
//             onChange={(e) => setNewTitle(e.target.value)}
//             required
//           />
//           <button type="submit">Update Task</button>
//           <button type="button" onClick={() => setEditTask(null)}>Cancel</button>
//         </form>
//       )}
//     </section>
//   );
// };

export default Cards;
