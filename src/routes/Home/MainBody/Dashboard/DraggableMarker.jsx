import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import translate from "google-translate-api-browser";

const center = {
  lat: 35.735171,
  lng: 51.430122,
};

export function DraggableMarker({
  setShowMap,
  height,
  setSearchTerm,
  MapPositions,
  getPosition,
}) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const [address, setAddress] = useState("");
  const [persianAddress, setPersianAddress] = useState("");

  const navigate = useNavigate();
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPosition = marker.getLatLng();
          setPosition(newPosition);
          // getAddress(newPosition);
        }
      },
      click() {
        // Access the latest position when the marker is clicked
        const marker = markerRef.current;
        if (marker != null) {
          const newPosition = marker.getLatLng();
          console.log("newPosition", newPosition);
          setShowMap(2);
          // getAddress(newPosition);

          // Save the updated latitude and longitude to localStorage
          const latitude = newPosition.lat;
          const longitude = newPosition.lng;
          const newLatLong = [latitude, longitude];
          setPosition(newPosition);

          // Save to localStorage
          localStorage.setItem("savedLatitude", latitude);
          localStorage.setItem("savedLongitude", longitude);
          localStorage.setItem("savedLatLong", JSON.stringify(newLatLong));
          // setMapPositions(latitude, longitude);
          // Update the state after saving to localStorage
          // setMapPositions([newLatLong]);
          getPosition(newLatLong);
          console.log("Latitude and Longitude saved to localStorage");
        }
      },
    }),
    [getPosition]
  );
  const mapPosition = JSON.parse(
    localStorage.getItem("positionDraggableMarker")
  );

  useEffect(() => {
    console.log("NewImagebarayemancheaavardi", mapPosition);
    if (!!mapPosition) {
      setPosition(mapPosition.length !== 0 ? mapPosition : center);
    }
  }, [!!mapPosition ? mapPosition[0] : mapPosition]);
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);
  // const savedLatitude = localStorage.getItem("savedLatitude");
  // const savedLongitude = localStorage.getItem("savedLongitude");
  // useEffect(() => {
  //   setMapPositions((prev) => [...prev, [savedLatitude, savedLongitude]]);
  // }, [savedLatitude, savedLongitude]);
  // console.log("45345345343453useEffect", MapPositions);
  const getAddress = async (newPosition) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${newPosition.lat}&lon=${newPosition.lng}&format=json`
      );
      const data = await response.json();
      const formattedAddress = data.display_name || "Address not found";
      setAddress(formattedAddress);
      console.log("hello");
      translate("hello", { to: "fa" })
        .then((res) => {
          // I do not eat six days
          console.log(res.text);
        })
        .catch((err) => {
          console.error(err);
        });
      // Translate the address to Persian
      const translation = await translate(formattedAddress, {
        from: "en",
        to: "fa",
      });

      setPersianAddress(translation.text);
      console.log("persian", persianAddress);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // useEffect(() => {
  //   // Initial address retrieval
  //   getAddress(position);
  // }, [position]);
  console.log("address", address);
  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "مارکر قابلیت جابجایی دارد"
            : "مارکر قابلیت جابجایی دارد"}
        </span>
      </Popup>
    </Marker>
  );
}
