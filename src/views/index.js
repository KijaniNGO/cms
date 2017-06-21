import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AuthProvider, LoginView, LoadingView } from '../auth/';
import Wrapper from './Wrapper';

import { Datepicker, Home, PageNotFound } from '../Pages';

const routes = {
    '/datepicker': Datepicker,
};

export default () =>
    <AuthProvider loginComponent={LoginView} loadingComponent={LoadingView}>
        <Wrapper routes={routes} onLogout={AuthProvider.logout}>
            <Switch>
                <Route exact path="/" component={Home} />
                {Object.keys(routes).map(path =>
                    <Route key={path} path={path} component={routes[path]} />
                )}
                <Route component={PageNotFound} />
            </Switch>
        </Wrapper>
    </AuthProvider>;
