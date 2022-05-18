import { TypeClientsList } from "types/TypeClients";
import Thead from "../Thead/Thead";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
    children: TypeClientsList
}


function Table({children}: Props) {

    const list = children
    

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
                                {item.interval}
                                
                            </td>

                            <td>
                                {<CheckCircleIcon/>}
                                
                            </td>

                            <td>
                                {<input type='date'/>}
                                
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