
export const localStorageMiddleware = store => next => action => {
    const result = next(action); // передаем действие дальше

    // Проверяем, нужно ли сохранить данные в LocalStorage
    console.log(store.getState());
    const { todoReducer } = store.getState(); // получаем текущее состояние списка задач
    console.log('todos', todoReducer);
    console.log('todos.todos', todoReducer.todos);

    localStorage.setItem('todos', JSON.stringify(todoReducer.todos)); // сохраняем в LocalStorage

    return result;
};