function Relation(element_id, coordsA, coordsB, name) {
  this.id = element_id;
  this.shapeA = null;
  this.shapeB = null;
  this.coordsA = coordsA;
  this.coordsB = coordsB;
  this.name = name;
  
  this.setShapeA = function(shapeA) {
    this.shapeA = shapeA;
  };
  
  this.setShapeB = function(shapeB) {
    this.shapeB = shapeB;
  };
  
  this.setCoordsA = function(coordsA) {
    this.coordsA = coordsA;
  };
  
  this.setCoordsB = function(coordsB) {
    this.coordsB = coordsB;
  };
  
  this.setName = function(name) {
    this.name = name;
  };
  
  this.getShapeA = function() {
    return this.shapeA;
  };
  
  this.getShapeB = function() {
    return this.shapeB;
  };
  
  this.getCoordsA = function() {
    return this.coordsA;
  };
  
  this.getCoordsB = function() {
    return this.coordsB;
  };
  
  this.getName = function() {
    return this.name;
  };
}

Relation.prototype.draw = function() {
  throw new Error('This method should not be directly called!');
};


function Inheritance(element_id, coordsA, coordsB, name) {
  Relation.call(this, element_id, coordsA, coordsB, name);
}

Inheritance.prototype = new Relation();

Inheritance.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var deltaX = this.coordsB[0] - this.coordsA[0];
  var deltaY = this.coordsB[1] - this.coordsA[1];
  context.save();
  context.beginPath();
  context.translate(this.coordsA[0], this.coordsA[1]);
  context.rotate(Math.atan2(deltaY, deltaX));
  context.translate(-this.coordsA[0], -this.coordsA[1]);
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.lineTo(this.coordsB[0]-10, this.coordsA[1]);
  context.moveTo(this.coordsB[0]-10, this.coordsA[1]+10);
  context.lineTo(this.coordsB[0]-10, this.coordsA[1]-10);
  context.lineTo(this.coordsB[0], this.coordsA[1]);
  context.lineTo(this.coordsB[0]-10, this.coordsA[1]+10);
  context.closePath();
  context.stroke();
  context.restore();
};


function Association(element_id, coordsA, coordsB, name) {
  Relation.call(this, element_id, coordsA, coordsB, name);
}

Association.prototype = new Relation();

Association.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  context.save();
  context.beginPath();
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.lineTo(this.coordsB[0], this.coordsB[1]);
  context.closePath();
  context.stroke();
  context.restore();
};


function UniDirectionalAssociation(element_id, coordsA, coordsB, name) {
  Relation.call(this, element_id, coordsA, coordsB, name);
}

UniDirectionalAssociation.prototype = new Relation();

UniDirectionalAssociation.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var deltaX = this.coordsB[0] - this.coordsA[0];
  var deltaY = this.coordsB[1] - this.coordsA[1];
  context.save();
  context.beginPath();
  context.translate(this.coordsA[0], this.coordsA[1]);
  context.rotate(Math.atan2(deltaY, deltaX));
  context.translate(-this.coordsA[0], -this.coordsA[1]);
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.lineTo(this.coordsB[0], this.coordsA[1]);
  context.lineTo(this.coordsB[0]-10, this.coordsA[1]-10);
  context.moveTo(this.coordsB[0], this.coordsA[1]);
  context.lineTo(this.coordsB[0]-10, this.coordsA[1]+10);
  context.closePath();
  context.stroke();
  context.restore();
};


function Aggregation(element_id, coordsA, coordsB, name) {
  Relation.call(this, element_id, coordsA, coordsB, name);
}

Aggregation.prototype = new Relation();

Aggregation.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var deltaX = this.coordsB[0] - this.coordsA[0];
  var deltaY = this.coordsB[1] - this.coordsA[1];
  context.save();
  context.beginPath();
  context.translate(this.coordsA[0], this.coordsA[1]);
  context.rotate(Math.atan2(deltaY, deltaX));
  context.translate(-this.coordsA[0], -this.coordsA[1]);
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.lineTo(this.coordsB[0]-30, this.coordsA[1]);
  context.lineTo(this.coordsB[0]-15, this.coordsA[1]-10);
  context.lineTo(this.coordsB[0], this.coordsA[1]);
  context.lineTo(this.coordsB[0]-15, this.coordsA[1]+10);
  context.lineTo(this.coordsB[0]-30, this.coordsA[1]);
  context.fill();
  context.closePath();
  context.stroke();
  context.restore();
};


