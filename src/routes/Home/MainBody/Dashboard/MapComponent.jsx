import React, { useContext, useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styled from "styled-components";
import { Button } from "components/common";
import SearchImg from "../../../../assets/images/map/search.png";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { DraggableMarker } from "./DraggableMarker";
import "leaflet-routing-machine";
import "./MapContainer.css";
import axios from "axios";
import locationIcon from "../../../../assets/images/profilephoto/myLocation.png";
import { useLocation } from "react-router-dom";
import MyContext from "../MyDiagram/context/MyContext";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("../../../../assets/images/map/locationMarker.png"),
  iconUrl: require("../../../../assets/images/map/locationMarker.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
const CircularMarker = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function MapComponent({
  userLocation,
  date,
  height,
  setShowMap,
  Search,
  detail,
  savedLatitude,
  savedLongitude,
  setMapPositions,
  MapPositions,
  centerMap,
}) {
  const mapRef = useRef(null); // Ref to store the map instance
  const x = JSON.parse(localStorage.getItem("users"));
  const arraysOfMap = JSON.parse(localStorage.getItem("arraysOfMap"));
  const Users = arraysOfMap;
  const position = x?.map((el) => el.position);
  const polyline = x?.map((el) => [el.position, el.EndPosition]);
  

  console.log("UsersUsers", polyline);
  console.log("centerMapcenterMap", centerMap);
  const [positions, setPositions] = useState(position);
  console.log("position", position);

  const groupSize = 2;
  // const polyline = [[0,0], [1, 1]];

  // const outputCoordinates = [];

  // for (let i = 0; i < position?.length; i += groupSize) {
  //   outputCoordinates.push(position.slice(i, i + groupSize));
  // }

  // console.log("23423423", outputCoordinates);
  const [positionSearch, setPositionSearch] = useState(
    positions ? positions[0] : [35.739282, 51.429821],
    [35.735171, 51.430122],
    [35.730887, 51.433729],
    [35.738829, 51.446269],
    [35.738829, 51.446269],
    [35.724441, 51.435484],
    [35.730259, 51.427067],
    [35.730259, 51.437067],
    [35.730259, 51.439067],
    [35.740259, 51.447067],
    [35.745259, 51.457067],
    [35.755259, 51.457067]
  );
  useEffect(() => {}, []);
  const LocateControl = () => {
    const map = useMap();

    const handleClick = () => {
      map.locate({ setView: true, maxZoom: 16 });

      map.on("locationfound", (e) => {
        L.marker(e.latlng).addTo(map).bindPopup("شما اینجا هستید!").openPopup();
      });

      map.on("locationerror", (e) => {
        alert("موقعیت شما یافت نشد! لطفا چند دقیقه دیگر مجدد تلاش کنید.");
      });
    };

    return (
      <div>
        <img
          src={locationIcon} // Path to your image
          alt="Locate Me"
          width="26px"
          className="locate-me-btn"
          onClick={handleClick}
          style={{
            zIndex: 1000,
            backgroundColor: "#fff",
            padding: "2px",
            borderRadius: "4px",
            position: "absolute",
            bottom: 2,
            left: 2,
            cursor: "pointer",
          }}
        />
        {/* <img src='assets/images/profilephoto/newWorker.png' style={{zIndex:1000,  position: "absolute",bottom:0,left:0}} onClick={handleClick} /> */}
      </div>
    );
  };
  //   useEffect(()=>{
  //   const newLocation=positions.slice()
  //   if(userLocation!==null){
  //     newLocation.splice(0, 1,userLocation);
  //     console.log("newLocation",newLocation);
  //     setPositions(newLocation)

  //   }
  // },[userLocation])
  const customCircularMarkerIcon = new L.divIcon({
    className: "custom-circular-marker",
    iconSize: [10, 10], // Adjust the width and height of the icon
    iconAnchor: [30, 30], // Center of the icon
  });
  const blueDotIcon = new L.Icon({
    iconRetinaUrl: require("../../../../assets/images/map/locationMarker.png"),
    iconUrl: require("../../../../assets/images/map/locationMarker.png"),

    iconSize: [40, 40],
    iconAnchor: [0, 0],
    popupAnchor: [0, -10],
  });
  // const [userLocation, setUserLocation] = useState(null);

  // useEffect(() => {
  //   // Get user's current location using Geolocation API
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       setUserLocation([latitude, longitude]);
  //     },
  //     (error) => {
  //       console.error('Error getting user location:', error.message);
  //     }
  //   );
  // }, []); // Empty dependency array ensures the effect runs only once
  console.log("userLocation", userLocation);

  const limeOptions = { color: "lime" };
  const [searchTerm, setSearchTerm] = useState("");
  const searchLocation = async () => {
    // Use geocoding to get the coordinates of the location
    const provider = new OpenStreetMapProvider();
    const queryWithCity = `${searchTerm}, Tehran, Iran`; // Add Tehran and Iran to the query
    const results = await provider.search({ query: queryWithCity });
    console.log("searchTerm", searchTerm);
    console.log("results", results);
    console.log("provider", provider);
    if (results.length > 0) {
      const { y, x } = results[0];
      setPositionSearch([y, x]);
      console.log("y,x", y, x);
      // this.setState({ position: [y, x], zoom: 15, hasLocation: true });
    } else {
      console.log("Location not found");
      // You can handle the case where the location is not found
    }
  };
  const handleSearchChange = (event) => {
    console.log("event.target.value", event.target.value);
    setSearchTerm(event.target.value);
  };
  const handleSearchSubmit = async () => {
    await searchLocation();
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      searchLocation();
    }
  };
  useEffect(() => {
    if (mapRef.current && positionSearch) {
      mapRef.current.flyTo(positionSearch, 16); // Example zoom level
    }
  }, [positionSearch]);
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setPositionSearch([lat, lng]);
    // You can do more with the clicked coordinates if needed
    console.log("Clicked on map:", lat, lng);
  };
  console.log("detail", detail);

  const [bardia, setBardia] = useState([]);
  const [coords, setCoords] = useState(["20.5937", "78.9629"]);
  useEffect(() => {
    setBardia([0, 0]);
    setCoords([
      savedLatitude ? savedLatitude : 35.735171,
      savedLongitude ? savedLongitude : 51.430122,
    ]);
  }, [savedLatitude, savedLongitude]);
  console.log("bardia.length", bardia.length);
  const positionFunc = () => {
    return bardia.length > 0 ? [0, 0] : positionSearch;
  };

  const getPosition = (data) => {
    console.log("data234234", data);
    const savedLatLong = JSON.parse(localStorage.getItem("savedLatLong"));
    setMapPositions(data);
    // setArraysOfMap((prev) => [...prev, data]);
  };
  // useEffect(() => {
  //   setMapPositions((prev)=>[...prev,[savedLatitude, savedLongitude]]);
  // }, [savedLatitude,savedLongitude]);
  // console.log("45345345343453useEffect", MapPositions);
  // useEffect to log MapPositions after it has been updated

  useEffect(() => {
    console.log("45345345343453getPosition", MapPositions);
    if (!!MapPositions) {
      localStorage.setItem(
        "positionDraggableMarker",
        JSON.stringify(MapPositions)
      );
    }
  }, [MapPositions]);
  const handleMapDoubleClick = (e) => {
    const { lat, lng } = e.latlng;

    // Create a new marker at the double-clicked location
    const newMarker = { lat, lng };

    // Update the state or perform any other necessary actions
    // For example, you can add the new marker to your list of markers
    setMapPositions((prevPositions) => [...prevPositions, newMarker]);
  };

  const [startPoint, setStartPoint] = useState({
    lat: 35.7201717,
    lng: 51.3697583,
  });

  const [endPoint, setEndPoint] = useState({ lat: 35.749282, lng: 51.450122 });
  useEffect(() => {
    if (centerMap !== undefined) {
      setEndPoint({ lat: centerMap[0], lng: centerMap[1] });
    }
  }, [centerMap]);

  const routingControlRef = useRef(null);
  const [carMarker, setCarMarker] = useState(null);

  // useEffect(() => {
  //   const map = mapRef.current;

  //   if (map && !routingControlRef.current) {
  //     const waypoints = [
  //       L.latLng(startPoint.lat, startPoint.lng),
  //       L.latLng(endPoint.lat, endPoint.lng),
  //     ];

  //     routingControlRef.current = L.Routing.control({
  //       waypoints,
  //       routeWhileDragging: true,
  //       lineOptions: {
  //         styles: [{ color: 'blue', opacity: 0.7, weight: 5 }],
  //       },
  //       addWaypoints: false,
  //       fitSelectedRoutes: 'smart',
  //     }).addTo(map);

  //     const carIcon = L.icon({
  //       iconUrl: require("../../../../assets/images/map/car.png"),
  //       iconSize: [32, 32],
  //       iconAnchor: [16, 16],
  //     });

  //     setCarMarker(L.marker([startPoint.lat, startPoint.lng], { icon: carIcon }).addTo(map));
  //   }
  // }, [mapRef, routingControlRef, startPoint, endPoint]);

  // const navigateTo = (lat, lng, zoom) => {
  //   const map = mapRef.current;

  //   if (map) {
  //     map.setView([lat, lng], zoom);
  //   }
  // };
  const NavigationControl = () => {};
  const [userLocation1, setUserLocation1] = useState(null);
  const [isRouteDisplayed, setIsRouteDisplayed] = useState(false);

  const fetchAndDisplayRoute = async () => {
    const map = mapRef.current;

    if (map && !routingControlRef.current) {
      const waypoints = [
        L.latLng(startPoint.lat, startPoint.lng),
        L.latLng(endPoint.lat, endPoint.lng),
      ];

      routingControlRef.current = L.Routing.control({
        waypoints,
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: "blue", opacity: 0.7, weight: 5 }],
        },
        addWaypoints: false,
        fitSelectedRoutes: "smart",
      }).addTo(map);

      const carIcon = L.icon({
        iconUrl: require("../../../../assets/images/map/car.png"),
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      setCarMarker(
        L.marker([startPoint.lat, startPoint.lng], { icon: carIcon }).addTo(map)
      );
    }
  };

  function SetViewOnClick({ coords }) {
    const map = useMap();
    map.setView(userLocation1 ? userLocation1 : coords, map.getZoom());
    return null;
  }

  useEffect(()=>{

  },[])
      const { showNavigation } = useContext(MyContext);

  useEffect(() => {
  
    // const { showNavigation } = useContext(MyContext);
    console.log("showNavigationshowNavigation", showNavigation);
    // Check if the route is already displayed
    if (showNavigation) {
      // Fetch and display the route
     return  fetchAndDisplayRoute();
    }
  }, [showNavigation]);


  useEffect(() => {
    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Update user location
          setUserLocation1([latitude, longitude]);
          setStartPoint({ lat: latitude, lng: longitude });
          // Update car marker position
          if (carMarker) {
            carMarker.setLatLng([latitude, longitude]);
          } else {
            const map = mapRef.current;
            const carIcon = L.icon({
              iconUrl: require("../../../../assets/images/map/car.png"),
              iconSize: [32, 32],
              iconAnchor: [16, 16],
            });

            // Create a new car marker if it doesn't exist
            setCarMarker(
              L.marker([latitude, longitude], { icon: carIcon }).addTo(map)
            );
          }
        },
        (error) => {
          console.error("Error getting user location:", error.message);
        }
      );
    };

    // Update user location and car marker every 5000 milliseconds (5 seconds)
    const locationInterval = setInterval(updateLocation, 5000);

    // Clear the interval and remove the car marker on component unmount
    return () => {
      clearInterval(locationInterval);
      if (carMarker) {
        carMarker.removeFrom(mapRef.current);
      }
    };
  }, [carMarker]); // Dependency array includes carMarker
  const location = useLocation();
  console.log("window.location.pathname", location.pathname == "/home");
  return (
    <MapContainer
      center={coords}
      doubleClickZoom={false} // Disable default double-click zoom
      ondblclick={handleMapDoubleClick} // Handle double-click event
      zoom={userLocation ? 15 : 13}
      style={{
        height: ` ${height ? height : "30vh"}`,
        width: "100%",
        zIndex: 1,
      }}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }} // Callback to store map instance
      onClick={(e) => handleMapClick(e)} // Attach the click event handler
    >
      <SetViewOnClick coords={coords} />

      <div
        style={{
          position: "absolute",
          top: "8px",
          zIndex: "1000",
          right: "16px",
          left: "32px",
        }}
      >
        {Search && (
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="جستجو موقعیت مکانی"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                borderRadius: "16px 16px 0 0",
                borderBottom: "1px solid #dadce0",
                boxShadow: "0 0 2px rgb(0 0 0/20%), 0 -1px 0 rgb(0 0 0/2%)",
                background: "#fff",
                border: "none",
                width: "100%",
                minWidth: "160px",
                // maxWidth: "150px",
                height: "28px",
                outline: "none",
                padding: "8px",
              }}
              onKeyDown={handleKeyDown}
            />
            <img
              onClick={handleSearchSubmit}
              style={{
                position: "absolute",
                width: "24px",
                height: "24px",
                left: "10px",
                top: "10px",
                cursor: "pointer",
              }}
              src={SearchImg}
              alt="Search"
            />
          </div>
        )}
        {/* <button onClick={this.handleSearchSubmit}>Search</button> */}
      </div>
      {location.pathname == "/home" && (
        <Polyline pathOptions={limeOptions} positions={polyline} />
      )}

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* {positions.map((position, index) => (
        <Marker key={index} position={position}>
          <Popup>
            <div style={{ textAlign: "center" }}>
              <CircularMarker>
                <img
                  src={require("../../../../assets/images/profilephoto/302321278.jpg")}
                  alt={`Point ${index + 1}`}
                />
              </CircularMarker>
              <div>جواد مقبلی</div>
            </div>
          </Popup>
        </Marker>
      ))} */}
      {/* {!centerMap && (
        <DraggableMarker
          getPosition={getPosition}
          setMapPositions={setMapPositions}
          setShowMap={setShowMap}
          setSearchTerm={setSearchTerm}
        />
      )} */}

      {/* {userLocation1 && (
        <Marker position={userLocation1}>
          <Popup>
            <CircularMarker>
              <img
                src={require("../../../../assets/images/profilephoto/302321278.jpg")}
              />
            </CircularMarker>
          </Popup>
        </Marker>
      )} */}
      {!centerMap && location.pathname == "/home" ? (
        <MarkerClusterGroup>
          {positions?.map((el, index) => (
            <Marker key={index} position={el}></Marker>
          ))}
        </MarkerClusterGroup>
      ) : (
        <MarkerClusterGroup>
          <Marker position={centerMap}></Marker>
        </MarkerClusterGroup>
      )}
      <LocateControl />

      {userLocation && (
        <Marker position={userLocation}>
          <Popup>Your Location</Popup>
        </Marker>
      )}
      {/* <Marker position={[startPoint.lat, startPoint.lng]}>
        <Popup>Start Point</Popup>
      </Marker> */}
    </MapContainer>
  );
}

export default MapComponent;

const StyledPopup = styled(Popup)`
  .leaflet-popup-content-wrapper,
  .leaflet-popup-tip {
    background-color: ${(props) =>
      props.state === "تایید"
        ? "green"
        : props.state === "عدم تایید"
        ? "red"
        : "orange"};
    color:#fff;
    font-family:Yekan Bakh
    /* Set your desired background color here */
  }
  }

  color: white; /* Set the text color */
  padding: 10px; /* Set padding as needed */
`;
