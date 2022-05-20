import { createContext, ReactNode, useEffect, useState } from "react";
import { TypeArea } from "types/TypeArea";


type AreaListContextProps = {
    children: ReactNode;
}

interface AreaListProps {
    areaList: TypeArea
}

export const AreaContext = createContext({} as AreaListProps)

export const AreaProvider = ({children}: AreaListContextProps) => {

    const [areaList, setAreaList] = useState([])

    useEffect(() => {
        fetch('/api/clients')
        .then(async response => await response.json()
        )
        .then(data =>         
        setAreaList(data.areas)
        ) 
    }, [])

    
    return (
        <AreaContext.Provider value={{areaList}}>
            {children}
        </AreaContext.Provider>
    )

}
