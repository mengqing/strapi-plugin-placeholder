'use strict';

const { getPlaiceholder } = require('plaiceholder');
const { getService } = require('../utils');

module.exports = ({ strapi }) => ({
  /**
   * Generates a base64 placeholder image for the given image.
   * @param {string} url a local or remote image URL to generate a placeholder for
   * @returns {Promise<string>} a base64 encoded placeholder image
   */

  async generate(url) {
    try {
      const settings = getService(strapi, 'settings').get();
      const { plaiceholder: plaiceholderSettings } = settings;
      const plaiceholder = await getPlaiceholder(url, plaiceholderSettings);
      const returnType = settings.returnType || 'base64';

      if (returnType === 'base64') {
        return { base64: plaiceholder.base64 };
      }
      return plaiceholder[returnType];
    } catch (e) {
      strapi.log.error(e);
      return null;
    }
  },
});
