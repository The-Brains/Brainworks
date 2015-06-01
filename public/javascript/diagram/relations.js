function Relation(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize) {
  this._id = elementId;
  this.shapeA = null;
  this.shapeB = null;
  this.coordsA = coordsA;
  this.coordsB = coordsB;
  this.name = name;
  this.lineWidth = (typeof lineWidth === 'number') ? lineWidth : 1;
  this.lineColor = (typeof lineColor === 'string') ? lineColor : 'black';
  this.fontFamily = (typeof fontFamily === 'string') ? fontFamily : 'Arial';
  this.fontSize = (typeof fontSize === 'number') ? fontSize : 16;
  
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
  
  this.setLineColor = function(lineColor) {
    this.lineColor = lineColor;
  };
  
  this.setLineWidth = function(lineWidth) {
    this.lineWidth = lineWidth;
  };
  
  this.setFontFamily = function(fontFamily) {
    this.fontFamily = fontFamily;
  };
  
  this.setFontSize = function(fontSize) {
    this.fontSize = fontSize;
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
  
  this.getLineColor = function() {
    return this.lineColor;
  };
  
  this.getLineWidth = function() {
    return this.lineWidth;
  };
  
  this.getFontFamily = function() {
    return this.fontFamily;
  };
  
  this.getFontSize = function() {
    return this.fontSize;
  };
}

Relation.prototype.draw = function() {
  throw new Error('This method should not be directly called!');
};

Relation.prototype.toJSON = function() {
  throw new Error('This method should not be directly called!');
};

Relation.prototype.applyJSON = function(json) {
  throw new Error('This method should not be directly called!');
};

Relation.prototype.startEditmode = function(canvas) {
  throw new Error('This method should not be directly called!');
};

Relation.prototype.endEditmode = function(canvas) {
  throw new Error('This method should not be directly called!');
};


function Inheritance(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);
}

Inheritance.prototype = new Relation();

Inheritance.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var deltaX = this.coordsB[0] - this.coordsA[0];
  var deltaY = this.coordsB[1] - this.coordsA[1];
  var length = Math.abs(Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2)));
  context.save();
  context.beginPath();
  context.translate(this.coordsA[0], this.coordsA[1]);
  context.rotate(Math.atan2(deltaY, deltaX));
  context.translate(-this.coordsA[0], -this.coordsA[1]);
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-10, this.coordsA[1]);
  context.moveTo(this.coordsA[0]+length-10, this.coordsA[1]+10);
  context.lineTo(this.coordsA[0]+length-10, this.coordsA[1]-10);
  context.lineTo(this.coordsA[0]+length, this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-10, this.coordsA[1]+10);
  context.closePath();
  context.stroke();
  context.restore();
};

Inheritance.prototype.toJSON = function() {
  return {
    _type: 'Inheritance',
    _id: this._id,
    shapeA: this.getShapeA(),
    shapeB: this.getShapeB(),
    name: this.getName(),
    coordsA: this.getCoordsA(),
    coordsB: this.getCoordsB()
  };
};

Inheritance.prototype.applyJSON = function(json) {
  this._id = json._id;
  this.shapeA = json.shapeA;
  this.shapeB = json.shapeB;
  this.name = json.name;
  this.coordsA = json.coordsA;
  this.coordsB = json.coordsB;
};


function Association(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize, multiplicityA, multiplicityB) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);
  
  this.multiplicityA = (typeof multiplicityA === 'string') ? multiplicityA : '';
  this.multiplicityB = (typeof multiplicityB === 'string') ? multiplicityB : '';
  
  this.setMultiplicityA = function(multiplicityA) {
    this.multiplicityA = multiplicityA;
  };
  
  this.setMultiplicityB = function(multiplicityB) {
    this.multiplicityB = multiplicityB;
  };
  
  this.getMultiplicityA = function() {
    return this.multiplicityA;
  };
  
  this.getMultiplicityB = function() {
    return this.multiplicityB;
  };
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

Association.prototype.toJSON = function() {
  return {
    _type: 'Association',
    _id: this._id,
    shapeA: this.getShapeA(),
    shapeB: this.getShapeB(),
    name: this.getName(),
    coordsA: this.getCoordsA(),
    coordsB: this.getCoordsB(),
    multiplicityA: this.getMultiplicityA(),
    multiplicityB: this.getMultiplicityB()
  };
};

Association.prototype.applyJSON = function(json) {
  this._id = json._id;
  this.shapeA = json.shapeA;
  this.shapeB = json.shapeB;
  this.name = json.name;
  this.coordsA = json.coordsA;
  this.coordsB = json.coordsB;
  this.multiplicityA = json.multiplicityA;
  this.multiplicityB = json.multiplicityB;
};


