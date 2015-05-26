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
  context.save();
  context.beginPath();
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.lineTo(this.coordsB[0], this.coordsB[1]);
  /*ctx.moveTo(180, 60);
  ctx.lineTo(180, 40);
  ctx.lineTo(200, 50);
  ctx.lineTo(180, 60);*/
  context.closePath();
  context.stroke();
  context.restore();
};