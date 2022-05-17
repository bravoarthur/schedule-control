import { createContext, ReactNode, useState } from "react";
import { TypeArea } from "types/TypeArea";


type AreaListContextProps = {
    children: ReactNode;
}

interface AreaListProps {
    areaList: TypeArea
}

export const AreaContext = createContext({})

export const AreaProvider = ({children}: AreaListContextProps) => {

    const [areaList, setAreaList] = useState([
        "Avalon",
        "Manly",
        "Cromer",
        "New Port"
    ])

    
    return (
        <AreaContext.Provider value={areaList}>
            {children}
        </AreaContext.Provider>
    )

}
