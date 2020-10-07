const loggerFactory = require('@alias/logger');
const logger = loggerFactory('growi-plugin:routes:section-ref');

module.exports = (crowi) => {
  const express = crowi.require('express');
  const router = express.Router();

  const Page = crowi.model('Page');
  const Revision = crowi.model('Revision');

  router.get('/sections', async(req, res) => {
    let page;
    try {
      page = await Page.findById(req.query.plink, ['revision']).exec();
    }
    catch(e) {
      return res.status(400).send(e);
    }

    let rev;
    let markdown;
    const regexp = /(^@startsection:(.+)$(.|[\r\n])*?^@endsection$)/gm;
    try {
      rev = await Revision.findById(page.revision).exec();
      b = rev.body;

      let found = false;
      b.replace(regexp, (m1) => {
        const id = m1.match(/^@startsection:(.+)$/gm)[0].split(":")[1];
        if (id == req.query.secid) {
          let t = m1.split('\n');
          t.shift();
          t.pop();
          markdown = t.join('\n');
          found = true;
        }
      });
      if (!found) {
        return res.status(400).send("section is not found");
      }
    }
    catch {
      return res.status(400).send("invalid parameter");
    }

    try {
      return res.status(200).send({section_text: markdown});
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  return router;
};
