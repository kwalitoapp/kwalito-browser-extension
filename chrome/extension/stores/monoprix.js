import entities from 'entities';
import {traceRegex} from '../../../app/constants';

export const name = 'monoprix';

export const urlMatch = '^https://www\\.monoprix\\.fr/.*-p$';

export const extractProductInfos = () => {
  const tcvarsScript = document.querySelectorAll('head script:not([src])');
  const ean = parseInt(tcvarsScript[0].text.match(
    /tc_vars\[["']product_ean["']][ \t]*=[ \t]*["']([0-9]*)["']/)[1]);
  const productName = entities.decodeXML(tcvarsScript[0].text.match(
    /tc_vars\[["']product_name["']][ \t]*=[ \t]*["'](.*)["'];/)[1]);
  const brand = entities.decodeXML(tcvarsScript[0].text.match(
    /tc_vars\[["']product_trademark["']][ \t]*=[ \t]*["'](.*)["'];/)[1]);
  const photoUrl = document.querySelectorAll('#mpx-content #content .contentProduct img')[0].src;
  const category = _.map(
    tcvarsScript[0].text.match(
      /tc_vars\[["']product_breadcrumb_label["']]\[[0-9]*][ \t]*=[ \t]*["'](.*)["'];/g),
    (cat) => cat.match(
      /tc_vars\[["']product_breadcrumb_label["']]\[[0-9]*][ \t]*=[ \t]*["'](.*)["'];/)[1]
  ).join(' | ');

  const ingredientsRaw = document.querySelectorAll('#mpx-info-produit #ingredients')[0].innerHTML;

  let ingredients = entities.decodeXML(ingredientsRaw.replace(/<[^>]*>/g, ' ')).trim();
  let traces = undefined;

  let indexTrace = ingredientsRaw.search(/<u>Allerg.{0,15}<\/u><br>/g);
  if (indexTrace !== -1) {
    ingredients = entities.decodeXML(
      ingredientsRaw.substring(0, indexTrace)
    ).replace(/<[^>]*>/g, ' ').trim();
  }
  const matched = entities.decodeXML(ingredientsRaw).match(traceRegex);
  if (matched) {
    _.each(matched, function(match) {
      ingredients = ingredients.replace(match, '');
      traces = traces ? traces + ' ' + match : match.trim();
    });
  }

  return {
    source: exports.name,
    ean,
    name: productName,
    brand,
    photoUrl,
    ingredients,
    traces,
    category
  };
};

export const code = () => {
  const injectDOM = document.createElement('div');
  injectDOM.className = 'inject-react-example';
  injectDOM.style.textAlign = 'center';
  const imgNodes = document.querySelectorAll('#mpx-content #content .contentProduct img');
  const imgNode = imgNodes[0];
  console.log('IMG NODE SELECTED:', imgNode);
  const tagSize = 96;
  imgNode.parentElement.appendChild(injectDOM);
  imgNode.parentElement.style['position'] = 'relative';
  injectDOM.style['width'] = `${tagSize}px`;
  injectDOM.style['height'] = `${tagSize}px`;
  injectDOM.style['position'] = 'absolute';
  injectDOM.style['top'] = '24px';
  injectDOM.style['right'] = '24px';
  console.log('STYLE: ', injectDOM.style);
  render(
    <img
      src="https://lh3.googleusercontent.com/AmBDAswsrF--f6kY44feFU5L3VsURJfM2qsUi7omjEgjCsdHa-RkNSoWOXRYy-WzNDI=w300"
      style={{width: `${tagSize}px`, height: `${tagSize}px`}}
    />,
    injectDOM
  );
};