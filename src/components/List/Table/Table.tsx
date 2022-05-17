import { TypeClientsList } from "types/TypeClients";
import Thead from "../Thead/Thead";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';

function Table(props: TypeClientsList) {
    

    return ( 

        <table>

            <Thead/>

            <body>
                
                {props.map(item => {

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

            </body>

        </table>


    );

}

export default Table;