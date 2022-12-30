'use strict';

const { getPlaiceholder } = require('plaiceholder');
const { getService } = require('../utils');

module.exports = ({ strapi }) => ({
  /**
   * Generates a placeholder image for the given image.
   * @param {string} url a local or remote image URL to generate a placeholder for
   * @returns {Promise<string>} an encoded placeholder image
   */

  async generate(url) {
    try {
      const settings = getService(strapi, 'settings').get();
      const { plaiceholder: plaiceholderSettings } = settings;
      const plaiceholder = await getPlaiceholder(url, plaiceholderSettings);
      const returnType = settings.returnType || 'base64';

      switch (returnType) {
        case 'base64':
          return plaiceholder.base64;
        case 'blurhash':
          return plaiceholder.blurhash.hash;
        default:
          return JSON.stringify(plaiceholder[returnType]);
      }
    } catch (e) {
      strapi.log.error(e);
      return null;
    }
  },
});
