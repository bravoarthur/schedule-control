import DeleteForever from "@mui/icons-material/DeleteForever";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { AreaContext } from "common/context/AreaContext";
import { ClientsContext } from "common/context/ClientsContext";
import { useContext, useState } from "react";
import NextLink from 'next/link'

function EditAreas() {

    const {areaList, addArea, deleteArea, changeViewOrder} = useContext(AreaContext)    
    const {clientList} = useContext(ClientsContext)
    
   
    const [newAreaInput, setNewAreaInput] = useState('')
    const [error, setError] = useState({isError: false, helperText: ''})
   
    function _handleInput(value: string) {

        setNewAreaInput(value)
        const checkIfExists = areaList.find(area=> area===value)
        if(checkIfExists) {            
            setError({isError: true, helperText: 'This Area Already Exists'})
        } 
        if(!checkIfExists && error.isError) setError({isError: false, helperText: ''})
            
    }

    function _handleAddArea() {

        if (!newAreaInput) {
            setError({isError: true, helperText: 'Error: Enter a new Area'})
            return
        }
        addArea(newAreaInput)
        setNewAreaInput('')
    }

    function _handleDeleteArea(area: string) {

        const checkAreaInUse = clientList.filter(item => item.area === area)        
        if(checkAreaInUse.length > 0) {
            alert(`You still have clients ${checkAreaInUse.map(item => item.name)} in This Area. Move or delete them Before Delete  ${area} Area`)
            return
        }
        deleteArea(area)
        
    }

    function _handleViewOrder(value: string, item: string, input: any) {                 
        changeViewOrder(item, value) 
        setTimeout(() => (
            (document.activeElement as HTMLElement).blur()
            ), 50)   
    }

    return (

        <div>
            <div>
                <TextField
                    variant="outlined"
                    label="New Area"
                    error={error.isError}
                    helperText={error.helperText}
                    type="text" 
                    value={newAreaInput}
                    onChange={(event) => _handleInput(event.target.value)}                  
                />
                <button disabled={error.isError ? true : false} onClick={_handleAddArea}>Include New area</button>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th className="tdPosition">Position</th>
                            <th>Name</th>
                            <th>Delete</th>
                            <th>Change view Order</th>
                        </tr>
                    </thead>

                    <tbody>
                        {areaList.map((item, index) => {
                            return (
                                <tr key={item} className="trArea">
                                    <td className="tdPosition"> {index + 1}</td>
                                    <td> {item}</td>
                                    <td>
                                        <DeleteForever
                                         onClick={()=> _handleDeleteArea(item)}  
                                        >
                                            Delete Area
                                        </DeleteForever>
                                    </td>
                                    <td>
                                        <FormControl fullWidth>
                                            <InputLabel id="label-select">Position</InputLabel>

                                            <Select     
                                            labelId="label-select" label='Position' fullWidth value=''             
                                            onChange={(event) => _handleViewOrder(event.target.value, item, event)}>

                                                {areaList.map((it, listIndex) => (                            
                                                    <MenuItem value={listIndex+1} key={it}>
                                                        {listIndex+1}
                                                    </MenuItem>
                                                ))}
                                                
                                            </Select>
                                        </FormControl>
                                        
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <NextLink href={'/'}>
                <button className="btnBackHome">
                    Back Home
                </button>
            </NextLink>          
        </div>
    );
}

export default EditAreas;