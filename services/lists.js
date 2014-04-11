ListService = function(listModel, pointModel) {
  this.listModel = listModel;
  this.pointModel = pointModel;
};

ListService.prototype.index = function(callback) {
  this.listModel.find(function(error, docs){
    if (error) {
      callback(error);
    } else {
      callback(docs);
    }
  })
};

ListService.prototype.show = function(id, callback) {
  this.listModel.findById(id, function(error, doc){
    if (error) {
      callback(error);
    } else {
      callback(doc);
    }
  });
};

ListService.prototype.new = function(title, callback) {
  var list = new this.listModel({
    title: title
  });
  list.save(function(error){
    if (error) {
      callback(error);
    } else {
      callback('success');
    }
  });
};

ListService.prototype.update = function(id, title, callback) {
  this.listModel.findByIdAndUpdate(id, { title : title }, function(error){
    if (error) {
      callback(error);
    } else {
      callback('success');
    }
  });
};

ListService.prototype.destroy = function(id, callback) {
  var _this = this;
  this.pointModel.find({listId: id}, function(error, docs){
    if (error) return callback(error);
    docs.forEach(function(doc){
      doc.remove(function(error){
        if (error) return callback(error);
      });
    });
  });
  this.listModel.findById(id).remove(function(error){
    if (error) return callback(error);
    callback('success');
  });
};

exports.ListService = ListService;