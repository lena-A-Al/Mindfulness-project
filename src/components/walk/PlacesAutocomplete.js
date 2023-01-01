import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
//reach/combobox will do the work to talk to google placess api.
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

const PlacesAutocomplete = ({ setSelected }) => {
  //Custom hooks:
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  //this function will select the address the user chooses and covert it to lng and lat.
  const handleSelect = async (address) => {
    //set the value to whatever address the user chooses.
    setValue(address, false);
    // we set clearSuggestions() cause the user already makes the decision about the address.
    clearSuggestions();
    //convert the address to lat and lng cooredinates.
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };
  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(event) => setValue(event.target.value)}
        disabled={!ready} // this will be disabled if it is not ready
        className="combobox-input"
        placeholder="search an address"
      />
      {/* when we write the address in the input, we want to show it in the map; we use comboboxPopover */}
      <ComboboxPopover>
        {/* inside ComboboxList will show the list of addresses if the status is ok */}
        <ComboboxList className="list-option">
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default PlacesAutocomplete;
