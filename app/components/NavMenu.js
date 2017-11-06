import React from 'react';
import { List, ListSubHeader } from 'react-toolbox/lib/list';
import { ListItem } from 'react-toolbox/lib/list';
import { FontIcon } from 'react-toolbox/lib/font_icon';
import * as routes from '../utils/routes';

export default ({ actions, history }) => {
    return (
        <List>
            <ListSubHeader caption="Mes informations" />
            <ListItem
                leftIcon={<FontIcon>check_circle</FontIcon>}
                itemContent={<span>Mon alimentation</span>}
                onClick={() => {
                    actions.leftMenu.toggle();
                    history.push(routes.diets());
                }}
            />
        </List>
    );
}