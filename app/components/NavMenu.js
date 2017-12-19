import React from 'react';
import { AppBar } from 'react-toolbox/lib/app_bar';
import { List, ListSubHeader } from 'react-toolbox/lib/list';
import { ListItem } from 'react-toolbox/lib/list';
import { FontIcon } from 'react-toolbox/lib/font_icon';
import Avatar from 'react-toolbox/lib/avatar';
import * as routes from '../utils/routes';


export const clickHandler = (actions, history, route) => {
  return () => {
    actions.leftMenu.toggle();
    history.push(route);
  };
};

export default ({ actions, history, user }) => {
  let caption;
  let rightIconImage;
  let onClickRoute;
  if(user.anonymous){
    caption = 'Anonyme';
    rightIconImage = null;
    onClickRoute = routes.sign();
  } else {
    caption = `${user.firstName} ${user.lastName}`;
    rightIconImage = user.pictureUrl;
    onClickRoute = routes.profile();
  }
  return (
    <List>
      <ListItem
        caption={caption}
        rightIcon={<Avatar icon="face" image={rightIconImage}></Avatar>}
        onClick={clickHandler(actions, history, onClickRoute)}
      />
      <ListSubHeader caption="Mes informations" />
      <ListItem
        leftIcon={<FontIcon>restaurant_menu</FontIcon>}
        itemContent={<span>Mon alimentation</span>}
        onClick={clickHandler(actions, history, routes.diets())}
      />
      <ListSubHeader caption="Mon profile" />
      <ListItem
        leftIcon={<FontIcon>settings</FontIcon>}
        itemContent={<span>Mon compte</span>}
        onClick={clickHandler(actions, history, routes.profile())}
      />
      <ListItem
        leftIcon={<FontIcon>exit_to_app</FontIcon>}
        itemContent={<span>Déconnexion</span>}
        onClick={clickHandler(actions, history, routes.profile())}
      />
    </List>
  );
}