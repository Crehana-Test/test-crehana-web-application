import React from "react";
import { useQuery, gql } from "@apollo/client";
import ISelectContinent from "../../Interfaces/ISelectContinent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const GET_CONTINENTS = gql`
  query getContinents {
    continents {
      code
      name
    }
  }
`;

export const SelectContinent: React.FC<ISelectContinent> = ({setByContinent, byContinent}) => {
  
  const { data } = useQuery(GET_CONTINENTS);

  return (
    <FormControl fullWidth className="mt-2">
      <InputLabel id="continent-select-standard-label">Select Continent</InputLabel>
      <Select
        labelId="continent-select-label"
        id="continent-select"
        value={byContinent}
        label="Seleccionar Continent"
        onChange={(e) => setByContinent(e.target.value)}
      >
        {data &&
          data.continents.map((continent: any) => (
            <MenuItem key={continent.code} value={continent.code}>
              {continent.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};