import React from "react";
import "../App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "../Config/routes";

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.component name={route.name} {...route.props} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
