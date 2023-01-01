import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import React, { useMemo } from "react";
import Map from "./Map";
//reach/combobox will do the work to talk to google placess api.
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
window.process = {};

const Walk = () => {
  //useLoadScript is a hook coming from react-google-maps/api.
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA7hC8btGrE-UNxmms1JcGYdkx69FQNJZU",
    libraries: ["places"], //process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
};

export default Walk;

// import React, { useState, useCallback, useRef } from "react";
// import {
//   GoogleMap,
//   useLoadScript,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
// import { formatRelative } from "date-fns";
// import "@reach/combobox/styles.css";
// import mapStyles from "./mapStyle";
// import "./walkStyle.css";

// const libraries = ["places"];
// const mapContainerStyle = {
//   height: "100vh",
//   width: "100vw",
// };

// const center = {
//   lat: 40.712776,
//   lng: -74.005974,
// };

// const options = {
//   styles: mapStyles,
//   disableDefaultUI: true,
//   zoomControl: true,
// };
// const Walk = () => {
//   //Custom Hooks:
//   const onMapClick = useCallback(
//     (event) =>
//       setMarkers((current) => [
//         ...current,
//         {
//           lat: event.latLng.lat(),
//           lng: event.latLng.lng(),
//           time: new Date(),
//         },
//       ]),
//     []
//   );

//   const mapRef = useRef();

//   //Local states:
//   const [markers, setMarkers] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: "AIzaSyA7hC8btGrE-UNxmms1JcGYdkx69FQNJZU", //process.env.REACT_APP_GOOGLE_MAPS_API_KEY
//     libraries,
//   });

//   // we use state when we want react to re-render.
//   // we use useRef when we want to retain state without causing re-rendering.
//   const onMapLoad = useCallback((map) => {
//     mapRef.current = map;
//   }, []);

//   if (loadError) return "Error loading maps";
//   if (!isLoaded) return "Loading Maps";

//   return (
//     <div>
//       <h1>Parks</h1>

//       <Search />
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         zoom={20}
//         center={center}
//         options={options}
//         onClick={onMapClick}
//         onLoad={onMapLoad}
//       >
//         {markers.map((marker) => (
//           <Marker
//             key={marker.time.toISOString()}
//             position={{ lat: marker.lat, lng: marker.lng }}
//             icon={{
//               url: "images/mapPointer.jpg",
//               scaledSize: new window.google.maps.Size(80, 80),
//               origin: new window.google.maps.Point(0, 0),
//               anchor: new window.google.maps.Point(15, 15),
//             }}
//             onClick={() => {
//               setSelected(marker);
//             }}
//           />
//         ))}
//       </GoogleMap>
//     </div>
//   );
// };

// function Search() {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestion,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       location: { lat: () => 40.712776, lng: () => -74.005974 },
//       radius: 200 * 1000, //convert kilometer to meters.
//     },
//   });
//   return (
//     // <div className="search">
//     <Combobox
//       onSelect={(address) => {
//         console.log(address);
//       }}
//     >
//       <ComboboxInput
//         value={value}
//         onChange={(event) => {
//           setValue(event.target.value);
//         }}
//         disabled={!ready}
//         placeholder={"Enter an address.."}
//       />
//       <ComboboxPopover>
//         <ComboboxList>
//           {status === "OK" &&
//             data.map(({ id, description }) => (
//               <ComboboxOption key={id} value={description} />
//             ))}
//         </ComboboxList>
//       </ComboboxPopover>
//     </Combobox>
//     // </div>
//   );
// }
// export default Walk;
