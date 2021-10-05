import "./App.css";
import Theme from "./theme/theme";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

import Home from "./pages/Home";

import routes from "./router/routes";
import CalculoElectrico from "./pages/CalculoElectrico";
import CalculoGas from "./pages/CalculoGas";

function App() {
  return (
    <Theme>
      <BrowserRouter>
        <Switch>
          <Route exact path={routes.home} component={Home} />
          <Route
            exact
            path={routes.calculoElectrico}
            component={CalculoElectrico}
          />
          <Route exact path={routes.calculoGas} component={CalculoGas} />
          <Route path={"/"}>
            <Redirect to={"/"} />
          </Route>
        </Switch>
      </BrowserRouter>
    </Theme>
  );
}

export default App;
