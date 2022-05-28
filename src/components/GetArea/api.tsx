import Geocode from "react-geocode";


Geocode.setApiKey("AIzaSyAFu3QwXb8Tw1yM2mgRe8K0LdjeA2EAjXo");
Geocode.setLanguage("en");

Geocode.setRegion("au");

Geocode.setLocationType("ROOFTOP");


async function addressAPI(address) {
      
      return await Geocode.fromAddress(address).then(
        (response) => {                      
          const { lat, lng } = response.results[0].geometry.location;
          return {lat: lat, lng: lng};
        },
        (error) => {
          console.error(error);
          return ''
        }
      );
}

export default addressAPI;

