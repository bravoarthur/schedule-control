import { error } from "console";
import { useEffect } from "react";
import { createContext, ReactNode, useState } from "react";
import { TypeClientsList } from "types/TypeClients";

type ClientsContextProps = {
    children: ReactNode
}

interface ClientsListProps {
    clientList: TypeClientsList,
    _handleNewVisit: (clientName: string, date?: string) => void
}

export const ClientsContext = createContext({} as ClientsListProps)

export const ClientsProvider = ({children}: ClientsContextProps) => {

    const [clientList, setClientList] = useState([])
    
    useEffect(() => {
        fetch('/api/clients')
        .then(async response => await response.json()
        )
        .then(data => setClientList(data.clients)
        ) 
    }, [])

   
    const _handleNewVisit = (clientName: string, date?: string) => {
        
        const newList = clientList.map(item => item)
        const index = newList.findIndex(
            item => item.name === clientName
        );
        newList[index].visitList.push(newList[index].lastVisit);
        const newDate = _handleNewDate(date ?? null);
        newList[index].lastVisit = newDate;

        fetch('/api/clients', {
            method: 'POST',
            body: JSON.stringify({update: newList[index]}),
        })
        .then(resp => resp.ok ? setClientList(newList) : console.log(resp.json()))
        .catch( err => console.log(err))

        
    };

    return (
        <ClientsContext.Provider value={{clientList, _handleNewVisit}}>
            {children}
        </ClientsContext.Provider>
    )
}  



function _handleNewDate(date?: string) {
    let lDate = undefined;

    if (date === null) {
        lDate = new Date();
        console.log('sem data fornecida')
    } else {
        lDate = new Date(date);
        console.log(date)
        console.log(lDate)
    }

    //lDate.setDate(lDate.getDate())

    const day = String(lDate.getDate()).padStart(2, "0");
    const month = String(lDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    const year = lDate.getFullYear();
    var newDate = `${day}/${month}/${year}`;

    return newDate;
}