function UniDirectionalAssociation(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize, multiplicityB) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);
  
  this.multiplicityB = (typeof multiplicityB === 'string') ? multiplicityB : '';
  
  this.setMultiplicityB = function(multiplicityB) {
    this.multiplicityB = multiplicityB;
  };
  
  this.getMultiplicityB = function() {
    return this.multiplicityB;
  };
}

UniDirectionalAssociation.prototype = new Relation();

UniDirectionalAssociation.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var deltaX = this.coordsB[0] - this.coordsA[0];
  var deltaY = this.coordsB[1] - this.coordsA[1];
  var length = Math.abs(Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2)));
  context.save();
  context.beginPath();
  context.translate(this.coordsA[0], this.coordsA[1]);
  context.rotate(Math.atan2(deltaY, deltaX));
  context.translate(-this.coordsA[0], -this.coordsA[1]);
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length, this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-10, this.coordsA[1]-10);
  context.moveTo(this.coordsA[0]+length, this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-10, this.coordsA[1]+10);
  context.closePath();
  context.stroke();
  context.restore();
};

UniDirectionalAssociation.prototype.toJSON = function() {
  return {
    _type: 'UniDirectionalAssociation',
    _id: this._id,
    shapeA: this.getShapeA(),
    shapeB: this.getShapeB(),
    name: this.getName(),
    coordsA: this.getCoordsA(),
    coordsB: this.getCoordsB(),
    multiplicityB: this.getMultiplicityB()
  };
};

UniDirectionalAssociation.prototype.applyJSON = function(json) {
  this._id = json._id;
  this.shapeA = json.shapeA;
  this.shapeB = json.shapeB;
  this.name = json.name;
  this.coordsA = json.coordsA;
  this.coordsB = json.coordsB;
  this.multiplicityB = json.multiplicityB;
};


function Aggregation(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize, multiplicityA, multiplicityB) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);
  
  this.multiplicityA = (typeof multiplicityA === 'string') ? multiplicityA : '';
  this.multiplicityB = (typeof multiplicityB === 'string') ? multiplicityB : '';
  
  this.setMultiplicityA = function(multiplicityA) {
    this.multiplicityA = multiplicityA;
  };
  
  this.setMultiplicityB = function(multiplicityB) {
    this.multiplicityB = multiplicityB;
  };
  
  this.getMultiplicityA = function() {
    return this.multiplicityA;
  };
  
  this.getMultiplicityB = function() {
    return this.multiplicityB;
  };
}

Aggregation.prototype = new Relation();

Aggregation.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var deltaX = this.coordsB[0] - this.coordsA[0];
  var deltaY = this.coordsB[1] - this.coordsA[1];
  var length = Math.abs(Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2)));
  context.save();
  context.beginPath();
  context.translate(this.coordsA[0], this.coordsA[1]);
  context.rotate(Math.atan2(deltaY, deltaX));
  context.translate(-this.coordsA[0], -this.coordsA[1]);
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-30, this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-15, this.coordsA[1]-10);
  context.lineTo(this.coordsA[0]+length, this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-15, this.coordsA[1]+10);
  context.lineTo(this.coordsA[0]+length-30, this.coordsA[1]);
  context.fill();
  context.closePath();
  context.stroke();
  context.restore();
};

Aggregation.prototype.toJSON = function() {
  return {
    _type: 'Aggregation',
    _id: this._id,
    shapeA: this.getShapeA(),
    shapeB: this.getShapeB(),
    name: this.getName(),
    coordsA: this.getCoordsA(),
    coordsB: this.getCoordsB(),
    multiplicityA: this.getMultiplicityA(),
    multiplicityB: this.getMultiplicityB()
  };
};

Aggregation.prototype.applyJSON = function(json) {
  this._id = json._id;
  this.shapeA = json.shapeA;
  this.shapeB = json.shapeB;
  this.name = json.name;
  this.coordsA = json.coordsA;
  this.coordsB = json.coordsB;
  this.multiplicityA = json.multiplicityA;
  this.multiplicityB = json.multiplicityB;
};


function Composition(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize, multiplicityA, multiplicityB) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);
  
  this.multiplicityA = (typeof multiplicityA === 'string') ? multiplicityA : '';
  this.multiplicityB = (typeof multiplicityB === 'string') ? multiplicityB : '';
  
  this.setMultiplicityA = function(multiplicityA) {
    this.multiplicityA = multiplicityA;
  };
  
  this.setMultiplicityB = function(multiplicityB) {
    this.multiplicityB = multiplicityB;
  };
  
  this.getMultiplicityA = function() {
    return this.multiplicityA;
  };
  
  this.getMultiplicityB = function() {
    return this.multiplicityB;
  };
}

Composition.prototype = new Relation();

