import {createSlice} from "@reduxjs/toolkit";

/**
todos: [
    {id: 1, title: "Learn Redux", completed: false},
    {id: 2, title: "Learn React", completed: false},
    {id: 3, title: "Learn NodeJS", completed: false}
]
*/

const initialState = {
    todos: JSON.parse(localStorage.getItem('todos')) || [], // загружаем данные из LocalStorage
};

const todoSlice = createSlice({
        name: "todoList",
        initialState,
        reducers: {
            addTodo: (state, action) => {
                state.todos.push(action.payload);
                localStorage.setItem("todos", JSON.stringify(state.todos));
            },
            removeTodo: (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            },
            toggleTodo: (state, action) => {
                const currentTodo = state.todos.find(todo => todo.id === action.payload);
                currentTodo.isCompleted = !currentTodo.isCompleted;

            }
        }
    }
)
export default todoSlice.reducer;
export const {addTodo, removeTodo, toggleTodo} = todoSlice.actions;