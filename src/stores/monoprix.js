import entities from 'entities';
import { traceRegex } from '../popup/constants';

export const name = 'monoprix';

// export const urlMatch = '^https://www\\.monoprix\\.fr/.*-p$';
export const urlMatch = '^(https://www\\.monoprix\\.fr/.*-p)|(file://.*Monoprix.fr.html)|(http://127.0.0.1:8080.*)|(http://0.0.0.0:8080.*)$';

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

export const injectIframe = (iframeUrl) => {
  const imgNodes = document.querySelectorAll('#mpx-content #content .contentProduct img');
  const imgNode = imgNodes[0];
  console.log('IMG NODE SELECTED:', imgNode);

  const bodyRect = document.body.getBoundingClientRect();
  const imgRect = imgNode.getBoundingClientRect();
  const imgWidth = imgNode.width;
  const offsetTop = imgRect.top - bodyRect.top;
  const offsetLeft = imgRect.left - bodyRect.left + imgWidth - 200;

  document.body.style['position'] = 'relative';

  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', iframeUrl);
  iframe.style['position'] = 'absolute';
  iframe.style['top'] = `${offsetTop}px`;
  iframe.style['left'] = `${offsetLeft}px`;
  // iframe.style['max-width'] = '100%';
  iframe.style['max-height'] = '600px';
  iframe.style['overflow'] = 'hidden';
  document.body.appendChild(iframe);
  // console.log('IFRAME STYLE:', iframe.style);
  return iframe;
};
