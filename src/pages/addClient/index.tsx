import { Box, Button, MenuItem, TextField } from "@mui/material";
import { AreaContext } from "common/context/AreaContext";
import { ClientsContext } from "common/context/ClientsContext";
import { useContext } from "react";
import { useState } from "react";
import NextLink from 'next/link';
import { useRouter } from "next/router";
import styles from './AddClient.module.scss'

function AddClient() {
    const { clientList, handleClient } = useContext(ClientsContext);
    const { areaList } = useContext(AreaContext)
    const router = useRouter()
 
    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [address, setAddress] = useState('');
    const [interval, setInterval] = useState<number>();
    const [date, setDate] = useState('');
    const visitList = [];
    const [notes, setNotes] = useState('');
    const [error, setError] = useState({isError: false, helperText: ''})

    const _handleClientValid = (event) => {
        const nameValid = event.target.value;

        const indexValid = clientList.findIndex(
            (item) => item.name === nameValid
        );
        if (indexValid >= 0) {
            setError({isError: true, helperText: 'This Client already exists'});
        } else {
            setError({isError: false, helperText: ''});
        }
    };

    return (
        <div className={styles.addContainer}>
            <h3>Add new Client</h3>

            <form className={styles.addForm}
                onSubmit={(event) => {
                    event.preventDefault();
                    if(error.isError) {
                        alert('Change the Client Name')
                        return
                    }
                    
                    handleClient({
                        name: name,
                        id: (`${(clientList.length + 1).toString()}${(Math.floor(Math.random() * 1000)).toString()}`),
                        area: area,
                        address: address,
                        interval: interval,
                        lastVisit: date,
                        visitList: visitList,
                        notes: notes
                    })
                    router.push('/')                    
                }}
            >
                <div className={styles.divInput}>
                    <TextField
                        variant="outlined"
                        select
                        label="Select Area"
                        value={area}
                        fullWidth
                        required
                        onChange={(event) => setArea(event.target.value)}
                    >
                        {areaList.map((item, index) => (
                            <MenuItem value={item} key={index}>
                                {item}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>

                <div className={styles.divInput} >
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="text" 
                        error={error.isError}
                        helperText={error.helperText}
                        label="Name"   
                        value={name}                      
                        required
                        onChange={(event) => setName(event.target.value)}
                        onBlur={_handleClientValid}
                    />
                </div>

                <div className={styles.divInput} >
                    <TextField
                        variant="outlined"
                        type="text"
                        fullWidth
                        label="Address"
                        value={address}
                        required
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </div>

                <div className={styles.divInput} > 
                    <TextField
                        type="number"
                        variant="outlined"
                        label="Frequency *"
                        inputProps={{ min: 0 }}
                        required
                        sx={{width: '30%'}}
                        value={interval ?? ''}
                        onChange={(event) => setInterval(Number(event.target.value))}
                    />
                

                
                    <TextField
                        variant="outlined"
                        type="date"
                        fullWidth
                        label='Last/First Visit'
                        InputLabelProps={{ shrink: true }}
                        required
                        sx={{width: '30%'}}
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                    />
                </div>

                <div className={styles.divInput} >
                    <TextField
                        variant="outlined"
                        type="text"
                        multiline
                        maxRows={4}
                        minRows={4}
                        fullWidth
                        value={notes}
                        label="Notes"
                        onChange={(event) => setNotes(event.target.value)}
                    />
                </div>

                <div className={styles.divInput}> 
                    <Button variant="contained" type="submit" sx={{borderRadius: '8px'}}>Add Client</Button>
                </div>
            </form>

            <div className={styles.buttonHome}>
                <NextLink href={'/'} passHref> 
                    <Button sx={{borderRadius: '8px', ":hover": {backgroundColor: 'rgb(128 173 217 / 14%)'}}} variant="outlined">Back home</Button>
                </NextLink> 
            </div>
        </div>
    )
}

export default AddClient;