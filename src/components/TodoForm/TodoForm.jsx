
import styles from "./TodoForm.module.scss";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {addTodo, removeTodo, toggleTodo} from "../../store/reducers/userSlice";
import {useEffect, useState} from "react";

export const TodoForm = () => {

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
                {/*<Controller*/}
                {/*    name="todo"*/}
                {/*    control={control}*/}
                {/*    defaultValue=""*/}
                {/*    rules={{required: "This field is required"}}*/}
                {/*    render={({field: {value, onChange, ref}, fieldState: {error}}) => (<div>*/}
                {/*            <input*/}
                {/*                type="text"*/}
                {/*                value={value}*/}
                {/*                onChange={onChange}*/}
                {/*                ref={ref}*/}
                {/*            />*/}
                {/*            {error && <p>{error.message}</p>}*/}
                {/*        </div>)*/}
                {/*    }*/}
                {/*/>*/}

                <div className={styles.todoControls}>
                    <input className={styles.todoInput} type="text"
                           placeholder="Введите описание таска" {...register("todoInput", {
                        required: "This field is required",
                        minLength: {
                            value: 5,
                            message: "The minimum length is 5 characters"
                        }
                    })}/>
                    {errors.todoInput && <p>{errors.todoInput.message}</p>}
                    <button className={styles.btn} type="submit">Add Todo</button>
                </div>
                <ul>
                    {todos?.map(todo =>
                        <li key={todo.id}>
                            <input type="checkbox" checked={todo.isCompleted}
                                   onChange={() => handleToggle(todo.id)}/>
                            <p className={todo.isCompleted ? styles.complete : null}>{todo.title}</p>
                            <button className={styles.btn} onClick={() => handleDelete(todo.id)}>Delete</button>
                        </li>
                    )}
                </ul>

            </form>
        </div>
    )
}