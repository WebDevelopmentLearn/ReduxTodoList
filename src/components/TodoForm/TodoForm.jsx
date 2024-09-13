
import styles from "./TodoForm.module.scss";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {addTodo, removeTodo, toggleTodo} from "../../store/reducers/userSlice";
import {useContext, useEffect, useState} from "react";
import {LangContext} from "../../contexts/LangContext";


export const TodoForm = () => {
    const [sortBy, setSortBy] = useState("");
    const {lang} = useContext(LangContext);
    const {register, handleSubmit, reset, control, formState: {errors}} = useForm();
    const todos = useSelector(state => state.todoReducer.todos);
    const dispatch = useDispatch();

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let totalPrice = todos.reduce((acc, todo) => acc + Number(todo.price), 0);
        //округляем до 2 знаков после запятой
        totalPrice = Math.round(totalPrice * 100) / 100;
        
        setTotalPrice(totalPrice);
    }, [todos]);

    const sortTodos = (todos, sortBy) => {
        if (sortBy === "title") {
            return [...todos].sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === "shop") {
            return [...todos].sort((a, b) => a.shop.localeCompare(b.shop));
        } else if (sortBy === "price") {
            return [...todos].sort((a, b) => Number(a.price) - Number(b.price));
        }
        return todos; // Если сортировка не выбрана, возвращаем оригинальный список
    };

    const onSubmit = (data) => {
        // console.log(data.todoInput);
        const id = Math.floor(Math.random() * 1000) + 1;
        dispatch(addTodo(
            {
                id: id,
                title: data.todoInput,
                price: data.todoPrice,
                shop: data.shop,
                isCompleted: false
            }));
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
                                value: 1,
                                message: `${lang === "ru" ? "Минимальная длина 1 символов" : "Minimum length is 1 characters"}`
                            }
                        })}/>
                        <input className={styles.todoInput} type="text"
                               placeholder="Введите цену" {...register("todoPrice", {
                            required: "This field is required",
                            minLength: {
                                value: 1,
                                message: `${lang === "ru" ? "Минимальная длина 1 символов" : "Minimum length is 1 characters"}`
                            }
                        })}/>
                        <select
                            {...register("shop", {
                                required: `${lang === "ru" ? "Пожалуйста, выберите магазин" : "Please select a shop"}`
                            })}
                            onChange={(event) => {
                                console.log(event.target.value)
                            }} name="shop" id="shop">
                            <option value="REWE">Rewe</option>
                            <option value="Aldi">Aldi</option>
                            <option value="Edeka">Edeka</option>
                            <option value="Lidl">Lidl</option>
                        </select>
                        <button className={`${styles.btn} ${styles.addTodoBtn}`}
                                type="submit">{lang === "ru" ? "Добавить таск" : "Add todo"}</button>
                    </div>
                    {errors.todoInput &&
                        <p style={{color: "#b92a2a", fontWeight: "600"}}>{errors.todoInput.message}</p>}

                </div>
                {todos.length === 0 && <p>{lang === "ru" ? "Список пуст" : "List is empty"}</p>}
                {todos.length > 0 && (
                    <div className={styles.sortControls}>
                        <label htmlFor="sort">Сортировать по:</label>
                        <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="">-- Выберите --</option>
                            <option value="title">{lang === "ru" ? "Имя таска" : "Task Name"}</option>
                            <option value="shop">{lang === "ru" ? "Магазин" : "Shop"}</option>
                            <option value="price">{lang === "ru" ? "Цена" : "Price"}</option>
                        </select>
                    </div>
                )}
                {/*<ul>*/}
                {/*    {todos?.map(todo =>*/}
                {/*        <li key={todo.id}>*/}
                {/*            <input type="checkbox" checked={todo.isCompleted}*/}
                {/*                   onChange={() => handleToggle(todo.id)}/>*/}
                {/*            <p className={todo.isCompleted ? styles.complete : null}>{todo.title}</p>*/}
                {/*            <p>Shop: {todo.shop}</p>*/}
                {/*            <button className={styles.btn} onClick={() => handleDelete(todo.id)}>{lang === "ru" ? "Удалить" : "Delete"}</button>*/}
                {/*        </li>*/}
                {/*    )}*/}
                {/*</ul>*/}
                <ul>
                    {sortTodos(todos, sortBy)?.map(todo =>
                        <li key={todo.id}>
                            <input type="checkbox" checked={todo.isCompleted}
                                   onChange={() => handleToggle(todo.id)}/>
                            <p className={todo.isCompleted ? styles.complete : null}>{todo.title}</p>
                            <p>Shop: {todo.shop}</p>
                            <p>Price: {todo.price}</p>
                            <button className={styles.btn} onClick={() => handleDelete(todo.id)}>
                                {lang === "ru" ? "Удалить" : "Delete"}
                            </button>
                        </li>
                    )}
                </ul>

                <p>Итоговая цена: {totalPrice}</p>


            </form>
        </div>
    )
}