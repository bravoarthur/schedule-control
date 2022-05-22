import db from './clientsarea.json'


const fs = require('fs')
const path = require('path')
const dbPath = path.resolve( './src/pages/api/clientsarea.json') 

export default async function handler (req, res) {

    if (req.method === 'POST' && JSON.parse(req.body).update) {
       
       try {       
            console.log('AQUI METODO POST')
            
            const clientUpdate = JSON.parse(req.body).update
                       
            let data = JSON.parse(fs.readFileSync(dbPath, 'utf8' ))
            
            const index = data.clients.findIndex(item => item.id === clientUpdate.id)

            if(index >= 0) {
                data.clients[index] = clientUpdate
                fs.writeFileSync(dbPath, JSON.stringify(data))
                return res.status(200).json('Updated succefully')

            }else {
                data.clients.push(clientUpdate) 
                fs.writeFileSync(dbPath, JSON.stringify(data))
                return res.status(200).json('Added Succefully')
            }
                
        }

        catch (error) {
            console.log(error)
            return res.status(404).json({erro: 'Not possible add new Client'}) 
        }
       
    } else if (req.method === 'POST' && JSON.parse(req.body).delete ) {
       
            try {       
                 console.log('AQUI METODO POST DELETE')
                 const id = JSON.parse(req.body).delete
                 let data = JSON.parse(fs.readFileSync(dbPath, 'utf8' ))
                                  
                 const newList = data.clients.filter(item => item.id !== id)
                 data.clients = newList
                 fs.writeFileSync(dbPath, JSON.stringify(data))

                 return res.status(200).json('Delete succefully')     

            } catch (error) {
                console.log(error)
                return res.status(404).json({erro: 'Not possible Delete'}) 
            }
     
        }
        
    else {

        try {

            return res.status(200).json(db)

        }
        catch {

            return res.status(404).json({erro: 'Not Possible check client List'})

        }

    }
    
}
