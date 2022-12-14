import React, { useEffect, useState } from "react";
import { REACT_APP_GOOGLE_MAPS_API_KEY } from "../../utils/API_KEY.js";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import "./MapsPage.css";

const libraries = ["places"];

const MapsPage = ({}) => {
  // State Variables:
  const [selected, setSelected] = useState({});
  const [locations, setLocations] = useState([]);
  const [searchBox, setSearchBox] = useState([]);
  const [bestRatedLocations, setBestRatedLocations] = useState([]);
  const [defaultCenter, setDefaultCenter] = useState({
    lat: 43.1114948,
    lng: -91.0777817,
  });

  console.log("Search Box", searchBox);

  // UseEffects:
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(example);
  }, []);

  // Functions:
  const onSelect = (item) => {
    setSelected(item);
  };
  //
  const example = (position) => {
    let coords = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setDefaultCenter(coords);
  };
  //
  const onLoad = (ref) => {
    setSearchBox(ref);
    console.log("REF", ref);
  };
  //
  const onPlaceChanged = () => {
    let results = searchBox.getPlaces();
    setLocations(results);
    findBestLocations(results);
  };
  function findBestLocations(props) {
    let openLocations = props?.filter((location) => {
      if (props.length > 0 && location.business_status == "OPERATIONAL") {
        return location;
      }
    });
    let tempLocations = openLocations.sort((a, b) => b.rating - a.rating);
    let top10Locations = tempLocations.slice(0, 10);
    setBestRatedLocations(top10Locations);
  }

  return (
    <div className="map-page-style">
      <h2>Search For Local Businesses</h2>
      <div className="maps-style">
        <div>
          <LoadScript
            googleMapsApiKey={REACT_APP_GOOGLE_MAPS_API_KEY}
            libraries={libraries}
          >
            <GoogleMap
              mapContainerStyle={{ width: "65vw", height: "65vh" }}
              center={defaultCenter}
              zoom={11}
            >
              <StandaloneSearchBox
                onLoad={onLoad}
                onPlacesChanged={onPlaceChanged}
              >
                <input
                  type="text"
                  placeholder="search"
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
              </StandaloneSearchBox>
              <Marker position={defaultCenter}></Marker>
              {bestRatedLocations?.map((item, index) => {
                return (
                  <Marker
                    key={index}
                    cursor={true}
                    label={`${index + 1}`}
                    position={{
                      lat: item.geometry.location.lat(),
                      lng: item.geometry.location.lng(),
                    }}
                    onClick={() => onSelect(item)}
                  />
                );
              })}
            </GoogleMap>
          </LoadScript>
        </div>
        <div>
          {bestRatedLocations.length > 0 && (
            <table className="table-style">
              <thead>
                <tr className="map-th-style">
                  <td></td>
                  <td>Business Name</td>
                  <td>Rating</td>
                  <td>Address</td>
                </tr>
              </thead>
              <tbody>
                {bestRatedLocations.map((location, i) => {
                  return (
                    <tr
                      key={i}
                      className={(i + 1) % 2 ? "map-row-2" : "map-row-1"}
                    >
                      <td>{i + 1}. </td>
                      <td>{location.name}</td>
                      <td>{location.rating}</td>
                      <td>{location.formatted_address}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapsPage;
