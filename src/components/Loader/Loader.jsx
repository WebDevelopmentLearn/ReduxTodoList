
import styles from "./Loader.module.css";

function Loader() {
    return (
        <div className={styles.LoaderContainer}>
            <h3>Загрузка...</h3>
            <div className={styles.container}>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
            </div>
        </div>

    )
}

export default Loader;