import DeleteForever from "@mui/icons-material/DeleteForever";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import { AreaContext } from "common/context/AreaContext";
import { ClientsContext } from "common/context/ClientsContext";
import { useContext, useState } from "react";
import NextLink from "next/link";
import style from "./EditArea.module.scss";


function EditAreas() {
    const { areaList, addArea, deleteArea, changeViewOrder } =
        useContext(AreaContext);
    const { clientList } = useContext(ClientsContext);

    const [newAreaInput, setNewAreaInput] = useState("");
    const [error, setError] = useState({ isError: false, helperText: "" });

    function _handleInput(value: string) {
        setNewAreaInput(value);
        const checkIfExists = areaList.find((area) => area === value);
        if (checkIfExists) {
            setError({ isError: true, helperText: "This Area Already Exists" });
        }
        if (!checkIfExists && error.isError)
            setError({ isError: false, helperText: "" });
    }

    function _handleAddArea() {
        if (!newAreaInput) {
            setError({ isError: true, helperText: "Error: Enter a new Area" });
            return;
        }
        addArea(newAreaInput);
        setNewAreaInput("");
    }

    function _handleDeleteArea(area: string) {
        const checkAreaInUse = clientList.filter((item) => item.area === area);
        if (checkAreaInUse.length > 0) {
            alert(
                `You still have clients ${checkAreaInUse.map(
                    (item) => item.name
                )} in This Area. Move or delete them Before Delete  ${area} Area`
            );
            return;
        }
        deleteArea(area);
    }

    function _handleViewOrder(value: string, item: string, input: any) {
        changeViewOrder(item, value);
        setTimeout(() => (document.activeElement as HTMLElement).blur(), 50);
    }

    return (
        <div className={style.areaContainer}>
            <h3>Edit or Add Areas</h3>
            <div className={style.addArea}>
                <TextField
                    className={style.textfield}
                    variant="outlined"
                    label="New Area"
                    sx={{ width: "40%" }}
                    error={error.isError}
                    helperText={error.helperText}
                    type="text"
                    value={newAreaInput}
                    onChange={(event) => _handleInput(event.target.value)}
                />

                <Button
                    className={style.btnAdd}
                    variant="contained"
                    disabled={error.isError ? true : false}
                    onClick={_handleAddArea}
                >
                    Add New area
                </Button>
            </div>

            <div className={style.position}>
                <table className={style.areaTable}>
                    <thead>
                        <tr>
                            <th className={style.tdCenterPosition}>Position</th>
                            <th className={style.name}>Name</th>
                            <th className={style.tdCenterPosition}>Delete</th>
                            <th>Change view Order</th>
                        </tr>
                    </thead>

                    <tbody>
                        {areaList.map((item, index) => {
                            return (
                                <tr key={item}>
                                    <td className={style.tdCenterPosition}>
                                        {" "}
                                        {index + 1}
                                    </td>
                                    <td> {item}</td>
                                    <td className={style.tdCenterPosition}>
                                        <DeleteForever
                                            className={style.btnDelete}
                                            onClick={() =>
                                                _handleDeleteArea(item)
                                            }
                                        >
                                            Delete Area
                                        </DeleteForever>
                                    </td>
                                    <td>
                                        <FormControl
                                            sx={{
                                                height: "30px",
                                                marginBottom: "15px",
                                                ".MuiInputLabel-shrink": {
                                                    transform:
                                                        "translate(14px, -2px) scale(0.75)"
                                                }
                                            }}
                                        >
                                            <InputLabel
                                                sx={{
                                                    height: "30px",
                                                    top: 2,
                                                    fontSize: "0.8em"
                                                }}
                                                id="label-select"
                                            >
                                                Position
                                            </InputLabel>

                                            <Select
                                                labelId="label-select"
                                                label="Position"
                                                value=""
                                                sx={{
                                                    width: "105px",
                                                    height: "40px",
                                                    fontSize: "15px",
                                                    top: 5
                                                }}
                                                onChange={(event) =>
                                                    _handleViewOrder(
                                                        event.target.value,
                                                        item,
                                                        event
                                                    )
                                                }
                                            >
                                                {areaList.map(
                                                    (it, listIndex) => (
                                                        <MenuItem
                                                            value={
                                                                listIndex + 1
                                                            }
                                                            key={it}
                                                        >
                                                            {listIndex + 1}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        </FormControl>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <NextLink href={"/"}>
                <Button
                    sx={{
                        ":hover": { backgroundColor: "rgb(128 173 217 / 14%)" }
                    }}
                    variant="outlined"
                    className={style.btnBackHome}
                >
                    Back Home
                </Button>
            </NextLink>
        </div>
    );
}

export default EditAreas;
