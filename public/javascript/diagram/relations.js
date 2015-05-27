function Relation(coordsA, coordsB, name) {
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


function Inheritance(coordsA, coordsB, name) {
  Relation.call(this, coordsA, coordsB, name);
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