import React from 'react';
import { Switch, Route } from 'react-router-dom';

import BlogpostList from './list';
import BlogpostEditing from './edit';
import BlogpostNew from './new';

export default () =>
    <Switch>
        <Route path="/blogposts/new" component={BlogpostNew} />
        <Route
            path="/blogposts/:slug"
            render={({ match }) => <BlogpostEditing slug={match.params.slug} />}
        />
        <Route path="/blogposts" component={BlogpostList} />
    </Switch>;