Composition.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var deltaX = this.coordsB[0] - this.coordsA[0];
  var deltaY = this.coordsB[1] - this.coordsA[1];
  var length = Math.abs(Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2)));
  context.save();
  context.beginPath();
  context.translate(this.coordsA[0], this.coordsA[1]);
  context.rotate(Math.atan2(deltaY, deltaX));
  context.translate(-this.coordsA[0], -this.coordsA[1]);
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-30, this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-15, this.coordsA[1]-10);
  context.lineTo(this.coordsA[0]+length, this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-15, this.coordsA[1]+10);
  context.lineTo(this.coordsA[0]+length-30, this.coordsA[1]);
  context.closePath();
  context.stroke();
  context.restore();
};

Composition.prototype.toJSON = function() {
  return {
    _type: 'Composition',
    _id: this._id,
    shapeA: this.getShapeA(),
    shapeB: this.getShapeB(),
    name: this.getName(),
    coordsA: this.getCoordsA(),
    coordsB: this.getCoordsB(),
    multiplicityA: this.getMultiplicityA(),
    multiplicityB: this.getMultiplicityB()
  };
};

Composition.prototype.applyJSON = function(json) {
  this._id = json._id;
  this.shapeA = json.shapeA;
  this.shapeB = json.shapeB;
  this.name = json.name;
  this.coordsA = json.coordsA;
  this.coordsB = json.coordsB;
  this.multiplicityA = json.multiplicityA;
  this.multiplicityB = json.multiplicityB;
};


function Realization(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);
}

Realization.prototype = new Relation();

Realization.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var deltaX = this.coordsB[0] - this.coordsA[0];
  var deltaY = this.coordsB[1] - this.coordsA[1];
  var length = Math.abs(Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2)));
  context.save();
  context.beginPath();
  context.translate(this.coordsA[0], this.coordsA[1]);
  context.rotate(Math.atan2(deltaY, deltaX));
  context.translate(-this.coordsA[0], -this.coordsA[1]);
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.setLineDash([5, 10]);
  context.lineTo(this.coordsA[0]+length-10, this.coordsA[1]);
  context.closePath();
  context.stroke();
  context.beginPath();
  context.setLineDash([]);
  context.moveTo(this.coordsA[0]+length-10, this.coordsA[1]+10);
  context.lineTo(this.coordsA[0]+length-10, this.coordsA[1]-10);
  context.lineTo(this.coordsA[0]+length, this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-10, this.coordsA[1]+10);
  context.closePath();
  context.stroke();
  context.restore();
};

Realization.prototype.toJSON = function() {
  return {
    _type: 'Realization',
    _id: this._id,
    shapeA: this.getShapeA(),
    shapeB: this.getShapeB(),
    name: this.getName(),
    coordsA: this.getCoordsA(),
    coordsB: this.getCoordsB()
  };
};

Realization.prototype.applyJSON = function(json) {
  this._id = json._id;
  this.shapeA = json.shapeA;
  this.shapeB = json.shapeB;
  this.name = json.name;
  this.coordsA = json.coordsA;
  this.coordsB = json.coordsB;
};


function Dependency(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);
}

Dependency.prototype = new Relation();

Dependency.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var deltaX = this.coordsB[0] - this.coordsA[0];
  var deltaY = this.coordsB[1] - this.coordsA[1];
  var length = Math.abs(Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2)));
  context.save();
  context.beginPath();
  context.translate(this.coordsA[0], this.coordsA[1]);
  context.rotate(Math.atan2(deltaY, deltaX));
  context.translate(-this.coordsA[0], -this.coordsA[1]);
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.setLineDash([5, 10]);
  context.lineTo(this.coordsA[0]+length, this.coordsA[1]);
  context.closePath();
  context.stroke();
  context.beginPath();
  context.setLineDash([]);
  context.moveTo(this.coordsA[0]+length, this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-10, this.coordsA[1]-10);
  context.moveTo(this.coordsA[0]+length, this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-10, this.coordsA[1]+10);
  context.closePath();
  context.stroke();
  context.restore();
};

Dependency.prototype.toJSON = function() {
  return {
    _type: 'Dependency',
    _id: this._id,
    shapeA: this.getShapeA(),
    shapeB: this.getShapeB(),
    name: this.getName(),
    coordsA: this.getCoordsA(),
    coordsB: this.getCoordsB()
  };
};

Dependency.prototype.applyJSON = function(json) {
  this._id = json._id;
  this.shapeA = json.shapeA;
  this.shapeB = json.shapeB;
  this.name = json.name;
  this.coordsA = json.coordsA;
  this.coordsB = json.coordsB;
};


function Link(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);
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

Link.prototype.toJSON = function() {
  return {
    _type: 'Link',
    _id: this._id,
    shapeA: this.getShapeA(),
    shapeB: this.getShapeB(),
    name: this.getName(),
    coordsA: this.getCoordsA(),
    coordsB: this.getCoordsB()
  };
};

Link.prototype.applyJSON = function(json) {
  this._id = json._id;
  this.shapeA = json.shapeA;
  this.shapeB = json.shapeB;
  this.name = json.name;
  this.coordsA = json.coordsA;
  this.coordsB = json.coordsB;
};
