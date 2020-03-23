import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Typography, Link } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { ErrorRouter } from "./error-router";
import { PageMain } from "../pages/main";

export type AppProps = {};
export type AppState = {};

export class App extends React.Component<AppProps, AppState> {

    render(): React.ReactNode {
        const styles: { [name: string]: React.CSSProperties} = {
            toolLink: {
                marginLeft: '1em',
                marginRight: '1em'
            }
        };
        return (
            <React.Fragment>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" color="inherit">Mortgage Estimator</Typography>
                        <Link href="/" color="inherit" style={styles.toolLink}>Home</Link>
                        {/* <Link href="/new" color="inherit" style={styles.toolLink}>New</Link> */}
                    </Toolbar>
                </AppBar>
                <Switch>
                    <Route exact path="/">
                        <PageMain />
                    </Route>
                    {/* <Route exact path="/new" component={Something} /> */}
                    <Route path="/error" component={ErrorRouter} />
                    <Route path="*">
                        <Redirect to="/error/404" />
                    </Route>
                </Switch>
            </React.Fragment>
        );
    }
}
