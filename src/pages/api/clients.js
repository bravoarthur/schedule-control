import db from './clientsarea.json'


const fs = require('fs')
const path = require('path')
const dbPath = path.resolve( './src/pages/api/clientsarea.json') 

export default async function handler (req, res) {

    if (req.method === 'POST') {

       try {       
            console.log('AQUI METODO POST')
            
            const clientUpdate = JSON.parse(req.body).update
                       
            let data = JSON.parse(fs.readFileSync(dbPath, 'utf8' ))
            
            const index = data.clients.findIndex(item => item.id === clientUpdate.id)
            data.clients[index] = clientUpdate
            fs.writeFileSync(dbPath, JSON.stringify(data))
            return res.status(200).json('Adicionado com Sucesso')
                
            }

            catch (error) {
                console.log(error)
                return res.status(404).json({erro: 'Not possible add new Client'}) 
            }
       
    } else {

        try {

            return res.status(200).json(db)

        }
        catch {

            return res.status(404).json({erro: 'Not Possible check client List'})

        }

    }
    
}


/*const data = {clients: [
    {
        name: "Miller",
        id: '0',
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
        id: '1',
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
        id: '2',
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
        id: '3',
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
        id: '4',
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
        id: '5',
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
        id: '6',
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
        id: '7',
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
        id: '8',
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
        id: '9',
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
        id: '10',
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
        id: '11',
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
        id: '12',
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
        id: '13',
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
], areas: [
    "Avalon",
    "Manly",
    "Cromer",
    "New Port"
]}*/