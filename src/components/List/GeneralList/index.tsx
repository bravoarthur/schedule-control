import { Button } from "@mui/material";
import Link from "next/link";
import { AreaContext } from "common/context/AreaContext";
import { ClientsContext } from "common/context/ClientsContext";
import { useContext } from "react";
import Table from "../Table";
import styles from "./GeneralList.module.scss";

function GeneralList() {
    const { areaList } = useContext(AreaContext);
    const { clientList, setCustomInterval } = useContext(ClientsContext);

    return (
        <div className={styles.container}>
            <div className={styles.btnInputDiv}>
                <div className={styles.btnDiv}>
                    <Link href={"addClient"}>
                        <Button
                            className={styles.btn}
                            color="primary"
                            sx={{
                                borderRadius: "6px",
                                ":hover": {
                                    backgroundColor: "rgb(128 173 217 / 14%)"
                                }
                            }}
                            variant="outlined"
                        >
                            Add Client
                        </Button>
                    </Link>
                    <Link href={"editArea"}>
                        <Button
                            className={styles.btn}
                            variant="outlined"
                            sx={{
                                borderRadius: "6px",
                                ":hover": {
                                    backgroundColor: "rgb(128 173 217 / 14%)"
                                }
                            }}
                        >
                            Edit Area
                        </Button>
                    </Link>
                </div>

                <label className={styles.labelInterval}>
                    {" "}
                    Select Custom Interval
                    <input
                        type="number"
                        min={0}
                        defaultValue="0"
                        className={styles.inputInterval}
                        onChange={(event) =>
                            setCustomInterval(Number(event.target.value))
                        }
                    />
                </label>
            </div>

            {areaList.map((item) => {
                const areaClients = clientList.filter(
                    (client) => client.area === item
                );

                return (
                    <div key={item}>
                        <Link href={`area/${item}`}>
                            <h4 className={styles.areaTittle}>{item}</h4>
                        </Link>

                        <Table>{areaClients}</Table>
                    </div>
                );
            })}
        </div>
    );
}

export default GeneralList;
