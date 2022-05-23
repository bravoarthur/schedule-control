import { TypeClientsList } from "types/TypeClients";
import Link from 'next/link'
import Thead from "../Thead/Thead";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from "react";
import { ClientsContext } from "common/context/ClientsContext";
import styles from './Table.module.scss'

interface Props {
    children: TypeClientsList
}


function Table({children}: Props) {

    const list = children
    const {handleNewVisit, customInterval} = useContext(ClientsContext) 
    

    return ( 

        <table className={styles.generalTable}>

            <Thead/>
            <tbody>
                                
                {list.map(item => {

                    return (
                        <tr key={item.id} className={_handleSelectClass(item.lastVisit, item.interval, customInterval)}>

                            <td>
                                {item.name}
                            </td>

                            <td>
                                {item.lastVisit}
                            </td>

                            <td>
                                {item.interval}
                            </td>

                            <td>
                                {_handleNextVisit(item.lastVisit, item.interval)}
                                
                            </td>

                            <td>
                                {<CheckCircleIcon className={styles.btnToday} onClick={() =>handleNewVisit(item.name)}/>}
                                
                            </td>

                            <td>
                                {<input type='date' className={styles.datePickerInput} onChange={(event) => handleNewVisit(item.name, event.target.value)}/>}
                                
                            </td>

                            <td>
                                <Link href={`/edit/${item.id}`}>
                                    <EditIcon className={styles.btnToday}/>
                                </Link>
                                
                            </td>
                            

                        </tr>
                    )
                } )}

            </tbody>

        </table>


    );

}

export default Table;

function fixDate(lVisit: string) {
    const day = lVisit.slice(0, 2);
    const month = lVisit.slice(3, 5);
    const year = lVisit.slice(6, 10);
    const date = `${year}/${month}/${day}`;
    return date
}


function _handleNextVisit(lVisit: string, freq: number) {
    const date = fixDate(lVisit);

    const lastDate = new Date(date);
    lastDate.setDate(lastDate.getDate() + Number(freq));

    var dd = String(lastDate.getDate()).padStart(2, "0");
    var mm = String(lastDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = lastDate.getFullYear();
    var data = `${dd}/${mm}/${yyyy}`;

    return data;
}

function _handleClassDate(lastVisit, freq) {
    const date = fixDate(lastVisit);

    const convDate = new Date(date);
    convDate.setDate(convDate.getDate() + Number(freq));
    const today = new Date();

    const diff = today.getTime() - convDate.getTime(); // Subtrai uma data pela outra
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).

    if (days <= 0 && days >= -7) {
        return styles.week;
    } else if (days > 0) {
        return styles.late;
    } else if (days < -7) {
        return "";
    }
}


function _handleIntervalClass(lastVisit, freq, intervalSelec) {
    const date = fixDate(lastVisit)

    const convDate = new Date(date);
    convDate.setDate(convDate.getDate() + Number(freq));
    const today = new Date();

    const diff = today.getTime() - convDate.getTime(); 
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); 
    
    if (days < -intervalSelec) {
        return styles.hideItem;
    } else if (days >= 0) {
        return "";
    }
}

function _handleSelectClass(lastVisitDate, clientInterval, intervalSelector) {
    if (Number(intervalSelector) === 0) {
        return _handleClassDate(lastVisitDate, clientInterval);
    } else {
        return _handleIntervalClass(
            lastVisitDate,
            clientInterval,
            intervalSelector
        );
    }
}
