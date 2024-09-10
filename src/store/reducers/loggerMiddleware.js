
export const loggerMiddleware = store => next => action => {
    console.log('Dispatching action:', action);
    const result = next(action);  // Передача действия дальше по цепочке
    console.log('Next state:', store.getState());
    return result;
};