import styles from './Thead.module.scss'

function Thead() {


    return ( 

        <thead>
                <tr className={styles.trHead}>
                    <th>Client</th>
                    <th>Last Visit</th>
                    <th>Frequency</th>
                    <th>Next Visit</th>
                    <th>Include Visit Today</th>
                    <th>Include Selected Date</th>
                    <th>More Info / Edit</th>
                </tr>
        </thead>

    );
}

export default Thead;