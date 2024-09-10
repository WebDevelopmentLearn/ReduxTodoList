import {Route, Routes} from "react-router-dom";
import {Home} from "../components/Home/Home";
import {TodoForm} from "../components/TodoForm/TodoForm";

export const MainRoute = () => <Routes>
    <Route element={<TodoForm/>} path="/"/>
    {/*<Route element={<Contact/>} path="/contact"/>*/}
</Routes>