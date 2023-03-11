import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { CredentialsContext } from '../App';
import ThemeToogle from './ThemeToogle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Navigate, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Todos = () => {
  const navigate = useNavigate();

  const [todo, setTodo] = useState('');
  const [id, setId] = useState();
  const [todos, setTodos] = useState([{ id: 1, text: 'costam' }]);
  const [isEdit, setIsEdit] = useState(false);
  const [credentials] = useContext(CredentialsContext);

  //   Add Todo
  const addTodo = (e) => {
    e.preventDefault();
    if (!todo) return;
    const newTodo = { id: uuidv4(), text: todo };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodo('');
  };

  //   Delete Todo
  const handleDelete = (id) => {
    const newTodoList = [...todos];
    const removeItem = newTodoList.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  };

  // Update Todo
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTodo(todo.text);
    setId(todo.id);
  };

  const confirmUpdate = () => {
    const newTodoList = [...todos];
    const todoIndex = newTodoList.findIndex((todo) => todo.id === id);
    newTodoList[todoIndex] = { ...newTodoList[todoIndex], text: todo };
    setTodos(newTodoList);
    setTodo('');
    setId();
    setIsEdit(false);
  };

  return (
    <div className="h-screen w-full items-center flex flex-col justify-end md:p-10 p-2">
      <div className="block text-2xl">
        <ThemeToogle />
      </div>
      <div className="h-1/4 md:w-3/4 w-full p-4 flex flex-col items-center justify-between">
        <h1 className=" text-center text-4xl">{`Hello ${credentials.email}`}</h1>
        <div className="my-2 w-full md:w-1/2 flex flex-col rounded-2xl">
          <input
            placeholder="Enter todo"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            className="w-full my-2 p-2 bg-primary border-4 border-input rounded-2xl"
            type="text"
          />

          {isEdit ? (
            <>
              <Button sx={{ fontSize: 18 }} onClick={confirmUpdate}>
                Confirm
              </Button>
              <Button sx={{ fontSize: 18 }} onClick>
                Cancel
              </Button>{' '}
            </>
          ) : (
            <>
              <Button sx={{ fontSize: 18 }} onClick={addTodo}>
                Add
              </Button>
              <Button sx={{ fontSize: 18 }} onClick={() => navigate('/')}>
                Log out
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="h-full md:w-2/4 w-full mt-16 p-4 bg-primary border-4 border-input rounded-2xl my-4 flex flex-col items-center overflow-y-scroll">
        {todos.map((todo, index) => (
          <div
            className="flex items-center justify-between px-4 w-full h-fit bg-primary border-4 border-input rounded-2xl p-3 my-2 "
            key={index}
          >
            <div className="text-3xl overflow-x-hidden">
              {' '}
              {index + 1}. {todo.text.toLowerCase()}
            </div>

            <div>
              <EditIcon
                sx={{ fontSize: 35 }}
                className="cursor-pointer border-2 rounded-full p-1 ease-in hover:duration-500 hover:transition hover:scale-105 mx-2"
                onClick={() => {
                  handleUpdate(todo);
                }}
              ></EditIcon>
              <DeleteIcon
                className="cursor-pointer border-2 rounded-full p-1 ease-in hover:duration-500 hover:transition hover:scale-105"
                sx={{ fontSize: 35 }}
                onClick={() => {
                  handleDelete(todo.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
