import React, { useState } from "react";
import { CountryList } from "../Components/LisCountries/CountryList";
import { SelectCurrency } from "../Components/LisCountries/SelectCurrency";
import { SelectContinent } from "../Components/LisCountries/SelectContinent";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export const ListCountries: React.FC<{}> = () => {
  const [byContinent, setByContinent] = useState<string>("");
  const [byCurrency, setByCurrency] = useState<string>("");
  const [byCode, setByCode] = useState("");
  const [open, setOpen] = useState(true);

  return (
    <div className="container mt-2" style={{ backgroundColor: "coral" }}>
      <div className="text-center mb-2">
        <h1 className="font-weight-bold">Countries Around the World 🌎</h1>
        <h6>¡Explore them!</h6>
      </div>
      <div className="text-center mb-2">
        <TextField
          id="outlined-basic"
          label="Enter country Code"
          variant="outlined"
          value={byCode}
          onChange={(e) => setByCode(e.target.value.toUpperCase())}
        />
        <SelectCurrency byCurrency={byCurrency} setByCurrency={setByCurrency} />
        <SelectContinent
          byContinent={byContinent}
          setByContinent={setByContinent}
        />
      </div>
      <div className="col-4 offset-4 mb-2">
        <CountryList
          byContinent={byContinent}
          byCurrency={byCurrency}
          byCode={byCode}
        />
      </div>

      <Dialog
        open={open}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="welcome-dialog-slide-description"
        className="text-center"
      >
        <DialogTitle style={{ backgroundColor: "coral" }}>
          {"Bienvenido a Country 🌎 Yard"}
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "coral" }}>
          <DialogContentText id="welcome-dialog-slide-description">
            ¡Vamos a conocer un poco más acerca del mundo que nos rodea!
          </DialogContentText>
          <DialogActions className="justify-content-center d-block">
            <Button
              variant="contained"
              color="success"
              className="mt-2"
              onClick={() => setOpen(false)}
            >
              Comenzar
            </Button>
            <div className="mt-3 text-white">
              <small>
                {`Developed by `}
                <a
                  className="text-white"
                  href="https://www.linkedin.com/in/nicolas-hernandez-67bb3317a/"
                >
                  {`Nicolas Hernandez`}
                </a>
                {` with ♥ Crehana`}
              </small>
            </div>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};
