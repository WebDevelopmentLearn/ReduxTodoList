import {useDispatch, useSelector} from "react-redux";
import {todoSlice} from "../../store/reducers/userSlice";
import {useEffect} from "react";
// import {getUsers} from "../../store/reducers/actionCreators";
import Loader from "../Loader/Loader";
import styles from "./Home.module.scss";

export const Home = () => {
    const dispatch = useDispatch();
    const {count, isLoading, error} = useSelector((state) => state.todoReducer);
    // const {increment} = todoSlice.actions;
    // useEffect(() => {
    //     dispatch(getUsers());
    // }, []);
    return (
        <div className={styles.Home}>
            <h1>Redux Toolkit</h1>
            <p>Count: {count}</p>
            {error && <p>{error}</p>}
            <div className={styles.usersList}>
                {isLoading && <Loader />}
            </div>
        </div>
    )
}