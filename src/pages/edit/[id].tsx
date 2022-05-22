import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { TClient } from "types/TypeClients";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NextLink from 'next/link';
import clientsarea from '../api/clientsarea.json'
import { useState } from "react";
import { useContext } from "react";
import { AreaContext } from "common/context/AreaContext";
import { ClientsContext } from "common/context/ClientsContext";
import { Router } from "@mui/icons-material";
import { useRouter } from "next/router";

export async function getStaticPaths() {
        
    const paths = clientsarea.clients.map((item) => {
      return { params: { id: `${item.id}` } };
    })

   // console.log('dados:', clientsarea.clients);
    //console.log('paths:', paths);

    return {
      paths: paths,
      fallback: false // false or 'blocking'
    };
}


export async function getStaticProps(context) {
    //console.log('Contexto', context.params.id);
    const id = context.params.id; // da pagina que estamos

    const client = clientsarea.clients.find((currentClient) => {
      if(currentClient.id === id) {
        return true;
      }
      return false;
    })

  return {
    props: {
      name: client.name,
      id: client.id,
      area: client.area,
      address: client.address,
      interval: client.interval,
      lastVisit: client.lastVisit,
      visitList: client.visitList,
      notes: client.notes
    }, 
  }
}

function EditPage(props: TClient ) {
  
    const {name, area, address, interval, lastVisit, visitList, notes, id} = props
    const router = useRouter()

    const {areaList} = useContext(AreaContext)
    const {handleClient, deleteClient} = useContext(ClientsContext)

    const [editedName, setEditedName] = useState(name)
    const [editedArea, setEditedArea] = useState(area)
    const [editedAddress, setEditedAddress] = useState(address)
    const [editedInterval, setEditedInterval] = useState(interval)    
    const [editedVisitList, setEditedVisitList] = useState(visitList)
    const [editedNotes, setEditedNotes] = useState(notes)

    function _handleSaveClient() {

      handleClient({
        name: editedName,
        id: id,
        area: editedArea,
        address: editedAddress,
        interval: editedInterval,
        lastVisit: lastVisit,
        visitList: editedVisitList,
        notes: editedNotes})      
    }

    function _handleDeleteVisit(index) {

      let newVisitList = editedVisitList.map(item=>item)
      newVisitList.splice(index, 1)
      setEditedVisitList(newVisitList)
      
    }

    function _handleDeleteClient() {

      if(window.confirm("Are you Sure you want to Delete this Client?") === true) {
        deleteClient(id)
        router.push('/')
        

      } else {
        console.log('Deleting cancelled')
        return
      }

    }




    return ( 

        <>
            <Typography variant="h5"> Edit Client</Typography>
            
            <div style={{'display': 'flex'}}>

                <h3>Name</h3>
                    
                <TextField label='Name' value={editedName} onChange={(event) => setEditedName(event.target.value)}/>               

            </div>

            <div style={{'display': 'flex'}}>

                <h3>Area</h3>
                
                <TextField select label='Area' value={editedArea} onChange={(event) => setEditedArea(event.target.value)}>

                    {areaList.map(item => (                             
                      <MenuItem value={item} key={item}>
                          {item}
                      </MenuItem>
                    ))}
                </TextField>
                
            </div>

            <div style={{'display': 'flex'}}>

                <h3>Address</h3>
                
                <TextField label='Address' value={editedAddress} onChange={(event) => setEditedAddress(event.target.value)}/>

            </div>

            <div style={{'display': 'flex'}}>

                <h3>Frequency</h3>
                
                <TextField label='Frequency' type='number' value={editedInterval} inputProps={{ min: 0 }} onChange={(event) => setEditedInterval(Number(event.target.value))}/>

            </div>

            <div style={{'display': 'flex'}}>
                <h3>Last Visit: </h3>
                <h3>{lastVisit}</h3>                          
            </div>     


            <div>
                <h4>Notes</h4>
                <TextField type="text"
                    multiline
                    maxRows={4}
                    minRows={4}
                    fullWidth
                    label="Notes"
                    value={editedNotes}
                    onChange={(event) => setEditedNotes(event.target.value)} />
                  
            </div>


            <div>
                <Button onClick={_handleSaveClient}>Save Changes</Button>

                <NextLink passHref href='/'>
                  <Button>Home</Button>
                </NextLink> 

                <Button onClick={_handleDeleteClient}>Delete Client</Button>
            </div>

            <div>
                <Typography variant="h4">Visit List</Typography>

                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Delete Visit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {editedVisitList?.map((item,index) => {
                            return(
                                <tr key={index}>
                                    <td>{item}</td>
                                    <td><DeleteForeverIcon onClick={() => _handleDeleteVisit(index)}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        
        </>

    )
}

export default EditPage;

