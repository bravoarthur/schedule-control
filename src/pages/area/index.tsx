import { memo, useContext, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import addressAPI from '../../components/GetArea/api'
import { ClientsContext } from "common/context/ClientsContext";
import { useEffect } from 'react';














































const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -33.879,
  lng: 151.068
};


function Area() {

    const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBq_6yu6aPmLIUuKUmaYcOEbgs-z6vHxHs'
    })
  //AIzaSyAFu3QwXb8Tw1yM2mgRe8K0LdjeA2EAjXo

    const {clientList} = useContext(ClientsContext)
    const [geocodedList, setGeocodedList] = useState([])
    
    function getGeo(list) {

        const areaList = list.filter(item => item.area === 'New Port') 

        Promise.all(areaList.map((item, index) =>  addressAPI(item.address).then(resp => areaList[index].address = resp)
        ))
        .then((resp) => {
            console.log(areaList)
            setGeocodedList(areaList)})
        .catch(error => console.log(error))        
    }    


    useEffect(() => {                 
        getGeo(clientList)
    },[clientList])
    

  return isLoaded ? (

    <div>
    <h3> Clients Map</h3>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}        
      >
          {geocodedList.map(item => {

              return <Marker key={item.id} position={{lat: item.address.lat , lng: item.address.lng}} options={{label: {text: item.name}}}></Marker>
          })}
        
      </GoogleMap>
    </div>
  ) : <></>
}

export default memo(Area)