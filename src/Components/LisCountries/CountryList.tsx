import React, { Fragment, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import IFilters from "../../Interfaces/IFIlters";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const GET_COUNTRIES = gql`
  query getCountries(
    $byContinent: String
    $byCurrency: String
    $byCode: String
  ) {
    countries(
      filter: {
        continent: { regex: $byContinent }
        currency: { regex: $byCurrency }
        code: { regex: $byCode }
      }
    ) {
      code
      name
      currency
    }
  }
`;

export const CountryList = ({ byCode, byCurrency, byContinent }: IFilters) => {
  const navigate = useNavigate();

  const { loading, error, refetch, data } = useQuery(GET_COUNTRIES, {
    variables: { byCode, byCurrency, byContinent },
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [byCode, byCurrency, byContinent]);

  const handleCountry = (str: string) => {
    navigate(`/country/${str}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;
  return (
    <List style={{ borderRadius: "5px", border: "1px solid gray" }}>
      {data.countries.length === 0
        ? `Opps! No se encontró ninguna coincidencia`
        : data.countries.map((country: any) => (
            <Fragment>
              <ListItem key={country.code}>
                <ListItemButton onClick={() => handleCountry(country.code)}>
                  <ListItemText primary={country.name} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </Fragment>
          ))}
    </List>
  );
};
