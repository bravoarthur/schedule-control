import GeneralList from "components/List/GeneralList";
import styles from './Index.module.scss'

export default function Home() {
    return (
        <div  className={styles.home}>
            <GeneralList />
        </div>
    );
}
