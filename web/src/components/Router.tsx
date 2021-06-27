import { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Admin from "../containers/Admin";
import Home from "../containers/Home";
import Login from "../containers/Login";
import Spinner from "./Spinner";

const Router = () => {
    return (
        <Suspense fallback={<Spinner/>}>
            <Switch>
                <Route exact path={"/login"} component={Login} />
                <Route exact path={"/admin"} component={Admin} />
                <Route exact path={"/"} component={Home} />
            </Switch>
        </Suspense>
    );
}

export default Router;