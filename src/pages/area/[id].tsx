import { memo, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import addressAPI from '../../components/GetArea/api'
import clientsarea from '../api/clientsarea.json'
import { useEffect } from 'react';
import { TypeClientsList } from 'types/TypeClients';
import style from './Area.module.scss'
import { Button } from '@mui/material';
import Link from 'next/link';

export async function getStaticPaths() {
        
    const paths = clientsarea.areas.map((item) => {
      return { params: { id: `${item}` } };
    })   
    return {
      paths: paths,
      fallback: false
    };
}


export async function getStaticProps(context) {
    
    const id = context.params.id;  
    const list = clientsarea.clients.filter(item => item.area === id)   

  return {
    props: {
      area: id,
      list: list     
    }
  }
}


const containerStyle = {
  width: '80%',
  height: '100%',
  'margin-bottom': '50px',
};

const center = {
  lat: -33.879,
  lng: 151.068
};


function Area(props: {area: string, list: TypeClientsList }) {

  
  const area = props.area  
  const list = props.list
  
    const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBq_6yu6aPmLIUuKUmaYcOEbgs-z6vHxHs'
    })
  //AIzaSyAFu3QwXb8Tw1yM2mgRe8K0LdjeA2EAjXo
   
    const [geocodedList, setGeocodedList] = useState([])
    const [center, setCenter] = useState({
      lat: -33.879,
      lng: 151.068
    })
        
    function getGeo(list) {
      
        
        Promise.all(list.map((item, index) =>  addressAPI(`${item.address} ${area}`).then(resp => list[index].address = resp)
        ))
        .then((resp) => {            
            setGeocodedList(list)})
        .catch(error => console.log(error))        
    }
    
    function getCenter (centerArea) {
      addressAPI(`${centerArea} NSW`)
      .then(resp => setCenter(resp))

    }


    useEffect(() => {                 
        getGeo(list)
        getCenter(area)
    },[list, area])
    

  return isLoaded ? (

    <div className={style.divMap}>
      <h3 className={style.mapTitle}>Clients in the Area</h3>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}        
      >
          {geocodedList.map(item => {

              return <Marker key={item.id} position={{lat: item.address.lat , lng: item.address.lng}} options={{label: {text: item.name, fontSize: '25px', fontWeight: '700', color: 'darkred', className: style.pin}}}></Marker>
          })}
        
      </GoogleMap>
      <div>
        <Link href={'/'}>        
          <Button variant='outlined' sx={{width: '100px', height: '40px', borderRadius: '8px', ":hover": {backgroundColor: 'rgb(128 173 217 / 14%)'}}}>Home</Button>
        </Link>
      </div>


    </div>
  ) : <></>
}

export default memo(Area)