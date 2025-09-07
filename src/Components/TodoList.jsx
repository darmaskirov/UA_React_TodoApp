import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  // ---- state ----
  const [todos, setTodos] = useState([]);
  const [headingInput, setHeadingInput] = useState('');
  const [listInputs, setListInputs] = useState({}); // { [index]: 'текст нового пункта' }

  // ---- handlers ----
  const handleAddTodo = () => {
    if (headingInput.trim() !== '') {
      setTodos([...todos, { heading: headingInput.trim(), lists: [] }]);
      setHeadingInput('');
    }
  };

  const handleDeleteTodo = (index) => {
    const next = [...todos];
    next.splice(index, 1);
    setTodos(next);

    // подчистим связанный ввод
    const li = { ...listInputs };
    delete li[index];
    setListInputs(li);
  };

  const handleListInputChange = (index, value) => {
    setListInputs({ ...listInputs, [index]: value });
  };

  const handleAddList = (index) => {
    const value = (listInputs[index] || '').trim();
    if (!value) return;
    const next = [...todos];
    next[index].lists.push(value);
    setTodos(next);
    setListInputs({ ...listInputs, [index]: '' });
  };

  // ---- render ----
  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>

        {/* ЕДИНСТВЕННЫЙ блок ввода заголовка */}
        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            placeholder="Введите заголовок"
            value={headingInput}
            onChange={(e) => setHeadingInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
          />
          <button className="add-list-button" onClick={handleAddTodo}>
            Добавить заголовок
          </button>
        </div>
      </div>

      <div className="todo_main">
        {todos.map((todo, index) => (
          <div key={index} className="todo-card">
            <div className="heading_todo">
              <h3>{todo.heading}</h3>
              <button
                className="delete-button-heading"
                onClick={() => handleDeleteTodo(index)}
              >
                Удалить заголовок
              </button>
            </div>

            {/* список пунктов под заголовком */}
            {todo.lists.length > 0 && (
              <ul>
                {todo.lists.map((item, listIndex) => (
                  <li key={listIndex} className="todo_inside_list">
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            )}

            {/* добавление пункта под конкретным заголовком */}
            <div className="add_list">
              <input
                type="text"
                className="list-input"
                placeholder="Добавить список"
                value={listInputs[index] || ''}
                onChange={(e) => handleListInputChange(index, e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddList(index)}
              />
              <button className="add-list-button" onClick={() => handleAddList(index)}>
                Добавить список
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