function Composition(element_id, coordsA, coordsB, name) {
  Relation.call(this, element_id, coordsA, coordsB, name);
}

Composition.prototype = new Relation();

Composition.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var deltaX = this.coordsB[0] - this.coordsA[0];
  var deltaY = this.coordsB[1] - this.coordsA[1];
  context.save();
  context.beginPath();
  context.translate(this.coordsA[0], this.coordsA[1]);
  context.rotate(Math.atan2(deltaY, deltaX));
  context.translate(-this.coordsA[0], -this.coordsA[1]);
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.lineTo(this.coordsB[0]-30, this.coordsA[1]);
  context.lineTo(this.coordsB[0]-15, this.coordsA[1]-10);
  context.lineTo(this.coordsB[0], this.coordsA[1]);
  context.lineTo(this.coordsB[0]-15, this.coordsA[1]+10);
  context.lineTo(this.coordsB[0]-30, this.coordsA[1]);
  context.closePath();
  context.stroke();
  context.restore();
};


function Realization(element_id, coordsA, coordsB, name) {
  Relation.call(this, element_id, coordsA, coordsB, name);
}

Realization.prototype = new Relation();

Realization.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var deltaX = this.coordsB[0] - this.coordsA[0];
  var deltaY = this.coordsB[1] - this.coordsA[1];
  context.save();
  context.beginPath();
  context.translate(this.coordsA[0], this.coordsA[1]);
  context.rotate(Math.atan2(deltaY, deltaX));
  context.translate(-this.coordsA[0], -this.coordsA[1]);
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.setLineDash([5, 10]);
  context.lineTo(this.coordsB[0]-10, this.coordsA[1]);
  context.closePath();
  context.stroke();
  context.beginPath();
  context.setLineDash([]);
  context.moveTo(this.coordsB[0]-10, this.coordsA[1]+10);
  context.lineTo(this.coordsB[0]-10, this.coordsA[1]-10);
  context.lineTo(this.coordsB[0], this.coordsA[1]);
  context.lineTo(this.coordsB[0]-10, this.coordsA[1]+10);
  context.closePath();
  context.stroke();
  context.restore();
};


function Dependency(element_id, coordsA, coordsB, name) {
  Relation.call(this, element_id, coordsA, coordsB, name);
}

Dependency.prototype = new Relation();

Dependency.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var deltaX = this.coordsB[0] - this.coordsA[0];
  var deltaY = this.coordsB[1] - this.coordsA[1];
  context.save();
  context.beginPath();
  context.translate(this.coordsA[0], this.coordsA[1]);
  context.rotate(Math.atan2(deltaY, deltaX));
  context.translate(-this.coordsA[0], -this.coordsA[1]);
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.setLineDash([5, 10]);
  context.lineTo(this.coordsB[0], this.coordsA[1]);
  context.closePath();
  context.stroke();
  context.beginPath();
  context.setLineDash([]);
  context.moveTo(this.coordsB[0], this.coordsA[1]);
  context.lineTo(this.coordsB[0]-10, this.coordsA[1]-10);
  context.moveTo(this.coordsB[0], this.coordsA[1]);
  context.lineTo(this.coordsB[0]-10, this.coordsA[1]+10);
  context.closePath();
  context.stroke();
  context.restore();
};


function Link(element_id, coordsA, coordsB, name) {
  Relation.call(this, element_id, coordsA, coordsB, name);
}

Link.prototype = new Relation();

Link.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  context.save();
  context.setLineDash([5, 10]);
  context.beginPath();
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.lineTo(this.coordsB[0], this.coordsB[1]);
  context.closePath();
  context.stroke();
  context.restore();
};
