import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Chip from 'material-ui/Chip';
import IconBlock from 'material-ui/svg-icons/content/block';
import IconWarning from 'material-ui/svg-icons/alert/warning';
import IconRestaurantMenu from 'material-ui/svg-icons/maps/restaurant-menu';
import * as themeContent from '../theme';
import { capitalize } from './utils';
import style from './DietReason.css';

export default function DietReason({ reason, badIngredients, badTraces }) {
  const rendered = [];
  let subTitle;
  let icon;
  switch(reason.type){
    case 'diet':
      subTitle = reason.diet.locale.fr.excludingName;
      icon = <div className={style.icon} dangerouslySetInnerHTML={{ __html: reason.diet.pictureSvg }} />;
      // console.log('REASON FOR THIS DIET:', reason.diet);
      break;
    case 'user':
      subTitle = 'Mes ingrédients exclus';
      icon = <div className={style.icon}><IconBlock color={'inherit'} /></div>;
      break;
    case 'traces':
      subTitle = 'Traces';
      icon = <div className={style.icon}><IconWarning color={'inherit'} /></div>;
      break;
    case 'ingredients':
      subTitle = 'Ingrédients';
      icon = <div className={style.icon}><IconRestaurantMenu color={'inherit'} /></div>;
      break;
  }
  const chips = [];
  let reasonFitsMe = true;
  _.forEach(reason.ingredients, (ingredient, index) => {
    const ingrFitsMe = (
      !_.find(badIngredients, ingr => ingr.ingredient.ingr === ingredient.ingr)
      && !_.find(badTraces, ingr => ingr.ingredient.ingr === ingredient.ingr)
    );
    reasonFitsMe = reasonFitsMe && ingrFitsMe;
    chips.push(<Chip
      key={`chip-${subTitle}-${index}`}
      style={{ margin: '2px' }}
      backgroundColor={ingrFitsMe ? themeContent.greenLight : themeContent.redLight}
      labelStyle={{ color: ingrFitsMe ? themeContent.greenDarker : themeContent.redDarker }}
    >
      {ingredient.name}
    </Chip>);
  });
  if (chips.length) {
    rendered.push(
      <div
        key={`title-${subTitle}`}
        className={classNames({
          [style.subtitle]: true,
          [style.fitsMe]: reasonFitsMe
        })}
      >
        {icon}
        <h3>{capitalize(subTitle)}</h3>
      </div>
    );
    rendered.push(<div key={`chips-${subTitle}`} className={style.chips}>{chips}</div>);
  }
  return <div key={`main-${subTitle}`}>{rendered}</div>;
}

DietReason.propTypes = {
  reason: PropTypes.object.isRequired,
  badIngredients: PropTypes.array.isRequired,
  badTraces: PropTypes.array.isRequired
};
