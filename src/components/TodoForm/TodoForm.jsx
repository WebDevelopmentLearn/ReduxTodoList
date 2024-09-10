
import styles from "./TodoForm.module.scss";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {addTodo, removeTodo, toggleTodo} from "../../store/reducers/userSlice";
import {useContext, useEffect, useState} from "react";
import {LangContext} from "../../contexts/LangContext";

export const TodoForm = () => {
    const {lang} = useContext(LangContext);
    const {register, handleSubmit, reset, control, formState: {errors}} = useForm();
    const todos = useSelector(state => state.todoReducer.todos);
    const dispatch = useDispatch();


    const onSubmit = (data) => {
        // console.log(data.todoInput);
        const id = Math.floor(Math.random() * 1000) + 1;
        dispatch(addTodo({id: id, title: data.todoInput, isCompleted: false}));
    }

    const handleToggle = (id) => {
        dispatch(toggleTodo(id));
    }

    const handleDelete = (id) => {
        dispatch(removeTodo(id));
    }

    return (
        <div className={styles.TodoFormContainer}>
            <h1>Redux TodoList</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.todoControls}>
                    <div className={styles.todoInputs}>
                        <input className={styles.todoInput} type="text"
                               placeholder="Введите описание таска" {...register("todoInput", {
                            required: "This field is required",
                            minLength: {
                                value: 5,
                                message: `${lang === "ru" ? "Минимальная длина 5 символов" : "Minimum length is 5 characters"}`
                            }
                        })}/>
                        <button className={`${styles.btn} ${styles.addTodoBtn}`} type="submit">{lang === "ru" ? "Добавить таск" : "Add todo"}</button>
                    </div>
                    {errors.todoInput && <p style={{color: "#b92a2a", fontWeight: "600"}}>{errors.todoInput.message}</p>}

                </div>
                <ul>
                    {todos?.map(todo =>
                        <li key={todo.id}>
                            <input type="checkbox" checked={todo.isCompleted}
                                   onChange={() => handleToggle(todo.id)}/>
                            <p className={todo.isCompleted ? styles.complete : null}>{todo.title}</p>
                            <button className={styles.btn} onClick={() => handleDelete(todo.id)}>{lang === "ru" ? "Удалить" : "Delete"}</button>
                        </li>
                    )}
                </ul>

            </form>
        </div>
    )
}