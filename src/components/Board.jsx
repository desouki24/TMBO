// Board.js
import React, { useState ,useEffect } from 'react';
import './Board.css';
import Column from './Column';
import {DragDropContext , Droppable } from 'react-beautiful-dnd';


function Board() {
  const [columns, setColumns] = useState([
    { id: 'todo', name: 'To Do', backgroundColor: 'rgb(240, 240, 240, 0.5);' },
    { id: 'in-progress', name: 'In Progress', backgroundColor: 'rgb(240, 240, 240, 0.5);' },
    { id: 'done', name: 'Done', backgroundColor: 'rgb(240, 240, 240, 0.5);' }
  ]);

  const addColumn = () => {
    const newColumnName = prompt('Enter column name:');
    if (newColumnName) {
      
      setColumns([...columns, { id: newColumnName.toLowerCase().replace(/\s+/g, '-'), name: newColumnName, backgroundColor: 'rgb(240, 240, 240, 0.5);' }]);
    }
  };

  const editColumnName = (id) => {
    const newName = prompt('Enter new column name:');
    if (newName) {
      setColumns(columns.map(column => {
        if (column.id === id) {
          return { ...column, name: newName };
        }
        return column;
      }));
    }
  };

  const changeColumnBackgroundColor = (id) => {
    const newColor = prompt('Enter new background color:');
    if (newColor) {
      setColumns(columns.map(column => {
        if (column.id === id) {
          return { ...column, backgroundColor: newColor };
        }
        return column;
      }));
    }
  };

  const deleteColumn = (id) => {
    setColumns(columns.filter(column => column.id !== id));
  };


  const moveColumnLeft = (id) => {
    const columnIndex = columns.findIndex(col => col.id === id);
    if (columnIndex > 0) {
      const updatedColumns = [...columns];
      [updatedColumns[columnIndex], updatedColumns[columnIndex - 1]] = [updatedColumns[columnIndex - 1], updatedColumns[columnIndex]];
      setColumns(updatedColumns);
    }
  };
  
  const moveColumnRight = (id) => {
    const columnIndex = columns.findIndex(col => col.id === id);
    if (columnIndex < columns.length - 1) {
      const updatedColumns = [...columns];
      [updatedColumns[columnIndex], updatedColumns[columnIndex + 1]] = [updatedColumns[columnIndex + 1], updatedColumns[columnIndex]];
      setColumns(updatedColumns);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
 

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const [tasks] = useState([]);

  // Filtered tasks based on search query
  const filteredTasks = tasks.filter(task =>
    task.label.toLowerCase().includes(searchQuery.toLowerCase())
  );




  // Get Columns from local storage
  useEffect(() => {
    const savedColumns = localStorage.getItem('columns');
    if (savedColumns) {
      setColumns(JSON.parse(savedColumns));
    }
  }, []);

    // Save columns to local storage
    useEffect(() => {
      localStorage.setItem('columns', JSON.stringify(columns));
    }, [columns]);




  


  return (
    <div className="board">

<input
  type="text"
  placeholder="Search by label..."
  value={searchQuery}
  onChange={handleSearchChange}
  className="input-style"
/>
      
      <DragDropContext onDragEnd={() => {
        console.log('DND');
      }}>
        <Droppable droppableId={columns.id} type='group'>
          {(provided) => (
                <div className='container' {...provided.droppableProps} ref={provided.innerRef}>
                {columns.map((column, index) => (
                  <Column 
                  key={column.id} 
                  column={column} 
                  index={index} 
                  
                  editColumnName={editColumnName} 
                  changeColumnBackgroundColor={changeColumnBackgroundColor} 
                  deleteColumn={deleteColumn}
                  onMoveLeft={moveColumnLeft}
                  onMoveRight={moveColumnRight} 
                  tasks={filteredTasks}
                        />
                            
                ))}
              </div>

          )}
            </Droppable>
            </DragDropContext>
      <button onClick={addColumn}>Add Column</button>
    </div>
  );
}

export default Board;