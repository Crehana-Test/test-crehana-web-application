import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ICountry from "../Interfaces/ICountry";
import { useQuery, gql } from "@apollo/client";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const SHOW_COUNTRY = gql`
  query ShowCountry($countryId: ID!) {
    country(code: $countryId) {
      code
      name
      currency
      continent {
        name
      }
      languages {
        name
      }
      capital
    }
  }
`;

export const Country: React.FC<ICountry> = () => {
  let { code } = useParams();
  const [dataCountry, setDataCountry] = useState<ICountry>();

  const { loading, error } = useQuery(SHOW_COUNTRY, {
    variables: { countryId: code },
    onCompleted(data) {
      if (data.country) setDataCountry(data.country);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  if (code) {
    return (
      <div
        className="container text-center offset-4 col-4 mt-3"
        style={{ backgroundColor: "coral" }}
      >
        <div className="row d-flex">
          <h2>{dataCountry?.name}</h2>
          &nbsp;
          <img
            src={`https://www.banderas-mundo.es/data/flags/w702/${dataCountry?.code.toLowerCase()}.png`}
            width="100"
            height="80"
            alt="country-flag"
          />
        </div>

        <List style={{ borderRadius: "5px", border: "1px solid gray" }}>
          <ListItem>
            <ListItemText>
              Continent: {dataCountry?.continent.name}
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>Country Code: {dataCountry?.code} </ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>Capital: {dataCountry?.capital}</ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>Currency: {dataCountry?.currency} </ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            Languages:
            {dataCountry?.languages.map((lang, i) => (
              <ListItemText key={i}>
                {lang.name}
                {i < dataCountry?.languages.length ? "," : ""}
              </ListItemText>
            ))}
          </ListItem>
        </List>

        <div className="mt-2">
          <Link to="/">Volver</Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2>¡Necesitas seleccionar un país!</h2>
      </div>
    );
  }
};
