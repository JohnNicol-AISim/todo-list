import React, { useState, useEffect } from 'react';
    import styled, { keyframes, css } from 'styled-components';

    const fadeIn = keyframes`
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    `;

    const TodoListContainer = styled.div`
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 30px;
      width: 450px;
      max-width: 95%;
      animation: ${fadeIn} 0.5s ease-out;
      transition: background 0.3s ease, color 0.3s ease;

      ${props => props.darkMode && css`
        background: rgba(0, 0, 0, 0.1);
        color: #fff;
      `}
    `;

    const Title = styled.h1`
      color: #fff;
      text-align: center;
      margin-bottom: 25px;
      font-size: 2.2em;
      letter-spacing: 1px;
      transition: color 0.3s ease;

      ${props => props.darkMode && css`
        color: #fff;
      `}
    `;

    const InputContainer = styled.div`
      display: flex;
      margin-bottom: 20px;
    `;

    const Input = styled.input`
      flex: 1;
      padding: 12px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 6px;
      margin-right: 12px;
      font-size: 1em;
      transition: border-color 0.3s ease, background 0.3s ease, color 0.3s ease;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;

      &:focus {
        border-color: #5cb85c;
        outline: none;
      }

      ${props => props.darkMode && css`
        background: rgba(0, 0, 0, 0.1);
        color: #fff;
      `}
    `;

    const AddButton = styled.button`
      background-color: #5cb85c;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1em;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #4cae4c;
      }
    `;

    const FilterContainer = styled.div`
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    `;

    const FilterButton = styled.button`
      background-color: rgba(255, 255, 255, 0.1);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 10px 15px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9em;
      transition: background-color 0.3s ease, color 0.3s ease;

      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }

      &.active {
        background-color: rgba(255, 255, 255, 0.3);
      }

      ${props => props.darkMode && css`
        background-color: rgba(0, 0, 0, 0.1);
        color: #fff;
      `}
    `;

    const ClearButton = styled.button`
      background-color: #d9534f;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9em;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #c9302c;
      }
    `;

    const TodoList = styled.ul`
      list-style: none;
      padding: 0;
    `;

    const TodoItem = styled.li`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      animation: ${fadeIn} 0.3s ease-out;
      transition: background 0.3s ease, color 0.3s ease;

      &:last-child {
        border-bottom: none;
      }

      ${props => props.darkMode && css`
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      `}
    `;

    const TodoText = styled.span`
      flex: 1;
      text-decoration: ${props => props.completed ? 'line-through' : 'none'};
      cursor: pointer;
      font-size: 1.1em;
      transition: color 0.3s ease;

      &:hover {
        color: #ddd;
      }

      ${props => props.darkMode && css`
        color: #fff;
      `}
    `;

    const DeleteButton = styled.button`
      background-color: #d9534f;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9em;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #c9302c;
      }
    `;

    const DarkModeToggle = styled.button`
      position: absolute;
      top: 20px;
      right: 20px;
      background-color: rgba(255, 255, 255, 0.1);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 10px 15px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9em;
      transition: background-color 0.3s ease, color 0.3s ease;

      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }

      ${props => props.darkMode && css`
        background-color: rgba(0, 0, 0, 0.1);
        color: #fff;
      `}
    `;

    function App() {
      const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
      });
      const [newTodo, setNewTodo] = useState('');
      const [filter, setFilter] = useState('all');
      const [darkMode, setDarkMode] = useState(false);

      useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]);

      const addTodo = () => {
        if (newTodo.trim() !== '') {
          setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
          setNewTodo('');
        }
      };

      const toggleComplete = (id) => {
        setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
      };

      const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
      };

      const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
      };

      const filteredTodos = () => {
        switch (filter) {
          case 'completed':
            return todos.filter(todo => todo.completed);
          case 'active':
            return todos.filter(todo => !todo.completed);
          default:
            return todos;
        }
      };

      const toggleDarkMode = () => {
        setDarkMode(!darkMode);
      };

      return (
        <TodoListContainer darkMode={darkMode}>
          <DarkModeToggle darkMode={darkMode} onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </DarkModeToggle>
          <Title darkMode={darkMode}>Awesome To-Do List</Title>
          <InputContainer>
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add new todo"
              darkMode={darkMode}
            />
            <AddButton onClick={addTodo}>Add</AddButton>
          </InputContainer>
          <FilterContainer>
            <FilterButton
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
              darkMode={darkMode}
            >
              All
            </FilterButton>
            <FilterButton
              className={filter === 'active' ? 'active' : ''}
              onClick={() => setFilter('active')}
              darkMode={darkMode}
            >
              Active
            </FilterButton>
            <FilterButton
              className={filter === 'completed' ? 'active' : ''}
              onClick={() => setFilter('completed')}
              darkMode={darkMode}
            >
              Completed
            </FilterButton>
            <ClearButton onClick={clearCompleted}>Clear Completed</ClearButton>
          </FilterContainer>
          <TodoList>
            {filteredTodos().map(todo => (
              <TodoItem key={todo.id} darkMode={darkMode}>
                <TodoText
                  completed={todo.completed}
                  onClick={() => toggleComplete(todo.id)}
                  darkMode={darkMode}
                >
                  {todo.text}
                </TodoText>
                <DeleteButton onClick={() => deleteTodo(todo.id)}>Delete</DeleteButton>
              </TodoItem>
            ))}
          </TodoList>
        </TodoListContainer>
      );
    }

    export default App;
