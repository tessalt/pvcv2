PointService = function (model) {
  this.pointModel = model;
};

PointService.prototype.index = function (listId, callback) {
  this.pointModel.find({listId: listId}, function (error, docs) {
    if (error){
      callback(error);
    } else {
      callback(docs);
    }
  });
};

PointService.prototype.new = function (listId, body, isCon, callback) {
  var point = new this.pointModel({
    listId: listId,
    body: body,
    isCon: isCon
  });
  point.save(function (error){
    if (error) {
      callback(error);
    } else {
      callback('success');
    }
  });
};

PointService.prototype.show = function (pointId, callback) {
  this.pointModel.findById(pointId, function (error, doc){
    if (error) {
      callback(error);
    } else {
      callback(doc);
    }
  });
};

PointService.prototype.update = function (pointId, body, isCon, callback) {
  this.pointModel.findById(pointId, function (error, doc) {
    if (error) {
      callback(error);
    } else {
      doc.body = body;
      doc.isCon = isCon;
      doc.save(function(error){
        if (error) {
          callback(error);
        } else {
          callback('success');
        }
      });
    }
  });
};

PointService.prototype.destroy = function (pointId, callback) {
  this.pointModel.findByIdAndRemove(pointId, function (error) {
    if (error) {
      callback(error);
    } else {
      callback('success');
    }
  });
};

exports.PointService = PointService;