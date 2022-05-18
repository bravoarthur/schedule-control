import { Container } from "@mui/system";
import { AreaContext } from "common/context/AreaContext";
import { ClientsContext } from "common/context/ClientsContext";
import { useContext } from "react";
import Table from "../Table/Table";


function GeneralList() {

    const {areaList} = useContext(AreaContext)
    const {clientList} = useContext(ClientsContext)



    return ( 

        <Container>
            {areaList.map(item => {
                const areaClients = clientList.filter(client => client.area === item)
                
                return(

                    <div key={item}>
                        <h4>{item}</h4>

                        <Table>

                            {areaClients}

                        </Table>
                        

                    </div>
                )

            })}
        </Container>

    );
}

export default GeneralList;
