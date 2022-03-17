import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import About from "./pages/About";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
         <Switch>
            <Route path="/">
                 <AppLayout>
                      <Switch>
                         <Route path="/" exact>
                             <Home />
                         </Route>
                         <Route path="/about">
                              <About />
                         </Route>
                      </Switch>
                 </AppLayout>
            </Route>
         </Switch>
    </BrowserRouter>
  );
}

export default App;
