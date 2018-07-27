'use strict';
module.exports = function(app) {
  var createApis = require('../controllers/apiController');

  // createApis Routes
  app.route('/tasks')
    .get(createApis.list_all_tasks)
    .post(createApis.create_a_task);


  app.route('/tasks/:taskId')
    .get(createApis.read_a_task)
    .put(createApis.update_a_task)
    .delete(createApis.delete_a_task);
};