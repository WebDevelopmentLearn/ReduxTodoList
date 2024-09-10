import {Route, Routes} from "react-router-dom";
import {TodoForm} from "../components/TodoForm/TodoForm";

export const MainRoute = () => <Routes>
    <Route element={<TodoForm/>} path="/"/>
</Routes>