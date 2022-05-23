import { error } from "console";
import { useEffect } from "react";
import { createContext, ReactNode, useState } from "react";
import { TClient, TypeClientsList } from "types/TypeClients";

type ClientsContextProps = {
    children: ReactNode
}

interface ClientsListProps {
    clientList: TypeClientsList,
    handleNewVisit: (clientName: string, date?: string) => void,
    handleClient: (newClient: TClient) => void,
    deleteClient: (id: string) => void
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



    function _handleSave({info, data, list}) {

        fetch('/api/clients', {
            method: 'POST',
            body: JSON.stringify({[info]: data}),
        })
        .then(resp => resp.ok ? setClientList(list) : console.log(resp.json()))
        .catch( err => console.log(err)) 

    }
   
    const handleNewVisit = (clientName: string, date?: string) => {
        
        const newList = clientList.map(item => item)
        const index = newList.findIndex(
            item => item.name === clientName
        );
        newList[index].visitList.push(newList[index].lastVisit);
        const newDate = _handleNewDate(date ?? null);
        newList[index].lastVisit = newDate;
        _handleSave({info:'update', data: newList[index], list:newList})
    };

    function handleClient(newClient: TClient) {

        const indexExist = clientList.findIndex(item => item.id === newClient.id)
        
        if(indexExist < 0) {
            const newDate = _handleNewDate(newClient.lastVisit)
            newClient.lastVisit = newDate
            const newList = [...clientList, newClient]
            _handleSave({info: 'update', data: newClient, list: newList})            
            
        } else {

            const newList = clientList.map(item => item)
            newList[indexExist]= newClient
            _handleSave({info: 'update', data: newClient, list: newList})  
            
        }
    }
    
    function deleteClient(id: string) {

        const newList = clientList.filter(item => item.id !== id)
        _handleSave({info: 'delete', data: id, list: newList})

    }

    return (
        <ClientsContext.Provider value={{clientList, handleNewVisit, handleClient, deleteClient}}>
            {children}
        </ClientsContext.Provider>
    )
}  


function _handleNewDate(date?: string) {
    let lDate = undefined;

    if (date === null) {
        lDate = new Date();
        
    } else {
        lDate = new Date(date);
        
    }

    //lDate.setDate(lDate.getDate())

    const day = String(lDate.getDate()).padStart(2, "0");
    const month = String(lDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    const year = lDate.getFullYear();
    var newDate = `${day}/${month}/${year}`;

    return newDate;
}