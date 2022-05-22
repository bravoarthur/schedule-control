import { Box, Button, MenuItem, TextField } from "@mui/material";
import { AreaContext } from "common/context/AreaContext";
import { ClientsContext } from "common/context/ClientsContext";
import { useContext } from "react";
import { useState } from "react";
import NextLink from 'next/link';
import { useRouter } from "next/router";

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
        <div>
            <h3>Add new Client</h3>

            <form
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
                <Box
                    sx={{
                        width: 300,
                        height: 80,
                        margin: "auto"
                    }}
                >
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
                </Box>

                <Box
                    sx={{
                        width: 300,
                        height: 80,
                        margin: "auto"
                    }}
                >
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
                </Box>

                <Box
                    sx={{
                        width: 300,
                        height: 80,
                        margin: "auto"
                    }}
                >
                    <TextField
                        variant="outlined"
                        type="text"
                        fullWidth
                        label="Address"
                        value={address}
                        required
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </Box>

                <Box
                    sx={{
                        width: 300,
                        height: 80,
                        margin: "auto"
                    }}
                > 
                    <input
                        type="number"
                        placeholder="Frequency *"
                        min="1"
                        required
                        value={interval ?? ''}
                        onChange={(event) => setInterval(Number(event.target.value))}
                    />
                </Box>

                <Box
                    sx={{
                        width: 300,
                        height: 80,
                        margin: "auto"
                    }}
                >
                    <TextField
                        variant="outlined"
                        type="date"
                        fullWidth
                        placeholder="dd-mm-yyyy"
                        required
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                    />
                </Box>

                <Box
                    sx={{
                        width: 300,
                        height: 120,
                        margin: "auto"
                    }}
                >
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
                </Box>

                <Box> 
                    <Button variant="outlined" type="submit">Add Client</Button>
                </Box>
            </form>

            <Box>
                <NextLink href={'/'} passHref> 
                    <Button>Back home</Button>
                </NextLink> 
            </Box>
        </div>
    )
}

export default AddClient;