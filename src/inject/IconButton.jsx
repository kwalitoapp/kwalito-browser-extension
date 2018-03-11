import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as themeContent from '../theme';

export default function IconButton({ icon, selected, handler }) {
  return (
    <FloatingActionButton
      mini
      onClick={handler}
      backgroundColor={selected ? themeContent.gold : themeContent.white}
      style={{ margin: '4px 6px' }}
      iconStyle={{
        color: selected ? themeContent.purple : themeContent.greyDarker,
        fill: selected ? themeContent.purple : themeContent.greyDarker,
      }}
    >
      {icon}
    </FloatingActionButton>
  );
}

IconButton.propTypes = {
  icon: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  handler: PropTypes.func.isRequired
};
