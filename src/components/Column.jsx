// Column.js
import React, { useState  , } from 'react';
import './Column.css';
import TaskCard from './TaskCard'; 

function Column({ column, editColumnName, changeColumnBackgroundColor, deleteColumn , onMoveLeft, onMoveRight}) {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false); 
  const [newTaskDetails, setNewTaskDetails] = useState({
    id: 1, 
    assignee: '',
    label: '',
    color: '',
    startTime: '',
    endTime: '',
    description: ''
  });

  const handleAddTask = () => {
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewTaskDetails({ ...newTaskDetails, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, newTaskDetails]);
    setNewTaskDetails({
      ...newTaskDetails,
      id: newTaskDetails.id + 1, 
      assignee: '',
      label: '',
      color: '',
      startTime: '',
      endTime: '',
      description: ''
    });
    setShowForm(false);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleEditTask = (editedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === editedTask.id ? editedTask : task
    );
    setTasks(updatedTasks);
  };

  const handleEditColumnName = () => {
    const newName = editColumnName;
    if (newName) {
      editColumnName(column.id, newName);
    }
  };

  const handleChangeColumnBackgroundColor = () => {
    const newColor = changeColumnBackgroundColor;
    if (newColor) {
      changeColumnBackgroundColor(column.id, newColor);
    }
  };

  const handleDeleteColumn = () => {
    deleteColumn(column.id);
  };

  const handleMoveLeft = () => {
    onMoveLeft(column.id);
  };

  const handleMoveRight = () => {
    onMoveRight(column.id);
  };

  


  
 
  
  return (
 
        <div className="column" style={{ backgroundColor: column.backgroundColor }} >
          <div className='left-right-btn'>
            <button onClick={handleMoveLeft}><i class="fa-solid fa-arrow-right"></i></button>
            <button onClick={handleMoveRight}><i class="fa-solid fa-arrow-right"></i></button>
          </div>
          <h3 onClick={handleEditColumnName}>{column.name}</h3>
          <div className='columnbtn'>
            <button onClick={handleChangeColumnBackgroundColor}>Change Color</button>
            <button onClick={handleDeleteColumn}>Delete Column</button>
           
            {!showForm && (
            <button onClick={handleAddTask}>Add Task</button>
            )}
          </div>

        
          

          <div className='task-container' >
        
          {tasks.map((task, index) => (    
            <TaskCard 
              key={index} 
              task={task} 
              onDelete={handleDeleteTask} 
              onEdit={handleEditTask} 
            /> 
          ))}
                  </div>
          
      

    

       
        {showForm && (
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="assignee"
              value={newTaskDetails.assignee}
              onChange={handleFormChange}
              placeholder="Assignee"
            />
         
            <input
              type="text"
              name="label"
              value={newTaskDetails.label}
              onChange={handleFormChange}
              placeholder="Label"
            />
            <input
              type="text"
              name="color"
              value={newTaskDetails.color}
              onChange={handleFormChange}
              placeholder="Color"
            />
            <input
              type="text"
              name="startTime"
              value={newTaskDetails.startTime}
              onChange={handleFormChange}
              placeholder="Start Time"
            />
            <input
              type="text"
              name="endTime"
              value={newTaskDetails.endTime}
              onChange={handleFormChange}
              placeholder="End Time"
            />
            <textarea
              name="description"
              value={newTaskDetails.description}
              onChange={handleFormChange}
              placeholder="Description"
            ></textarea>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        )}
      </div>

  );
}

export default Column;
