import db from './clientsarea.json'


const fs = require('fs')
const path = require('path')
const dbPath = path.resolve( './src/pages/api/clientsarea.json') 

export default async function handlerArea (req, res) {

    if (req.method === 'POST' && JSON.parse(req.body).includeArea) {
       
       try {       
            console.log('AQUI INCLUDE')
            
            const newArea = JSON.parse(req.body).includeArea
            let data = JSON.parse(fs.readFileSync(dbPath, 'utf8' ))                      

            data.areas.push(newArea)
            fs.writeFileSync(dbPath, JSON.stringify(data))
            return res.status(200).json('New Area Adde')
     
        }

        catch (error) {
            console.log(error)
            return res.status(404).json({erro: 'Not possible add new Area'}) 
        }
       
    } else if (req.method === 'POST' && JSON.parse(req.body).deleteArea ) {
       
            try {       
                 console.log('AQUI POST DELETE AREA')
                 const deletedArea = JSON.parse(req.body).deleteArea
                 let data = JSON.parse(fs.readFileSync(dbPath, 'utf8' ))
                                  
                 const newAreaList = data.areas.filter(item => item !== deletedArea)
                 data.areas = newAreaList
                 fs.writeFileSync(dbPath, JSON.stringify(data))

                 return res.status(200).json('Delete Area succefully')     

            } catch (error) {
                console.log(error)
                return res.status(404).json({erro: 'Not possible Delete Area'}) 
            }
     
        } else if (req.method === 'POST' && JSON.parse(req.body).viewOrder ) {
       
            try {       
                console.log('AQUI POST VIEW ORDER')
                const viewList = JSON.parse(req.body).viewOrder
                let data = JSON.parse(fs.readFileSync(dbPath, 'utf8' ))
                      
                data.areas = viewList
                fs.writeFileSync(dbPath, JSON.stringify(data))

                return res.status(200).json('Delete Area succefully')     

            } catch (error) {
                console.log(error)
                return res.status(404).json({erro: 'Not possible Delete Area'}) 
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
