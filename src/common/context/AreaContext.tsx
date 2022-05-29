import { createContext, ReactNode, useEffect, useState } from "react";
import { TypeArea } from "types/TypeArea";

type AreaListContextProps = {
    children: ReactNode;
};

interface AreaListProps {
    areaList: TypeArea;
    addArea: (newArea: string) => void;
    deleteArea: (area: string) => void;
    changeViewOrder: (area: string, position: string) => void;
}

export const AreaContext = createContext({} as AreaListProps);

export const AreaProvider = ({ children }: AreaListContextProps) => {
    const [areaList, setAreaList] = useState([]);

    useEffect(() => {
        fetch("/api/clients")
            .then(async (response) => await response.json())
            .then((data) => setAreaList(data.areas));
    }, []);

    function _handleSave({ info, data, list }) {
        fetch("/api/area", {
            method: "POST",
            body: JSON.stringify({ [info]: data })
        })
            .then((resp) =>
                resp.ok ? setAreaList(list) : console.log(resp.json())
            )
            .catch((err) => console.log(err));
    }

    function addArea(newArea: string) {
        const newList = [...areaList, newArea];
        _handleSave({ info: "includeArea", data: newArea, list: newList });
    }

    function deleteArea(area: string) {
        const newList = areaList.filter((item) => item !== area);
        _handleSave({ info: "deleteArea", data: area, list: newList });
    }

    function changeViewOrder(area: string, position: string) {
        const newAreaList = areaList.map((item) => item);
        const beforePosition = newAreaList.findIndex((item) => item === area);
        newAreaList.splice(
            Number(position) - 1,
            0,
            newAreaList.splice(beforePosition, 1)[0]
        );

        _handleSave({
            info: "viewOrder",
            data: newAreaList,
            list: newAreaList
        });
    }

    return (
        <AreaContext.Provider
            value={{ areaList, addArea, deleteArea, changeViewOrder }}
        >
            {children}
        </AreaContext.Provider>
    );
};
