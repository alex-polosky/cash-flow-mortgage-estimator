import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { Error404 } from "./error-404";

export const ErrorRouter = () => {
    let { path, url } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/404`} component={Error404} />
            <Route path="*">
                <Redirect to="/error/404" />
            </Route>
        </Switch>
    );
}