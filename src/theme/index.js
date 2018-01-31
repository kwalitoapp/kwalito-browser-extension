import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const greenLighter = '#ecf8f3';
export const greenLight = '#e5f6ef';
export const green = '#48bc8b';
export const greenDark = '#437f7a';
export const greenDarker = '#3e5554';

export const redLighter = '#fdf2f0';
export const redLight = '#f8c5bf';
export const red = '#ef7f70';
export const redDark = '#de5562';
export const redDarker = '#ae3542';

export const greyLighter = '#f1f1f1'; // greyLight * 105%
export const greyLight = '#e6e6e6'; // grey * 128%
export const grey = '#b3b3b3';
export const greyDark = '#818181'; // grey * 72%
export const greyDarker = '#666666'; // greyDark * 79%

export const white = '#fff';
export const gold = '#FFF50D';
export const purple = '#7686b5';

export default getMuiTheme({
  palette: {
    primary1Color: green,
    accent1Color: red,
    textColor: greyDark
  },
  appBar: {
    height: 50,
  },
});
