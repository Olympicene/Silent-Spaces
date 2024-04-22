import { useEffect, useState } from "react";

function Location({onLocationChange}) {
    const [userLocation, setUserLocation] = useState({
        lat : 0,
        long : 0
    })
    
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    var crd = pos.coords;
    // console.log("Your current position is:");
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    setUserLocation({
        lat: crd.latitude,
        long:crd.longitude
    })
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          //console.log(result);
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
            onLocationChange(userLocation)
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [userLocation]);

  return <div></div>;
}

export default Location;