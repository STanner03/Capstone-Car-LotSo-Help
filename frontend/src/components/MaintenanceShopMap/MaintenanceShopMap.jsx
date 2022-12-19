import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  Autocomplete,
} from "@react-google-maps/api";
import { REACT_APP_GOOGLE_MAPS_API_KEY } from "../../utils/API_KEY.js";

import "@reach/combobox/styles.css";

const libraries=["places"]


const MaintenanceShopMap = ({
  address,
  setAddress,
  coordinates,
  setCoordinates,
}) => {
  // State Variables:
  const [selected, setSelected] = useState({});
  const [locations, setLocations] = useState([]);
  const [autocomplete, setAutoComplete] = useState(null);
//   const onSelect = (item) => {
//     setSelected(item);
//   };

//   const defaultCenter = {
//     lat: 41.3851,
//     lng: 2.1734,
//   };
  function onLoad(autocomplete) {
    console.log("autocomplete: ", autocomplete);

    setAutoComplete(autocomplete);
  }

  function onPlaceChanged() {
    if (autocomplete !== null) {
      let temp = autocomplete.getPlace();
      console.log(temp);
      console.log("lat", temp.geometry.location.lat());
      console.log("lng", temp.geometry.location.lng());
      setCoordinates({
        lat: temp.geometry.location.lat(),
        lng: temp.geometry.location.lng(),
      });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  const onError = (status, clearSuggestions) => {
    console.log("Google Maps API returned error with status: ", status);
    clearSuggestions();
  };

  console.log("coordinates", coordinates);
  console.log("address", address);
  return (
    <div>
      <LoadScript
        googleMapsApiKey={REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <GoogleMap
          mapContainerStyle={{ width: "90vh", height: "80vh" }}
          center={coordinates}
          zoom={10}
        >
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input
              type="text"
              placeholder="Enter your location"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px",
              }}
            />
          </Autocomplete>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MaintenanceShopMap;
