import "./App.css";
import Theme from "./theme/theme";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";

import routes from "./router/routes";
import CalculoElectrico from "./pages/CalculoElectrico";
import CalculoGas from "./pages/CalculoGas";
import Etiquetado from "./pages/Etiquetado";
import EditarDomicilioPage from "./pages/EditarDomicilioPage";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Login from './pages/Login';
import Register from './pages/Register';

const options = {
  timeout: 5000,
  position: positions.MIDDLE,
  containerStyle: {
    fontSize: 20
  }
};


function App() {
  return (
    <Theme>
      <BrowserRouter>
        <Switch>
          <Provider template={AlertTemplate} {...options}>
          <Route exact path={routes.home} component={Home} />
          <Route exact path={routes.calculoElectrico} component={CalculoElectrico} />
          <Route exact path={routes.calculoGas} component={CalculoGas} />
          <Route exact path={routes.domicilioPage} component={Etiquetado} />
          <Route exact path={routes.domicilioEdit} component={EditarDomicilioPage} />
          <Route exact path={routes.login} component={Login} />
          <Route exact path={routes.register} component={Register} />
          {/* <Route path={"/"}>
            <Redirect to={"/"} />
          </Route> */}
          </Provider>
        </Switch>
      </BrowserRouter>
    </Theme>
  );
}

export default App;
