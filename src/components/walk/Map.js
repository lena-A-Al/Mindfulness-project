import React, { useState, useMemo } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import "./walkStyle.css";
//reach/combobox will do the work to talk to google placess api.
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import PlacesAutocomplete from "./PlacesAutocomplete";
import mapStyles from "./mapStyle";

const Map = () => {
  //Customs hooks:

  /* we use the useMemo hook to solve the problem when every time the component
     renders; it will create a new center object even though it is not a new object. useMemo hook will solve this issues
     useMemo will memeorize the calculation */
  const center = useMemo(() => ({ lat: 40.76852, lng: -73.95591 }), []);

  //Local states:

  const [selected, setSelected] = useState(null);

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };

  return (
    <>
      <div>
        <PlacesAutocomplete setSelected={setSelected} />
      </div>
      {/* GoogleMap is a component that needs at least 3 props to work correctly.
      1. zoom= how far in and out we want to zoom in the map. 2. center = where
      is the center of the map is going to be position. It is an object with lat
      and lng. We put UES Manhattan. 3. mapContainerClassName is the styling
      container of where the map will be placed in the component.  */}
      <GoogleMap
        zoom={10}
        center={{ lat: 40.76852, lng: -73.95591 }}
        mapContainerClassName="map-container"
        options={options}
      >
        {/* we place marker in the map inside the Map component.
      we need to give it some props to position it correctly in the map */}
        {selected && (
          <Marker
            position={center}
            icon={{
              url: "images/mapPointer.jpg",
              scaledSize: new window.google.maps.Size(80, 80),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
          />
        )}
      </GoogleMap>
    </>
  );
};

export default Map;
