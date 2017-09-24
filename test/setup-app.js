import { JSDOM } from 'jsdom';
import hook from 'css-modules-require-hook';
import postCSSConfig from '../webpack/postcss.config';

// global.document = new JSDOM('<!doctype html><html><body></body></html>');
// global.window = document.window;
// global.navigator = global.window.navigator;

hook({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  prepend: postCSSConfig.plugins,
});
