module.exports = (crowi, app) => {
  // add routes
  app.use('/_api/plugin/sectionref', require('./sectionref')(crowi, app));
};
