import { TypeClientsList } from "types/TypeClients";
import Thead from "../Thead/Thead";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from "react";
import { ClientsContext } from "common/context/ClientsContext";

interface Props {
    children: TypeClientsList
}


function Table({children}: Props) {

    const list = children
    const {_handleNewVisit} = useContext(ClientsContext) 
    

    return ( 

        <table>

            <Thead/>
            <tbody>
                                
                {list.map(item => {

                    return (
                        <tr key={item.id}>

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
                                {<CheckCircleIcon onClick={() =>_handleNewVisit(item.name)}/>}
                                
                            </td>

                            <td>
                                {<input type='date' onChange={(event) => _handleNewVisit(item.name, event.target.value)}/>}
                                
                            </td>

                            <td>
                                {<EditIcon/>}
                                
                            </td>

                        </tr>
                    )
                } )}

            </tbody>

        </table>


    );

}

export default Table;


function _handleNextVisit(lVisit: string, freq: number) {
    const day = lVisit.slice(0, 2);
    const month = lVisit.slice(3, 5);
    const year = lVisit.slice(6, 10);

    const date = `${year}/${month}/${day}`;

    const lastDate = new Date(date);
    lastDate.setDate(lastDate.getDate() + Number(freq));

    var dd = String(lastDate.getDate()).padStart(2, "0");
    var mm = String(lastDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = lastDate.getFullYear();
    var data = `${dd}/${mm}/${yyyy}`;

    return data;
}