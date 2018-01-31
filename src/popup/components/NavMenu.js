import React from 'react';
import {List, ListItem} from 'material-ui/List';
import SubHeader from 'material-ui/Subheader';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import IconFace from 'material-ui/svg-icons/action/face';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import IconRestaurantMenu from 'material-ui/svg-icons/maps/restaurant-menu';
import * as routes from '../utils/routes';


export const clickHandler = (actions, history, route) => () => {
  actions.leftMenu.toggle();
  history.push(route);
};

export default ({ actions, history, user }) => {
  const headerInfos = {
    avatarInfo: {}
  };
  if (user.anonymous) {
    headerInfos.text = 'Anonyme';
    headerInfos.avatarInfo.icon = <IconFace />;
    headerInfos.onClickRoute = routes.sign();
  } else {
    headerInfos.text = `${user.firstName} ${user.lastName}`;
    headerInfos.avatarInfo.src = user.pictureUrl;
    headerInfos.onClickRoute = routes.profile();
  }
  return (
    <div>
      <ListItem
        leftAvatar={<Avatar {...headerInfos.avatarInfo} />}
        onClick={clickHandler(actions, history, headerInfos.onClickRoute)}
      >
        {headerInfos.text}
      </ListItem>
      <SubHeader>Mon profile</SubHeader>
      <MenuItem
        leftIcon={<IconRestaurantMenu />}
        primaryText={<span>Mon alimentation</span>}
        onClick={clickHandler(actions, history, routes.diets())}
      />
      <MenuItem
        leftIcon={<IconSettings />}
        primaryText={<span>Mon compte</span>}
        onClick={clickHandler(actions, history, routes.profile())}
      />
      <MenuItem
        leftIcon={<IconExitToApp />}
        primaryText={<span>Déconnexion</span>}
        onClick={clickHandler(actions, history, routes.profile())}
      />
    </div>
  );
};
