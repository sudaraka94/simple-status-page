import { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../containers/Home";
import Spinner from "./Spinner";

const Router = () => {
    return (
        <Suspense fallback={<Spinner/>}>
            <Switch>
                <Route exact path={"/"} component={Home} />
            </Switch>
        </Suspense>
    );
}

export default Router;