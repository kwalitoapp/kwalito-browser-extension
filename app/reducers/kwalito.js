import * as ActionTypes from '../constants/ActionTypes';

const initialState = [{
  id: 1,
  name: 'Sans gluten',
  excludingName: 'gluten',
  description: 'Le <a href="#" onclick="window.open(\'http://www.afdiag.fr/\', \'_system\');">gluten</a> n\'est pas ton ami, je l\'ai bien compris. Dans un pays qui vénère le pain, ton alimentation « sans gluten » te pose plein de défis au quotidien.<br/><br/>Pour t\'aider à trouver des produits adaptés de façon simple et rapide, j\'exclus de ce régime « sans gluten » toutes les céréales riches en gluten, ainsi que tous les additifs alimentaires ou autres ingrédients qui en sont dérivés.<br/><br/>Comme le gluten figure parmi les 14 allergènes les plus répandus, la bonne nouvelle est que <a href="#" onclick="window.open(\'http://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/Allergene-alimentaire\', \'_system\');">la loi</a> impose aux fabricants de mentionner la présence du gluten sur les produits qui en contiennent.<br/>Pour plus de sécurité, tu peux choisir les produits qui portent explicitement le logo de l\'épi de blé barré <img src="http://www.healthunplugged.co.uk/wp-content/uploads/2015/08/Gluten_free_SVG.svg_1.png" width="16" height="16"/>.',
  color: '#ff926f',
  pictureSvg: '<svg version="1.1" x="0px" y="0px" viewBox="-332 267.5 24 60.5" style="enable-background:new -332 267.5 24 60.5;" xml:space="preserve"><path d="M-319.4,312v4.5l7.8-4c2-1.1,3.6-3.7,3.6-6.7v-4.6l-7.8,4C-317.8,306.4-319.4,309-319.4,312z M-314.7,307.4l4.5-2.2v0.7c0,2.1-1.1,4-2.4,4.7l-4.5,2.2v-0.7C-317.1,309.9-316,308-314.7,307.4z"/><path d="M-324.2,305.3l-7.8-4v4.6c0,3,1.6,5.6,3.6,6.7l7.8,4v-4.5C-320.6,309-322.1,306.4-324.2,305.3z M-322.8,312.7l-4.5-2.2c-1.2-0.7-2.4-2.6-2.4-4.7v-0.7l4.5,2.2c1.2,0.7,2.4,2.6,2.4,4.7V312.7z"/><path d="M-319.4,323.4v4.5l7.8-4c2-1.1,3.6-3.7,3.6-6.7v-4.5l-7.8,4C-317.8,317.8-319.4,320.5-319.4,323.4z M-314.7,318.8l4.5-2.2v0.7c0,2.1-1.1,4-2.4,4.7l-4.5,2.2v-0.7C-317.1,321.4-316,319.5-314.7,318.8z"/><path d="M-324.2,316.8l-7.8-4v4.5c0,3,1.6,5.6,3.6,6.7l7.8,4v-4.5C-320.6,320.5-322.1,317.8-324.2,316.8z M-322.8,324.2l-4.5-2.2c-1.2-0.7-2.4-2.6-2.4-4.7v-0.7l4.5,2.2c1.2,0.7,2.4,2.6,2.4,4.7V324.2z"/><path d="M-319.4,300.6v4.5l7.8-4c2-1.1,3.6-3.7,3.6-6.7v-4.5l-7.8,4C-317.8,295-319.4,297.6-319.4,300.6z M-314.7,295.9l4.5-2.2v0.7c0,2.1-1.1,4-2.4,4.7l-4.5,2.2v-0.7C-317.1,298.5-316,296.6-314.7,295.9z"/><path d="M-324.2,293.9l-7.8-4v4.5c0,3,1.6,5.6,3.6,6.7l7.8,4v-4.5C-320.6,297.6-322.1,295-324.2,293.9z M-322.8,301.3l-4.5-2.2c-1.2-0.7-2.4-2.6-2.4-4.7v-0.7l4.5,2.2c1.2,0.7,2.4,2.6,2.4,4.7V301.3z"/><path d="M-319.4,289.1v4.5l7.8-4c2-1.1,3.6-3.7,3.6-6.7v-4.5l-7.8,4C-317.8,283.5-319.4,286.1-319.4,289.1z M-314.7,284.5l4.5-2.2v0.7c0,2.1-1.1,4-2.4,4.7l-4.5,2.2v-0.7C-317.1,287-316,285.1-314.7,284.5z"/><path d="M-324.2,282.4l-7.8-4v4.5c0,3,1.6,5.6,3.6,6.7l7.8,4v-4.5C-320.6,286.1-322.1,283.5-324.2,282.4z M-322.8,289.9l-4.5-2.2c-1.2-0.7-2.4-2.6-2.4-4.7v-0.7l4.5,2.2c1.2,0.7,2.4,2.6,2.4,4.7V289.9z"/><path d="M-316.7,271.7l-3.4-4.2l-3.4,4.2c-1.8,2.3-1.8,5.8,0,8.1l3.4,4.2l3.4-4.2C-314.9,277.5-314.9,274-316.7,271.7zM-318.5,278.4l-1.6,2l-1.6-2c-1.1-1.4-1.1-3.8,0-5.3l1.6-2l1.6,2C-317.4,274.5-317.4,277-318.5,278.4z"/></svg>',
  createdAt: new Date('2014-12-11 14:20:54'),
  updatedAt: new Date('2016-03-01 09:44:16'),
  options: {"ingredients": [1681, 1805, 1958, 2327, 2335, 2350, 2368, 2385, 2387, 2388, 2424, 2562, 2587, 2598, 2663, 2679, 2682, 2754, 2755, 2830, 2853, 3098, 3222, 3292, 4285, 4286, 4477, 4622, 4773, 4829, 5139]}
},{
  id: 3,
  name: 'Femme enceinte',
  excludingName: 'femme enceinte',
  description: 'Quelle belle nouvelle, félicitations !<br/><br/>Enceinte, on fait très attention à son alimentation pour assurer le meilleur départ possible au petit bout. En règle générale, les futures mamans doivent éviter : l\'alcool, le cru, le fumé et le soja.<br/><br/>Concrètement il est conseillé de ne pas manger :<br/>- de viande crue, de charcuterie, de poissons crus ou fumés<br/>- toute préparation à base d\'oeufs crus comme la mayonnaise ou le mi-cuit au chocolat<br/>- de fromages à pâte fleurie et au lait cru<br/><br/>des aliments à risque de contamination par la listéria.<br/><br/>Le soja contient des phyto-estrogènes qui, d\'après certaines études, pourraient perturber le système hormonal du bébé à l\'âge adulte. Pour l\'instant, aucune recommandation officielle n\'a été énoncée pour la femme enceinte mais la prudence reste de mise. Attention, donc, aux : tofu, dessert au soja, jus de soja, compléments alimentaires contenant des extraits de soja.<br/><br/>Par conséquence, les aliments dont la liste des ingrédients mentionne les mots : alcool, cru, fumé, foie et soja sont exclus de ce « régime ». De même pour les additifs alimentaires à base de soja.<br/><br/>Je te conseille également de cocher le régime « sans additifs à risque » pour une alimentation plus saine. Et d\'enlever avec l\'aide de la barre de recherche, éventuellement, les ingrédients transformés comme : sirop de glucose-fructose, graisses hydrogénées, acide gras trans...',
  color: '#fc9f95',
  pictureSvg: '<svg version="1.1" x="0px" y="0px" viewBox="-333.6 270.8 27.2 54" style="enable-background:new -333.6 270.8 27.2 54;" xml:space="preserve"><path d="M-318.7,303.7c0.4-0.7,0.2-1.6-0.5-2.1l-8.3-5l1.6-10.1c0.1-0.8-0.4-1.6-1.2-1.7c-0.8-0.1-1.6,0.4-1.7,1.2l-1.8,11.1c-0.1,0.6,0.2,1.2,0.7,1.5l9.2,5.5c0.2,0.1,0.5,0.2,0.8,0.2C-319.5,304.4-319,304.1-318.7,303.7z M-325.3,317.3h-2.9l2.1-13.5c0.1-0.8-0.4-1.6-1.3-1.7c-0.8-0.1-1.6,0.4-1.7,1.3l-2.4,15.2c-0.1,0.4,0.1,0.9,0.3,1.2c0.3,0.3,0.7,0.5,1.1,0.5h3.1v3c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5v-4.5C-323.8,317.9-324.5,317.3-325.3,317.3z M-311,312.9c3.3-2.6,5.1-6.8,4.5-11.1c-0.7-5.3-4.7-9.4-9.7-10.2l-1.1-4.6c-0.2-0.8-1-1.3-1.8-1.1c-0.8,0.2-1.3,1-1.1,1.8l1.4,5.6c0.2,0.6,0.7,1.1,1.4,1.1c4.2,0.3,7.5,3.5,8.1,7.7c0.5,3.4-1.1,6.9-4.1,8.8c-0.5,0.3-0.8,1-0.7,1.6l1.1,4.6h-4.5c-0.7,0-1.3,0.4-1.4,1.1l-1.3,4.5c-0.2,0.8,0.2,1.6,1,1.9c0.1,0,0.3,0.1,0.4,0.1c0.7,0,1.3-0.4,1.4-1.1l1-3.4h5.2c0.5,0,0.9-0.2,1.2-0.6c0.3-0.4,0.4-0.8,0.3-1.3L-311,312.9z M-330.6,291.6l2.2-13.4c0.5-2.9,1.9-4.4,4.2-4.4c2.6,0,3.5,2,3.5,3.8c0,1.6-0.7,2.7-2.1,3.4c-0.7,0.4-1.1,1.3-0.7,2s1.3,1.1,2,0.7c2.5-1.2,3.8-3.4,3.8-6.1c0-3.4-2.2-6.8-6.5-6.8c-3.8,0-6.5,2.5-7.2,6.9l-2.2,13.4c-0.1,0.8,0.4,1.6,1.2,1.7c0.1,0,0.2,0,0.2,0C-331.4,292.9-330.7,292.4-330.6,291.6z"/></svg>',
  createdAt: new Date('2014-12-30 17:39:07'),
  updatedAt: new Date('2016-03-01 09:44:16'),
  options: {"tags": [16], "ingredients": [1861, 1862, 2060, 2392, 2647, 2670, 2734, 3069, 3134, 3139, 3302, 4358, 4411, 5112, 5121]}
},{
  id: 4,
  name: 'Végétarien',
  excludingName: 'chair animale',
  description: 'Tu as décidé de ne pas manger de viande, félicitations, c\'est une bonne nouvelle pour les animaux mais aussi <a href="#" onclick="window.open(\'http://www.alimentation-responsable.com/impact-des-modes-alimentaires-sur-lenvironnement-et-la-disponibilit%C3%A9-alimentaire-mondiale\', \'_system\');">pour la planète</a>. Ton combat est noble cher herbivore, mais ton parcours alimentaire doit être plein de défis au quotidien.<br/><br/>Pour t\'aider à trouver facilement les produits qui répondent à tes exigences, j\'ai exclu du régime "végétarien" toute chair animale mais également les produits qui en seraient dérivés. J\'ai également pris en compte les additifs alimentaires d\'origine animale ainsi que les additifs dont l\'origine ne peut pas être clairement identifiée (animale ou végétale). En revanche, les produits issus de processus de fabrication animale, comme oeufs, lait ou miel, ne seront pas exclus.<br/><br/>Nombreux sont les exemples où l\'origine animale ou végétale d\'un ingrédient ne peut pas être clairement établie. Même le fabriquant du produit en question ne saurait parfois affirmer l\'origine de l\'additif. La solution ultime est d\'appeler le producteur de l\'additif en question.<br/><br/>Tous les additifs exclus ont été vérifiés à la main, en comparant plusieurs sources d\'information.',
  color: '#84c99e',
  pictureSvg: '<svg version="1.1" x="0px" y="0px" viewBox="-361.9 248.6 83.8 73.3" style="enable-background:new -361.9 248.6 83.8 73.3;" xml:space="preserve"><path d="M-281.1,288.7C-281.1,288.7-281.1,288.7-281.1,288.7c-0.3-0.3-0.5-0.4-0.7-0.6c0.5-0.6,0.9-1.3,1.2-2.1c2.1-4.9-0.2-10.6-5-12.7c-0.1,0-0.1-0.1-0.2-0.1c0,0,0,0,0-0.1c0-0.1,0-0.1,0-0.2c0,0,0-0.1,0-0.1c0.8-4.4-1.4-8.9-5.6-10.7c-3-1.3-6.5-0.9-9.2,0.9c0,0,0,0,0-0.1c-0.3-6.6-3.9-10.9-9.7-11.4c-1.9-0.2-3.8,0.4-5.5,1.6c-1.8-2.8-4.9-4.6-8.3-4.6c-4,0-7.6,2.5-9.1,6.2c-3.5,0.8-6,3.9-6,7.6c0,0.3,0,0.5,0.1,0.9c-2.7-2-6.4-2.5-9.5-1.1c-4.2,1.8-6.5,6.3-5.6,10.7c0,0.1,0,0.1,0,0.2c0,0.1,0,0.1,0,0.2c0,0,0,0,0,0.1c-0.1,0-0.1,0.1-0.2,0.1c-4.9,2.1-7.1,7.8-5,12.7c0.3,0.8,0.7,1.4,1.2,2.1c-0.2,0.2-0.5,0.4-0.7,0.6c0,0,0,0,0,0.1c-2.8,2.7-3.8,7-2.2,10.8c1.6,3.7,5.4,6,9.4,5.8c12.1,16,30.5,16.6,31.3,16.6c0,0,0,0,0,0c0.1,0,0.2,0,0.4-0.1c0.1,0,0.2,0.1,0.4,0.1c0,0,0,0,0,0c0.8,0,19.2-0.6,31.3-16.6c4,0.2,7.8-2.1,9.4-5.8C-277.3,295.7-278.3,291.4-281.1,288.7z M-331.9,257.6c0.6-0.1,1.1-0.5,1.3-1.1c0.8-2.9,3.6-5,6.6-5c2.8,0,5.4,1.8,6.4,4.5c0.2,0.5,0.6,0.8,1.1,0.9c0.5,0.1,1,0,1.3-0.4c0.8-0.8,2.6-2.2,4.7-2c5.2,0.4,6.5,4.7,6.9,7.4c-1.1-0.4-2.2-0.6-3.4-0.6c-3.9,0-7.3,2.3-8.9,5.8c-1.7,3.8-0.6,8.3,2.4,11c-0.4,0.5-0.7,1.1-0.9,1.7c-0.4,1-0.7,2.1-0.8,3.2c-0.3,0-0.5,0-0.8,0c-1.5,0-2.9,0.3-4.2,1c-1.5-0.7-3.2-1.1-4.9-0.9c-0.1-1.1-0.3-2.2-0.8-3.2c-0.3-0.6-0.6-1.2-0.9-1.7c3-2.7,4.1-7.2,2.4-11c-1-2.4-2.9-4.2-5.3-5.1c-2.2-0.9-4.5-0.9-6.7-0.1C-335.9,259.6-334.2,257.8-331.9,257.6z M-349.8,302.9c-0.3-0.4-0.9-0.7-1.4-0.6c-3,0.5-6-1.2-7.2-4c-1.2-2.7-0.4-5.8,1.7-7.7c0.2-0.2,0.4-0.3,0.6-0.4c0.1-0.1,0.2-0.1,0.3-0.2c0.3-0.2,0.6-0.4,0.9-0.5c0.9-0.4,1.9-0.6,2.9-0.5c0.8,0,1.5-0.6,1.5-1.4c0-0.8-0.6-1.5-1.4-1.5c-1.3,0-2.5,0.2-3.7,0.6c-0.5-0.5-0.9-1.1-1.2-1.8c-1.5-3.4,0.1-7.4,3.5-8.8c0.1,0,0.1,0,0.2-0.1c0.5,0.8,1,1.5,1.7,2.1c0.3,0.3,0.6,0.4,1,0.4c0.4,0,0.8-0.2,1.1-0.5c0.6-0.6,0.5-1.5-0.1-2.1c-0.7-0.6-1.2-1.4-1.6-2.2c0,0,0,0,0,0c0,0,0,0,0,0c-1.4-3.4,0.2-7.3,3.5-8.8c2.1-0.9,4.6-0.6,6.5,0.7c-0.6,0.8-1,1.8-1.3,2.8c-0.2,0.8,0.2,1.6,1,1.8c0.1,0,0.3,0.1,0.4,0.1c0.6,0,1.2-0.4,1.4-1.1c0.3-1.1,1-2.2,1.8-3c0.1-0.1,0.1-0.1,0.2-0.2c0.1-0.1,0.2-0.2,0.3-0.3c0.1-0.1,0.1-0.1,0.2-0.2c0.1-0.1,0.3-0.2,0.4-0.3c0.1,0,0.1-0.1,0.2-0.1c0.2-0.1,0.4-0.2,0.6-0.3c0,0,0,0,0,0c1.6-0.7,3.5-0.7,5.1-0.1c1.7,0.7,3,1.9,3.7,3.6c1.3,3,0.2,6.6-2.6,8.4c-0.4,0.2-0.6,0.6-0.7,1.1c-0.1,0.4,0.1,0.9,0.4,1.2c0.6,0.6,1.1,1.3,1.4,2.1c0.4,0.9,0.6,1.8,0.5,2.8c0,0-0.1,0-0.1,0.1c-1.3,0.6-2.4,1.4-3.4,2.4c-0.5,0.6-0.5,1.5,0.1,2.1c0.3,0.2,0.6,0.4,1,0.4c0.4,0,0.8-0.2,1.1-0.5c0.7-0.7,1.4-1.3,2.3-1.7c0.3-0.1,0.5-0.2,0.8-0.3c1-0.3,2.1-0.3,3.1-0.1c-0.8,0.8-1.4,1.7-1.8,2.8c-2.1,4.9,0.2,10.6,5,12.7c0,0,0,0,0.1,0c1.3,3.8,2.1,9.7-0.9,17.1c0,0,0,0-0.1-0.1c-8.7-5.4-13.6-12.2-16.5-18.6l4.1-5.1c0.5-0.6,0.4-1.5-0.2-2.1c-0.6-0.5-1.5-0.4-2.1,0.2l-3.1,3.8c-0.8-2.2-1.3-4.4-1.6-6.4c0,0,0,0,0,0l4.5-5.5c0.5-0.6,0.4-1.5-0.2-2.1c-0.6-0.5-1.6-0.4-2.1,0.2l-2.7,3.4c-0.3-4.3,0.1-7.2,0.1-7.5c0.1-0.8-0.4-1.5-1.2-1.7c-0.8-0.1-1.5,0.4-1.7,1.2c0,0.1-0.5,3.6,0,8.8l-3-1.2c-0.8-0.3-1.6,0.1-1.9,0.8c-0.3,0.8,0.1,1.6,0.8,1.9l4.5,1.7c0.4,2.3,1,4.8,1.9,7.4l-3.9-0.7c-0.8-0.1-1.6,0.4-1.7,1.2c-0.1,0.8,0.4,1.6,1.2,1.7l5.7,1c2.5,5.7,6.5,11.6,13,16.8C-332.8,316.5-342.7,312.7-349.8,302.9z M-281.6,298.3c-1.1,2.5-3.5,4.1-6.2,4.1c-0.3,0-0.7,0-1-0.1c-0.5-0.1-1.1,0.1-1.4,0.6c-7.1,9.8-17,13.6-23.3,15.1c6.5-5.1,10.5-11.1,13-16.7l5.7-1c0.8-0.1,1.3-0.9,1.2-1.7c-0.1-0.8-0.9-1.3-1.7-1.2l-3.9,0.7c0.9-2.6,1.5-5.1,1.9-7.4l4.5-1.7c0.8-0.3,1.1-1.1,0.8-1.9c-0.3-0.8-1.1-1.1-1.9-0.8l-3,1.2c0.5-5.2,0-8.7,0-8.8c-0.1-0.8-0.9-1.3-1.7-1.2c-0.8,0.1-1.3,0.9-1.2,1.7c0,0.1,0.4,3,0.1,7.4l-2.7-3.3c-0.5-0.6-1.4-0.7-2.1-0.2c-0.6,0.5-0.7,1.4-0.2,2.1l4.4,5.5c-0.4,2-0.9,4.1-1.6,6.3l-3-3.7c-0.5-0.6-1.4-0.7-2.1-0.2c-0.6,0.5-0.7,1.4-0.2,2.1l4,5c-2.5,5.7-6.7,11.7-13.7,16.8c2.2-7.3,1.1-13.1-0.4-16.9c-0.2-0.4-0.5-0.7-0.9-0.9c-0.2-0.1-0.3-0.1-0.5-0.2c-3.4-1.5-5-5.4-3.5-8.8c0.5-1.3,1.5-2.3,2.6-3c0.1,0,0.2-0.1,0.3-0.2c1-0.5,2.1-0.8,3.2-0.8c0.6,0,1.3,0.1,1.9,0.3c0.3,0.1,0.5,0.2,0.8,0.3c0.9,0.4,1.7,1,2.3,1.7c0.3,0.3,0.7,0.5,1.1,0.5c0.3,0,0.7-0.1,1-0.4c0.6-0.5,0.7-1.5,0.1-2.1c-0.9-1-2.1-1.9-3.4-2.4c0,0-0.1,0-0.1-0.1c0-0.9,0.2-1.9,0.5-2.8c0.3-0.8,0.8-1.5,1.4-2.1c0.3-0.3,0.5-0.8,0.4-1.2c-0.1-0.4-0.3-0.8-0.7-1.1c-2.8-1.7-3.9-5.3-2.6-8.4c1.1-2.5,3.5-4.1,6.2-4.1c0.9,0,1.8,0.2,2.7,0.6c0,0,0,0,0,0c0.2,0.1,0.4,0.2,0.6,0.3c0.1,0,0.1,0.1,0.2,0.1c0.1,0.1,0.3,0.2,0.4,0.3c0.1,0.1,0.1,0.1,0.2,0.2c0.1,0.1,0.2,0.2,0.3,0.3c0.1,0.1,0.2,0.1,0.2,0.2c0.8,0.8,1.4,1.8,1.8,3c0.2,0.6,0.8,1.1,1.4,1.1c0.1,0,0.3,0,0.4-0.1c0.8-0.2,1.2-1,1-1.8c-0.3-1-0.7-2-1.3-2.8c1.9-1.3,4.4-1.6,6.5-0.7c3.4,1.5,5,5.4,3.5,8.8c0,0,0,0,0,0c0,0,0,0,0,0.1c-0.4,0.9-0.9,1.6-1.6,2.2c-0.6,0.6-0.6,1.5-0.1,2.1c0.3,0.3,0.7,0.5,1.1,0.5c0.4,0,0.7-0.1,1-0.4c0.7-0.6,1.2-1.3,1.7-2.1c0.1,0,0.1,0,0.2,0.1c3.4,1.5,5,5.4,3.5,8.8c-0.3,0.7-0.7,1.3-1.2,1.8c-1.2-0.4-2.4-0.7-3.7-0.6c-0.8,0-1.4,0.7-1.4,1.5c0,0.8,0.7,1.5,1.5,1.4c1,0,2,0.2,2.9,0.5c0.3,0.1,0.6,0.3,0.9,0.5c0.1,0.1,0.2,0.1,0.3,0.2c0.2,0.1,0.4,0.3,0.6,0.4C-281.2,292.5-280.4,295.6-281.6,298.3z"/></svg>',
  createdAt: new Date('2015-03-29 18:17:46'),
  updatedAt: new Date('2016-03-01 09:44:16'),
  options: {"tags": [26, 27, 36]}
},{
  id: 5,
  name: 'Végétalien',
  excludingName: 'origine animale',
  description: 'Tu as décidé de ne pas manger de viande, de produits dérivés, ni aucun produit issu de production animale. Bravo, ton engagement nécessite du courage et une volonté de fer et il est une très bonne nouvelle pour les animaux et <a href="#" onclick="window.open(\'http://www.alimentation-responsable.com/impact-des-modes-alimentaires-sur-lenvironnement-et-la-disponibilit%C3%A9-alimentaire-mondiale\', \'_system\');">pour la planète</a>.<br/><br/>En revanche, ton parcours alimentaire doit être plein de défis au quotidien. Pour t\'aider à trouver facilement les produits qui répondent à tes exigences, j\'ai exclu du régime "végétalien" toute chair animale terrestre, marine ou volante, les dérivés de ces produits ainsi que tout ingrédient issu d\'un processus de fabrication animale : les oeufs, les sécrétions animales comme miel ou lait, par exemple. J\'ai également pris en compte les additifs alimentaires d\'origine animales ainsi que les additifs dont l\'origine ne peut pas être clairement identifiée (animale ou végétale).<br/><br/>Nombreux sont les exemples où l\'origine animale ou végétale d\'un ingrédient ne peut pas être clairement établie. Même le fabricant du produit en question ne saurait parfois affirmer l\'origine de l\'additif. La solution ultime est d\'appeler le producteur de l\'additif en question.<br/><br/>Tous les additifs exclus ont été vérifiés à la main, en comparant plusieurs sources d\'information.',
  color: '#93dec3',
  pictureSvg: '<svg version="1.1" x="0px" y="0px" viewBox="-359.4 254.9 76.8 60.9" style="enable-background:new -359.4 254.9 76.8 60.9;" xml:space="preserve"><g><path d="M-284.5,285.8c2-4.7,0.1-9.4-0.3-10.4c-0.9-3-2.6-5.2-5-6.4c-0.8-0.4-1.7-0.7-2.5-0.9c3.7-2.3,6.1-2.9,6.2-2.9l2-0.5l-2.5-8.8l-1.7,0.2c-2.2,0.2-5.6,1-8.1,1.6l-1.1-2.8l-1.6,0.2c-9.8,1.1-16.3,9.8-18.9,14c-3.1-2.3-6.2-3.5-9.3-3.7c-0.4-2.4-1.5-6.3-5-7.9l-1.7,3.6c1.5,0.7,2.3,2.9,2.6,4.6c-1.1,0.3-2.2,0.7-3.2,1.1c-3-2.2-5.7-2.9-8.1-2.1c-4.1,1.5-5.1,6.8-5.2,7.3l0.3,0.1c-0.1,0-0.2,0.1-0.4,0.1c-0.8-1.3-2.6-3.7-5.9-4.8l-1.2,3.8c1.6,0.5,2.6,1.5,3.2,2.2c-0.2,0.1-0.4,0.2-0.5,0.2c-5.2,2.1-5.7,8-5,12.1h-2.1v2c0,15.4,17.2,27.9,38.4,27.9c21.2,0,38.4-12.5,38.4-27.9v-2L-284.5,285.8L-284.5,285.8z M-291.7,272.6c1.5,0.8,2.5,2.1,3.1,4.1l0.1,0.3c0,0.1,2.3,4.9-0.6,8.8h-13c-0.8-1.8-1.9-6.1,0.9-10.7c1.1-1.1,2.2-2.1,3.2-3C-296.9,272-294,271.4-291.7,272.6z M-307,281.9c0.1,1.5,0.3,2.9,0.7,4h-3.5C-308.9,284.4-307.9,283.1-307,281.9z M-289.1,262c-3.3,1.3-10.3,4.9-18,13.7c2.9-6.2,7-11.1,9.1-13.5c1.5-0.4,5.4-1.4,8.4-1.9L-289.1,262z M-300.9,259.5c-3.5,3.9-11.9,14.4-13.4,26.4h-3c2.1-1.8,2.7-3.4,2.9-3.9c1.4-4.3,0.7-7.6-0.7-9.9C-313.5,269.3-308.5,261.6-300.9,259.5z M-319.9,272.5c0,0,3.6,2.4,1.7,8.2l-0.1,0.2c0,0-1.1,3.1-8,5h-7.7c-0.1-5.1-1.3-8.9-3.7-11.2c0.9-1.1,3.8-4.5,8-5.2c3.1-0.5,6.3,0.5,9.6,3L-319.9,272.5z M-341.2,268.5c0.8-0.3,1.9,0,3.1,0.7c-1.6,1.4-2.7,2.7-3.1,3.3c-0.8-0.3-1.6-0.4-2.5-0.5C-343.2,270.8-342.4,269-341.2,268.5z M-350.8,277.4l0.2-0.1c0.1,0,5.7-2.8,9.2-0.6c2.6,1.6,3.3,5.6,3.4,9.1h-15.2C-353.6,284-354.3,278.8-350.8,277.4z M-321,311.7c-18,0-32.8-9.6-34.3-21.9h68.5C-288.2,302.1-303,311.7-321,311.7z"/></g></svg>',
  createdAt: new Date('2015-03-29 18:17:46'),
  updatedAt: new Date('2016-03-01 09:44:16'),
  options: {"tags": [5, 36, 19]}
},{
  id: 6,
  name: 'Sans additifs à risque',
  excludingName: 'additifs à risque',
  description: 'Le terme « additifs alimentaires » regroupe tous les ingrédients ajoutés aux produits alimentaires de base dans le but d\'en améliorer la conservation, la couleur, la texture, le goût et l\'aspect. Ce sont divers colorants, conservateurs, exhausteurs de goût, antioxydants, etc...<br/><br/>J\'ai créé le régime « sans additifs à risque » pour nous tous qui voulons manger plus sainement à commencer par éviter les additifs qui présentent un risque de nocivité et notamment de « pas ou peu de risque » à « risque très important » :<br/><br/><div class="flexCol padding toxic-tab"><div class="flexRow toxic-0"><div class="toxic-circle"><div></div></div><p class="flex1 flex-middle toxic-title">Pas ou peu de risque</p></div><div class="flexRow toxic-1"><div class="toxic-circle"><div></div></div><p class="flex1 flex-middle toxic-title">Risque modéré</p></div><div class="flexRow toxic-2"><div class="toxic-circle"><div></div></div><p class="flex1 flex-middle toxic-title">Risque incertain</p></div><div class="flexRow toxic-3"><div class="toxic-circle"><div></div></div><p class="flex1 flex-middle toxic-title">Risque sérieux</p></div><div class="flexRow toxic-4"><div class="toxic-circle"><div></div></div><p class="flex1 flex-middle toxic-title">Risque très important</p></div></div><br/>Il est important de savoir que même la filière « BIO » autorise quelques additifs toxiques. Deux d\'entre eux sont même classés très toxiques :<br/>E250 ou nitrite de sodium<br/>E252 ou nitrate de potassium ou salpêtre<br/><br/>Voici un <a href="#" onclick="window.open(\'http://blog.kwali.to/seulement-80-de-386-additifs-alimentaires-autorises-ne-sont-pas-toxiques/\', \'_system\');">article clair et concis</a> pour connaître le nécessaire sur les 386 additifs autorisés en UE (et France), et <a href="#" onclick="window.open(\'http://www.additifs-alimentaires.net/\', \'_system\');">un site bien documenté</a> et régulièrement mis à jour, pour avoir beaucoup plus d\'informations sur les additifs. Il est également notre référence quant au risque de nocivité qu\'ils peuvent présenter.',
  color: '#919dbf',
  pictureSvg: '<svg version="1.1" x="0px" y="0px" viewBox="-349.3 255.9 58.7 74.7" style="enable-background:new -349.3 255.9 58.7 74.7;" xml:space="preserve"><path d="M-310.4,284v-19c1.8-0.6,3.1-2.4,3.1-4.4c0-2.6-2.1-4.7-4.7-4.7h-16c-2.6,0-4.7,2.1-4.7,4.7c0,2,1.3,3.8,3.1,4.4v19l-17.7,30.8c-2.4,4.1-2.7,8-0.9,11.1c1.8,3,5.3,4.7,10,4.7h36.4c4.7,0,8.3-1.7,10-4.7c1.8-3,1.4-7-0.9-11.1L-310.4,284zM-294.4,324.3c-1.2,2.1-3.8,3.2-7.4,3.2h-36.4c-3.6,0-6.2-1.1-7.4-3.2c-1.2-2-0.9-4.9,0.9-8l18-31.1c0.1-0.2,0.2-0.5,0.2-0.7V264c0-0.1,0-0.1,0-0.2c0-0.8-0.7-1.5-1.5-1.5c-0.9,0-1.7-0.7-1.7-1.7c0-0.9,0.7-1.7,1.7-1.7h16.1c0.9,0,1.7,0.7,1.7,1.7c0,0.9-0.7,1.7-1.7,1.7c-0.8,0-1.5,0.7-1.5,1.5c0,0.1,0,0.2,0,0.2v3.2h-4.3c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5h4.3v4.8h-4.3c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5h4.3v4.8h-4.3c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5h4.9l2.8,4.8h-7.6c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5h9.4l13,22.6C-293.5,319.4-293.2,322.3-294.4,324.3z"/><path d="M-309.2,299.1h-21.5c-2,3.4-10.7,18.5-10.7,18.5c-2.1,3.7-0.4,6.8,3.9,6.8h35c4.3,0,6-3,3.9-6.8C-298.6,317.7-307.3,302.5-309.2,299.1z"/></svg>',
  createdAt: new Date('2015-01-16 12:44:21'),
  updatedAt: new Date('2016-03-01 09:44:16'),
  options: {"type": "slide", "default": {"id": 1}, "options": [{"id": 0, "name": "pas ou peu de risque", "tags": [31, 32, 33, 34, 35]}, {"id": 1, "name": "risque modéré", "tags": [31, 33, 34, 35]}, {"id": 2, "name": "risque incertain", "tags": [31, 34, 35]}, {"id": 3, "name": "risque sérieux", "tags": [34, 35]}, {"id": 4, "name": "risque très important", "tags": [35]}]}
},{
  id: 8,
  name: 'Sans lactose',
  excludingName: 'lactose',
  description: 'Le <a href="#" onclick="window.open(\'http://www.ameli-sante.fr/intolerance-au-lactose/intolerance-au-lactose-definition-et-symptomes.html\', \'_system\');">lait</a> n\'est pas ton ami, je l\'ai bien compris. Dans un pays qui vénère le fromage, ton alimentation « sans lactose » te pose plein de défis au quotidien.<br/><br/>Pour t\'aider à trouver des produits adaptés de façon simple et rapide, j\'exclus de ce régime « sans lactose » le lait, les produits à base de lait, ainsi que tous les additifs alimentaires qui en sont dérivés.<br/><br/>Comme le lait (et le lactose) figure parmi les 14 allergènes les plus répandus, la bonne nouvelle est que <a href="#" onclick="window.open(\'http://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/Allergene-alimentaire\', \'_system\');">la loi</a> impose aux fabricants de mentionner la présence du lait (et de la lactose) sur les produits qui en contiennent.',
  color: '#71beb4',
  pictureSvg: '<svg version="1.1" x="0px" y="0px" viewBox="-400 253.7 39.4 88.6" style="enable-background:new -400 253.7 39.4 88.6;" xml:space="preserve"><path d="M-364.1,278l-0.1-0.1c-1.2-2.6-3.5-7.3-4.7-9.5c-0.6-1-1.2-6.7-1.1-5.2c1.9-0.4,3.4-2.1,3.4-4.2c0-2.4-1.9-4.3-4.3-4.3h-18.7c-2.4,0-4.3,1.9-4.3,4.3c0,2,1.5,3.8,3.4,4.2c0,0-0.3,3.8-1.1,5.2c-1.3,2.3-3.8,7.4-4.8,9.5c-0.1,0.1,0.8,0.3,0.7,0.6h-0.1l-1,0.3c-0.8,1.6-2.2,5.3-2.2,10.5v43.1c0.1,3.1,2.1,8.9,8.7,8.9h20c6.6,0,8.6-5.9,8.7-9v-43C-361.6,282.8-363.7,278.7-364.1,278z M-370.3,339.3h-19.9c-5.1,0-6.6-4.6-6.7-7v-43c0-4,0.9-7.1,1.6-8.8h30.2c0.7,1.7,1.6,4.7,1.6,8.8v42.9C-363.6,332.6-363.9,339.3-370.3,339.3z M-389.6,256.8h18.7c1.3,0,2.3,1,2.3,2.3c0,0.9-0.6,1.7-1.3,2.1c-0.3,0.1-0.6,0.2-0.9,0.2h-0.1h-18.6h-0.1c-0.3,0-0.6-0.1-0.9-0.2c-0.8-0.4-1.3-1.1-1.3-2.1C-391.9,257.8-390.8,256.8-389.6,256.8z M-388.5,263.3h16.5c0.1,1.5,0.3,4.3,1.3,6.1c0.9,1.5,2.5,4.9,4.6,9.1h-28.3c1.1-2.2,3.4-7,4.6-9.1C-388.8,267.6-388.5,264.9-388.5,263.3z"/></svg>',
  createdAt: new Date('2015-03-11 20:34:29'),
  updatedAt: new Date('2016-03-01 09:44:16'),
  options: {"tags": [19], "ingredients": [1931, 1935, 2257, 2342, 2349, 2358, 2391, 2404, 2407, 2413, 2658, 2777, 2842, 2890, 2891, 3165, 3313, 4490, 4617, 4760, 4882]}
},{
  id: 9,
  name: 'Sans porc',
  excludingName: 'porc',
  description: 'Je comprends bien l\'importance que tu attaches à ton alimentation "sans porc".<br/>Pour que cet impératif soit bien respecté, j\'ai exclu du régime "sans porc" tous les ingrédients contenant du « porc » ou « porcine », tous les additifs alimentaires issus du porc, ainsi que les additifs dont l\'origine ne peut pas être clairement identifiée (animale dont porc ou végétale).<br/><br/>Il ne manque pas d\'exemples où l\'origine animale (porc ou autre animal) ou végétale d\'un ingrédient ne peut pas être clairement établie. Même le fabricant du produit en question ne saurait parfois affirmer l\'origine de l\'additif. La solution ultime est d\'appeler le producteur de l\'additif en question.<br/><br/>Tous les additifs exclus ont été vérifiés à la main, en comparant plusieurs sources d\'informations.',
  color: '#f07e8c',
  pictureSvg: '<svg version="1.1" x="0px" y="0px" viewBox="-579 402.7 32.9 37.2" style="enable-background:new -579 402.7 32.9 37.2;" xml:space="preserve"><g><path d="M-549,414.2c-0.1-0.1-0.4-0.6-0.4-0.7v-6c0-2.5-3.2-4.2-3.9-4.5l-0.3-0.2l-0.6,0.2c-0.7,0.3-4.3,2-4.3,4.5v0.1c-1-0.4-2.7-0.6-4.1-0.6c-1.5,0-2.9,0.2-4.4,0.6c-0.1,0-0.4,0.1-0.5,0.1c0.1,0,0-0.1,0-0.1v-0.2c0-2.5-3.2-4.2-3.9-4.5l-0.3-0.2l-0.5,0.2c-0.7,0.3-4.3,2-4.3,4.5v7.7c0-0.2,0.5-1.3,0.6-1.5c-0.1,0.2-0.2,0.3-0.3,0.5c-1.8,2.6-2.8,5.9-2.8,9.3c0,9.1,7.4,16.5,16.5,16.5c9.1,0,16.4-7.4,16.4-16.5C-546,420-547.1,416.8-549,414.2z M-556.4,407.5c0-0.8,1.3-1.9,2.5-2.5c1.2,0.6,2.5,1.7,2.5,2.5v4.1c0-0.4-5-3.2-5-3.3V407.5z M-574.4,407.5c0-0.8,1.3-1.9,2.5-2.5c1.2,0.6,2.5,1.7,2.5,2.5v0.8c-1,0.4-2.9,1.4-5,3.5V407.5z M-562.4,438c-8,0-14.5-6.5-14.5-14.5s6.5-14.5,14.5-14.5s14.5,6.5,14.5,14.5S-554.4,438-562.4,438z"/><path d="M-562.4,421.7c-3.8,0-6.9,3.1-6.9,6.9s3.1,6.9,6.9,6.9s6.9-3.1,6.9-6.9S-558.6,421.7-562.4,421.7z M-562.4,433.5c-2.7,0-4.9-2.2-4.9-4.9c0-2.7,2.2-4.9,4.9-4.9s4.9,2.2,4.9,4.9S-559.7,433.5-562.4,433.5z"/><circle cx="-567.4" cy="418.3" r="1.3"/><circle cx="-557.4" cy="418.3" r="1.3"/><circle cx="-565.1" cy="428.6" r="1.3"/><circle cx="-559.7" cy="428.6" r="1.3"/></g></svg>',
  createdAt: new Date('2015-10-16 15:53:21'),
  updatedAt: new Date('2016-03-01 09:44:16'),
  options: {"ingredients": [1672, 1676, 1744, 1852, 1853, 1854, 1855, 1856, 1857, 1858, 1862, 1898, 1904, 2061, 2064, 2077, 2079, 2080, 2081, 2082, 2083, 2084, 2085, 2086, 2087, 2088, 2089, 2091, 2092, 2093, 2094, 2119, 2133, 2134, 2135, 2137, 2262, 2364, 4786, 4854, 5107, 5108]}
},{
  id: 10,
  name: 'Sans huile de palme',
  excludingName: 'palme',
  description: 'Bravo pour ton engagement « sans huile de palme ».<br/>Loin d\'être exemplaire sur le plan nutritionnel, car elle contient trop d\'acides gras saturés qui provoquent des problèmes vasculaires, cette huile est très rentable pour les industriels et en conséquence aujourd\'hui principale cause de déforestation néfaste en Indonésie et en Malaisie.<br/><br/>Pour t\'aider à être fidèle à ton engagement facilement, je te permets de bannir en un clic tous les ingrédients issus d\'huile de palme y compris les additifs alimentaires.<br/><br/>Attention aussi au terme « huile végétale ». Quand il est affiché sans plus de précisions sur les étiquettes, il cache souvent l\'huile de palme, que les industriels, de plus en plus montrés du doigt, n\'affichent plus pour éviter la polémique.<br/>Un <a href="#" onclick="window.open(\'http://www.lefigaro.fr/conjoncture/2015/06/17/20002-20150617ARTFIG00167-de-quoi-l-huile-de-palme-est-elle-coupable.php\', \'_system\');">article clair et concis</a> sur les effets néfastes d\'huile de palme.<br/><br/>Heureusement, toutes les huiles de palme ne sont pas pareilles. Environ 20% de la production mondiale portent aujourd\'hui la certification RSPO (responsable), créée en 2003 par plusieurs ONG et des professionnels.',
  color: '#cad88f',
  pictureSvg: '<svg version="1.1" x="0px" y="0px" viewBox="38.654 -4.171 946.691 1032.343" enable-background="new 38.654 -4.171 946.691 1032.343" xml:space="preserve"><path d="M549.17,1028.172l15.932-37.41l39.223-102.26c2.801-5.604,1.4-12.607-1.401-18.211s-8.405-9.806-15.409-9.806l-22.413-2.802l32.219-95.256c1.401-5.604,1.401-12.607-2.802-18.211s-9.807-8.404-15.409-9.806l-22.413-2.802l39.223-89.652c2.802-5.604,2.802-12.607-1.4-18.211c-2.803-5.603-8.406-9.806-15.41-11.206l-16.81-2.802l39.223-74.243c2.802-5.604,2.802-12.607,0-18.21l0,0c102.26,51.83,161.095,242.342,161.095,243.742c2.802,8.404,11.206,15.409,19.611,15.409l0,0c8.404,0,16.811-5.604,19.611-14.009c35.021-103.66,33.619-194.713-2.802-270.357c-21.013-40.624-49.028-71.442-75.645-92.455c137.28,22.414,225.532,112.066,225.532,113.467c5.604,7.004,15.409,8.405,23.814,4.203c8.405-4.203,12.607-12.607,12.607-21.014c-8.405-110.664-47.628-190.511-114.867-236.738c-79.848-56.032-177.904-47.627-219.93-39.223c-18.211-88.251-56.033-151.288-114.867-187.71C443.227-26.234,336.765,3.184,332.562,3.184c-7.004,2.802-14.008,8.405-15.409,16.81c-1.401,8.405,1.401,15.409,7.004,21.013c57.434,44.826,89.653,93.855,106.463,131.677c-75.645-56.032-148.487-79.847-217.127-68.64c-113.466,18.21-169.5,124.673-172.301,128.875c-4.202,7.005-2.802,15.41,1.401,22.414c5.603,7.004,12.607,9.806,21.012,8.404c75.645-15.408,162.496,2.803,225.532,22.414c-44.826,9.806-81.247,30.818-107.863,63.036c-78.446,95.256-40.624,256.351-39.223,263.354c2.802,8.404,9.806,15.409,19.611,16.811c9.806,0,18.21-4.203,21.012-12.607c50.43-126.074,140.082-149.889,198.917-149.889c-4.203,5.604-7.004,11.207-5.604,18.211l19.611,98.057l-11.206-1.4c-7.004-1.4-14.008,1.4-19.611,7.004c-5.604,5.604-7.004,12.607-4.203,19.611l28.017,107.863l-36.421-5.603c-7.004,0-12.607,1.401-18.21,7.004c-5.604,5.603-7.004,11.206-5.604,18.21l19.612,93.855l-14.008-1.4c-7.004-1.401-12.607,1.4-16.81,5.604c-4.202,4.201-7.004,11.206-5.604,16.81l16.81,140.082l4.401,37.409H549.17l-28.896-37.409 M174.272,536.895c-1.401-49.028,4.202-116.268,43.426-162.495c35.021-42.024,92.454-58.834,172.301-53.23c9.806,1.4,19.611-5.604,22.413-15.409c2.802-9.807-1.401-19.611-11.207-23.814c-7.004-2.802-151.289-74.243-291.371-65.839c23.814-26.615,61.636-61.636,116.268-70.041c71.442-11.206,151.289,23.814,236.739,105.062c7.004,5.604,15.409,7.004,23.814,4.203c8.405-4.203,12.607-12.607,11.207-21.013c0-4.202-11.207-102.26-109.264-194.714c33.62-1.401,82.648,1.4,126.074,29.417c51.83,33.62,85.45,93.855,99.458,180.706c1.401,5.604,4.202,11.206,9.806,14.008s11.207,4.202,16.811,2.802c1.4,0,120.471-32.219,207.321,28.017c44.826,30.818,74.243,82.648,88.251,151.289c-56.032-42.025-161.094-102.26-299.775-93.855c-9.806,0-18.21,8.404-19.611,18.21c-1.4,9.806,4.203,19.612,14.008,22.413c1.401,0,86.852,29.418,130.277,116.269c25.214,50.43,30.818,109.264,18.21,176.503C743.006,601.332,667.361,461.25,549.692,461.25c-11.206,0-21.013,9.806-21.013,21.012c0,2.803,0,5.604,1.401,8.406l-79.847-18.211c5.603-2.803,9.806-7.004,12.607-12.607c2.802-11.207-2.802-22.414-14.008-26.615C446.031,431.834,275.131,381.404,174.272,536.895z M422.217,508.879l130.277,32.219l-32.219,63.037l-81.248-14.009L422.217,508.879z M408.209,626.548l8.405,1.401l0,0l128.876,21.012l-33.62,77.045l-79.847-7.004L408.209,626.548z M375.99,755.424l170.9,18.21l-26.615,78.446L392.8,835.27L375.99,755.424z M384.395,875.895l170.9,22.412l-35.02,92.455H368.986l-14.008-117.67"/>',
  createdAt: new Date('2015-10-16 15:55:44'),
  updatedAt: new Date('2016-03-01 09:44:16'),
  options: {"ingredients": [1744, 2064, 2094, 2119, 2628, 5406]}
},{
  id: 11,
  name: 'Sans arachides',
  excludingName: 'arachide',
  description: 'Comme tu le sais probablement, l\'arachide fait partie de la famille des légumineuses et n\'est pas dans la famille des noix ou fruits à coques. Ainsi, si tu es allergique aux arachides tu peux tout de même consommer des amandes, des pistaches, des noix du Brésil, des noix de cajous, des noisettes, des noix macadamia, des pignons de pin, des pistaches, des noix... <br/><br/>Pour t\'aider à l\'éviter facilement, j\'exclus du régime "sans arachides", automatiquement "arachide" et toutes ses dénominations : cacahuète, cacahouète, pois de terre, pistache de terre, pinotte (comme on dit au Québec), ainsi que tous les dérivés de cet aliment.<br/><br/>Par ailleurs, le risque de contamination croisée entre les noix ou fruits à coques et les arachides est très élevé car les arachides sont souvent manipulées et distribuées par les entreprises spécialisées dans les noix. Il est donc conseillé d\'éviter les noix et fruits à coques ou de s\'informer adéquatement auprès du fabricant des risques potentiels. Comme l\'arachide figure parmi les 14 allergènes les plus répandus, la bonne nouvelle est que <a href="#" onclick="window.open(\'http://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/Allergene-alimentaire\', \'_system\');">la loi</a> impose aux fabricants de mentionner la présence des arachides sur les produits qui en contiennent.',
  color: '#e3605a',
  pictureSvg: '<svg version="1.1" x="0px" y="0px" viewBox="-395.5 274.8 47 47" style="enable-background:new -395.5 274.8 47 47;" xml:space="preserve"><g><path d="M-382.6,321.8L-382.6,321.8c-3.6,0-6.9-1.3-9.2-3.7c-5.5-5.5-4.7-15.2,1.8-21.7c1.6-1.6,3.4-2.9,5.4-3.8c3.3-1.5,6-3.8,7.7-6.6c1-1.5,2.2-3,3.5-4.4c4.3-4.3,9.7-6.8,14.6-6.8c3,0,5.6,1,7.5,2.8c5,5,3.2,14.9-4,22c-1.3,1.3-2.8,2.5-4.4,3.5c-2.8,1.8-5,4.4-6.6,7.7c-0.9,2-2.2,3.8-3.8,5.4C-373.5,319.8-378.1,321.8-382.6,321.8z M-358.8,276.8c-4.3,0-9.2,2.3-13.1,6.2c-1.2,1.2-2.3,2.6-3.2,4c-2,3.1-4.9,5.6-8.6,7.3c-1.8,0.8-3.4,2-4.9,3.4c-5.7,5.7-6.5,14.2-1.8,18.9c2,2,4.8,3.1,7.8,3.1c4,0,8-1.8,11.1-4.9c1.4-1.4,2.6-3.1,3.4-4.9c1.7-3.6,4.2-6.6,7.3-8.6c1.4-0.9,2.8-2,4-3.2c6.4-6.4,8.2-15,4-19.2C-354.2,277.6-356.3,276.8-358.8,276.8z"/><path d="M-358.3,285.2c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l2.4-2.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-2.4,2.4C-357.8,285.1-358.1,285.2-358.3,285.2z"/><path d="M-373.5,294.2c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l2.4-2.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-2.4,2.4C-373,294.1-373.3,294.2-373.5,294.2z"/><path d="M-368.7,286.9c-0.4,0-0.8-0.2-0.9-0.6c-0.2-0.5,0-1.1,0.5-1.3l3.1-1.3c0.5-0.2,1.1,0,1.3,0.5c0.2,0.5,0,1.1-0.5,1.3l-3.1,1.3C-368.4,286.9-368.6,286.9-368.7,286.9z"/><path d="M-374.6,311.9c-0.4,0-0.8-0.2-0.9-0.6c-0.2-0.5,0-1.1,0.5-1.3l3.1-1.3c0.5-0.2,1.1,0,1.3,0.5c0.2,0.5,0,1.1-0.5,1.3l-3.1,1.3C-374.4,311.8-374.5,311.9-374.6,311.9z"/><path d="M-358.1,293.2c-0.2,0-0.4-0.1-0.6-0.2c-0.4-0.3-0.5-1-0.2-1.4l2-2.7c0.3-0.4,1-0.5,1.4-0.2s0.5,1,0.2,1.4l-2,2.7C-357.5,293.1-357.8,293.2-358.1,293.2z"/><path d="M-382.3,308.2c-0.4,0-0.7-0.2-0.9-0.6c-0.2-0.5,0-1.1,0.5-1.3l3.1-1.4c0.5-0.2,1.1,0,1.3,0.5c0.2,0.5,0,1.1-0.5,1.3l-3.1,1.4C-382,308.2-382.1,308.2-382.3,308.2z"/><path d="M-382.8,316.5c-0.4,0-0.8-0.3-1-0.7c-0.2-0.5,0.1-1.1,0.7-1.3l3.2-1c0.5-0.2,1.1,0.1,1.3,0.7c0.2,0.5-0.1,1.1-0.7,1.3l-3.2,1C-382.6,316.5-382.7,316.5-382.8,316.5z"/><path d="M-365.3,301c-0.1,0-0.2,0-0.3,0c-0.5-0.2-0.8-0.7-0.7-1.2l1-3.3c0.2-0.5,0.7-0.8,1.2-0.7c0.5,0.2,0.8,0.7,0.7,1.2l-1,3.3C-364.5,300.7-364.9,301-365.3,301z"/><path d="M-382.3,301c-0.3,0-0.6-0.2-0.8-0.4c-0.3-0.5-0.2-1.1,0.3-1.4l2.8-1.9c0.5-0.3,1.1-0.2,1.4,0.3s0.2,1.1-0.3,1.4l-2.8,1.9C-382,300.9-382.1,301-382.3,301z"/><path d="M-388.7,309.9c-0.1,0-0.2,0-0.3,0c-0.5-0.2-0.8-0.7-0.7-1.3l1-3.3c0.2-0.5,0.7-0.8,1.3-0.7c0.5,0.2,0.8,0.7,0.7,1.3l-1,3.3C-387.9,309.6-388.3,309.9-388.7,309.9z"/><path d="M-373,304.5c-0.2,0-0.4-0.1-0.6-0.2c-0.4-0.3-0.5-1-0.2-1.4l2.1-2.7c0.3-0.4,1-0.5,1.4-0.2s0.5,1,0.2,1.4l-2.1,2.7C-372.4,304.4-372.7,304.5-373,304.5z"/></g></svg>',
  createdAt: new Date('2015-10-16 15:57:46'),
  updatedAt: new Date('2016-03-01 09:44:16'),
  options: {"ingredients": [2408]}
},{
  id: 12,
  name: 'Sans fruits à coque',
  excludingName: 'fruit à coque',
  description: 'Ahh, ces petites noix, qui te cherchent des noises...<br/><br/>Pour t\'aider à les éviter facilement, j\'exclus de ce régime, automatiquement :<br/>arachides, cacahuète, noix, noix de cajou, noix de pecan, noix du Brésil, noix de macadamia, noix du Queensland, noix de Nangail, noisette, pistache, amande, pignon, châtaigne et marron.<br/><br/>Comme les fruits à coque figurent parmi les 14 allergènes les plus répandus, la bonne nouvelle est que <a href="#" onclick="window.open(\'http://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/Allergene-alimentaire\', \'_system\');">la loi</a> impose aux fabricants de mentionner la présence des fruits à coque sur les produits qui en contiennent.',
  color: '#c7b299',
  pictureSvg: '<svg version="1.1" x="0px" y="0px" viewBox="-365 244.5 88 81.6" style="enable-background:new -365 244.5 88 81.6;" xml:space="preserve"><path d="M-349.4,287c-4.9,3-15.4,12.7-15.6,18.9c0,3.4,0.4,5.5,1.5,8c3.1,7.6,10.5,12.2,18.2,12.2c2.5,0,5-0.5,7.5-1.5c7-2.9,13.3-6.9,18.8-11.8c4.3,5,13,11.2,24.4,11.2c4.1,0,11.5-0.8,16.2-2.8c1-0.4,1.5-1.6,1.1-2.6c-0.4-1-1.6-1.5-2.6-1.1c-15.7,6.6-31.1-1.5-36.2-7.4c1.4-1.4,2.7-2.8,3.9-4.3c4.1,3.8,13.1,8.5,21,8.8c0,0,0,0,0.1,0c1.1,0,2-0.9,2-1.9c0-1.1-0.8-2-1.9-2.1c-7.3-0.3-15.6-4.9-18.6-7.9c3.9-5.3,7.1-11.2,9.3-17.5c21,5.7,19.4,33.4,19.4,34.2c0,1.1,0.9,2,2,2c1.1,0,2-0.9,2-2c0-0.2,1.7-31.4-22.1-38c1.6-5.4,2.5-11,2.6-16.7c0.1-5.2-1.8-10.2-5.4-14.1c-3.6-3.8-8.5-6-13.7-6.1c-5.2-0.1-10.2,1.8-14.1,5.4c-3.8,3.6-6,8.5-6.1,13.7c-0.3,9.4-7.1,19.7-15.3,24.5c-1,0.6-1.3,1.8-0.7,2.7s1.8,1.3,2.7,0.7c9.4-5.4,17-17,17.3-27.8c0.1-4.2,1.9-8.1,4.9-10.9c3-2.9,7-4.4,11.2-4.3c4.2,0.1,8.1,1.9,10.9,4.9c2.9,3,4.4,7,4.3,11.2c-0.7,24.8-15.9,46.9-38.8,56.3c-8,3.3-17.2-0.5-20.4-8.5c-0.8-2-1.2-4.2-1.2-6.4c0.1-4.9,8.6-12.2,12.6-15"/><path d="M-323.8,299.6c0.4,0,0.9-0.1,1.2-0.4c10.2-7.8,14.8-23.9,14.8-35.6c0-1.1-0.9-2-2-2h0c-1.1,0-2,0.9-2,2c0,9-3.5,25-13.3,32.5c-0.9,0.7-1,1.9-0.4,2.8C-325,299.3-324.4,299.6-323.8,299.6z"/></svg>',
  createdAt: new Date('2015-10-16 15:59:03'),
  updatedAt: new Date('2016-03-01 09:44:16'),
  options: {"ingredients": [2408, 2410, 2415, 2416, 2636, 2685, 2700, 2705, 2850, 2875, 2875, 4292, 4292, 4326, 4431, 5077, 5120]}
}];

const actionsMap = {
  [ActionTypes.DIET_SELECT]: (state, action) => {
    return state.map(diet =>
      (diet.id === action.id ?
        Object.assign({}, diet, { selected: !diet.selected }) :
        diet)
    );
  },
  [ActionTypes.DIET_DESELECT]: (state, action) => actionsMap[ActionTypes.DIET_SELECT](state, action),
  [ActionTypes.DIET_MORE_INFO](state, action) {
    return Object.assign({}, state);
  }
};

export default function kwalito(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
