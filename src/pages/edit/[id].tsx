import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { TClient } from "types/TypeClients";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import NextLink from "next/link";
import clientsarea from "../api/clientsarea.json";
import { useState } from "react";
import { useContext } from "react";
import { AreaContext } from "common/context/AreaContext";
import { ClientsContext } from "common/context/ClientsContext";
import { useRouter } from "next/router";
import style from "./EditPage.module.scss";

export async function getStaticPaths() {
    const paths = clientsarea.clients.map((item) => {
        return { params: { id: `${item.id}` } };
    });

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
        if (currentClient.id === id) {
            return true;
        }
        return false;
    });

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
        }
    };
}

function EditPage(props: TClient) {
    const { name, area, address, interval, lastVisit, visitList, notes, id } =
        props;
    const router = useRouter();

    const { areaList } = useContext(AreaContext);
    const { handleClient, deleteClient } = useContext(ClientsContext);

    const [editedName, setEditedName] = useState(name);
    const [editedArea, setEditedArea] = useState(area);
    const [editedAddress, setEditedAddress] = useState(address);
    const [editedInterval, setEditedInterval] = useState(interval);
    const [editedVisitList, setEditedVisitList] = useState(visitList);
    const [editedNotes, setEditedNotes] = useState(notes);

    function _handleSaveClient() {
        handleClient({
            name: editedName,
            id: id,
            area: editedArea,
            address: editedAddress,
            interval: editedInterval,
            lastVisit: lastVisit,
            visitList: editedVisitList,
            notes: editedNotes
        });
    }

    function _handleDeleteVisit(index) {
        let newVisitList = editedVisitList.map((item) => item);
        newVisitList.splice(index, 1);
        setEditedVisitList(newVisitList);
    }

    function _handleDeleteClient() {
        if (
            window.confirm("Are you Sure you want to Delete this Client?") ===
            true
        ) {
            deleteClient(id);
            router.push("/");
        } else {
            console.log("Deleting cancelled");
            return;
        }
    }

    return (
        <div className={style.editContainer}>
            <h3> Edit Client</h3>

            <div className={style.divInput}>
                <h4>Name:</h4>

                <TextField
                    label="Name"
                    sx={{ width: "60%" }}
                    value={editedName}
                    onChange={(event) => setEditedName(event.target.value)}
                />
            </div>

            <div className={style.divInput}>
                <h4>Area:</h4>

                <TextField
                    select
                    sx={{ width: "60%" }}
                    label="Area"
                    value={editedArea}
                    onChange={(event) => setEditedArea(event.target.value)}
                >
                    {areaList.map((item) => (
                        <MenuItem value={item} key={item}>
                            {item}
                        </MenuItem>
                    ))}
                </TextField>
            </div>

            <div className={style.divInput}>
                <h4>Address:</h4>

                <TextField
                    label="Address"
                    sx={{ width: "60%" }}
                    value={editedAddress}
                    onChange={(event) => setEditedAddress(event.target.value)}
                />
            </div>

            <div className={style.divInput}>
                <h4>Frequency:</h4>

                <TextField
                    label="Frequency"
                    sx={{ width: "60%" }}
                    type="number"
                    value={editedInterval}
                    inputProps={{ min: 0 }}
                    onChange={(event) =>
                        setEditedInterval(Number(event.target.value))
                    }
                />
            </div>

            <div className={style.divLastVisit}>
                <h4>Last Visit: </h4>
                <h4 className={style.h4LastVisit}>{lastVisit}</h4>
            </div>

            <div className={style.divNotes}>
                <h4>Notes</h4>
                <TextField
                    type="text"
                    multiline
                    maxRows={4}
                    minRows={4}
                    fullWidth
                    label="Notes"
                    value={editedNotes}
                    onChange={(event) => setEditedNotes(event.target.value)}
                />
            </div>

            <div className={style.divButton}>
                <Button
                    variant="contained"
                    className={style.btn}
                    sx={{ borderRadius: "7px" }}
                    onClick={_handleSaveClient}
                >
                    Save Changes
                </Button>

                <NextLink passHref href="/">
                    <Button
                        variant="outlined"
                        className={style.btn}
                        sx={{
                            borderRadius: "8px",
                            ":hover": {
                                backgroundColor: "rgb(128 173 217 / 14%)"
                            }
                        }}
                    >
                        Home
                    </Button>
                </NextLink>

                <Button
                    className={style.btn}
                    sx={{ backgroundColor: "#f50057", borderRadius: "7px" }}
                    variant="contained"
                    color="error"
                    onClick={_handleDeleteClient}
                >
                    Delete Client
                </Button>
            </div>

            <div>
                <h3>Visit List</h3>

                <table className={style.visitTable}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Delete Visit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {editedVisitList?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item}</td>
                                    <td>
                                        <DeleteForeverIcon
                                            className={style.btnDelete}
                                            onClick={() =>
                                                _handleDeleteVisit(index)
                                            }
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EditPage;
