import React, {useState} from "react";
import { useQuery, gql } from "@apollo/client";
import ICountry from "../../Interfaces/ICountry";
import ISelectCurrency from "../../Interfaces/ISelectCurrency";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const GET_CURRENCIES = gql`
  query getbyCurrency {
    countries {
      currency
    }
  }
`;

export const SelectCurrency: React.FC<ISelectCurrency> = ({setByCurrency, byCurrency}) => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  
  useQuery(GET_CURRENCIES, {
    onCompleted(data) {
      const auxCurrency: string[] = [];
      data.countries.forEach((curr: ICountry) => {
        if (curr.currency != null)
          if (!auxCurrency.includes(curr.currency)) {
            if (curr.currency.includes(",")) {
              let currencyList: string[] = curr.currency.split(",");
              currencyList.forEach((cItem) => {
                if (!auxCurrency.includes(cItem)) auxCurrency.push(cItem);
              });
            } else auxCurrency.push(curr.currency);
          }
      });
      auxCurrency.sort();
      setCurrencies(auxCurrency);
    },
  });
  return (
    <FormControl fullWidth className="mt-2">
      <InputLabel id="currency-select-standard-label">Select Currency</InputLabel>
      <Select
        labelId="currency-select-label"
        id="currency-select"
        value={byCurrency}
        label="Seleccionar Moneda"
        onChange={(e) => {
          console.log(e.target.value);
          setByCurrency(e.target.value);
        }}
      >
        {currencies.map((currency: string, index: number) => (
            <MenuItem key={index} value={currency}>
              {currency}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
};