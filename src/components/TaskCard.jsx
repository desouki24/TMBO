// TaskCard.js
import React, { useState } from 'react';
import './TaskCard.css'; 
import {DragDropContext , Draggable} from 'react-beautiful-dnd';

function TaskCard({ task, onDelete, onEdit }) {
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [originalTask, setOriginalTask] = useState(null);
  const [cardColor, setCardColor] = useState(task.color); 

  const handleEditClick = () => {
    setOriginalTask({ ...task }); 
    setEditMode(true);
  };

  const handleSaveClick = () => {
    onEdit(editedTask);
    setEditMode(false);
  };

  const handleCancelClick = () => {
    setEditedTask({ ...originalTask }); 
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value
    });
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setEditedTask({
      ...editedTask,
      color: newColor 
    });
    setCardColor(newColor); 
  };

  return (

    <DragDropContext onDragEnd={() => {
      console.log("DND");
    } }>
      <Draggable draggableId={task.id} key={task.id} index={task.index}>
          {(provided) => (

            <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>

    <div className="task-card" style= {{ backgroundColor: cardColor }} >
      <button className="delete-button" onClick={() => onDelete(task.id)}>Delete</button>
      {!editMode ? (
        <button className="edit-button" onClick={handleEditClick}>Edit</button>
      ) : (
        <div>
          <button className="save-button" onClick={handleSaveClick}>Save</button>
          <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
        </div>
      )}
      <div>
        <p>Assignee: {task.assignee}</p>
        <p>Label: {task.label}</p>
        <p>Color: {task.color}</p>
        <p>Start Time: {task.startTime}</p>
        <p>End Time: {task.endTime}</p>
        <p>Description: {task.description}</p>
        {editMode && (
          <div className='editForm'>
            <label htmlFor="assignee">Assignee:</label>
            <input type="text" id="assignee" name="assignee" value={editedTask.assignee} onChange={handleChange} />
            <label htmlFor="label">Label:</label>
            <input type="text" id="label" name="label" value={editedTask.label} onChange={handleChange} />
            <label htmlFor="color">Color:</label>
            <input type="color" id="color" name="color" value={editedTask.color} onChange={handleColorChange} />
            <label htmlFor="startTime">Start Time:</label>
            <input type="text" id="startTime" name="startTime" value={editedTask.startTime} onChange={handleChange} />
            <label htmlFor="endTime">End Time:</label>
            <input type="text" id="endTime" name="endTime" value={editedTask.endTime} onChange={handleChange} />
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={editedTask.description} onChange={handleChange}></textarea>
          </div>
        )}
      </div>
    </div>
    </div>
     )}
     </Draggable>
    </DragDropContext>
  );
}

export default TaskCard;
