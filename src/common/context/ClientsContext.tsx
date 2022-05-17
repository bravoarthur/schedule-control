import { createContext, ReactNode, useState } from "react";

type ClientsContextProps = {
    children: ReactNode
}

export const ClientsContext = createContext({})

export const ClientsProvider = ({children}: ClientsContextProps) => {

    const [ClientsList, setClientsList] = useState([
        {
            name: "Miller",
            area: "Avalon",
            address: "11 telegraph",
            interval: 30,
            lastVisit: "05/08/2021",
            visitList: [
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021"
            ],
            notes: "Every friday"
        },
        {
            name: "Karen",
            area: "Avalon",
            address: "11 telegraph",
            interval: 30,
            lastVisit: "05/08/2021",
            visitList: [
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021"
            ],
            notes: "Every friday"
        },
        {
            name: "Jason",
            area: "Avalon",
            address: "11 telegraph",
            interval: 30,
            lastVisit: "05/08/2021",
            visitList: [
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021"
            ],
            notes: "Every friday"
        },
        {
            name: "James",
            area: "Avalon",
            address: "11 telegraph",
            interval: 30,
            lastVisit: "05/08/2021",
            visitList: [
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021"
            ],
            notes: "Every friday"
        },
        {
            name: "Carol",
            area: "Manly",
            address: "14 warringah",
            interval: 15,
            lastVisit: "05/08/2021",
            visitList: [
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021"
            ],
            notes: "Once a Month - Budget $400"
        },
        {
            name: "Mary",
            area: "Manly",
            address: "14 warringah",
            interval: 15,
            lastVisit: "05/08/2021",
            visitList: [
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021"
            ],
            notes: "Once a Month - Budget $400"
        },
        {
            name: "Tony",
            area: "Manly",
            address: "14 warringah",
            interval: 15,
            lastVisit: "05/08/2021",
            visitList: [
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021"
            ],
            notes: "Once a Month - Budget $400"
        },
        {
            name: "Isaac",
            area: "Manly",
            address: "14 warringah",
            interval: 15,
            lastVisit: "05/08/2021",
            visitList: [
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021"
            ],
            notes: "Once a Month - Budget $400"
        },
        {
            name: "Sally",
            area: "Cromer",
            address: "145 Terry",
            interval: 45,
            lastVisit: "05/08/2021",
            visitList: [
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021"
            ],
            notes: "Every friday"
        },
        {
            name: "Cesare",
            area: "Cromer",
            address: "30 Victor rd",
            interval: 15,
            lastVisit: "05/09/2021",
            visitList: [
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021"
            ],
            notes: "Every friday"
        },
        {
            name: "7 howard st",
            area: "New Port",
            address: "14 warringah",
            interval: 15,
            lastVisit: "05/08/2021",
            visitList: [
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021"
            ],
            notes: "Once a Month - Budget $400"
        },
        {
            name: "Geoff",
            area: "New Port",
            address: "14 warringah",
            interval: 15,
            lastVisit: "05/08/2021",
            visitList: [
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021"
            ],
            notes: "Once a Month - Budget $400"
        },
        {
            name: "Ken",
            area: "New Port",
            address: "14 warringah",
            interval: 15,
            lastVisit: "05/08/2021",
            visitList: [
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021"
            ],
            notes: "Once a Month - Budget $400"
        },
        {
            name: "Peter",
            area: "Manly",
            address: "12 Richmond",
            interval: 14,
            lastVisit: "05/10/2021",
            visitList: [
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021",
                "05/10/2021"
            ],
            notes: "Every friday"
        }
    ])


    return (
        <ClientsContext.Provider value={ClientsList}>
            {children}
        </ClientsContext.Provider>
    )
}  