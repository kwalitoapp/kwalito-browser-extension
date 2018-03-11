import React from 'react';
import Badge from 'material-ui/Badge';
import PropTypes from 'prop-types';
import { grey } from '../theme';

const Badged = ({ value, children }) => (
  <Badge
    badgeContent={value}
    style={{ padding: '0 8px 8px 0' }}
    badgeStyle={{
      position: 'absolute', top: 'auto', bottom: 0, right: 0, border: `1px solid ${grey}`
    }}
  >
    {children}
  </Badge>
);

Badged.propTypes = {
  value: PropTypes.any.isRequired,
  children: PropTypes.any
};

Badged.defaultProps = {
  children: []
};

export default Badged;
