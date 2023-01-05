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
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
};

export default Walk;
