function Shape(x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.name = name;
  this.lineWidth = (typeof lineWidth === 'number') ? lineWidth : 1;
  this.borderColor = (typeof borderColor === 'string') ? borderColor : 'black';
  this.fontFamily = (typeof fontFamily === 'string') ? fontFamily : 'Arial';
  this.fontSize = (typeof fontSize === 'number') ? fontSize : 16;
  
  this.setX = function(x) {
    this.x = x;
  };
  
  this.setY = function(y) {
    this.y = y;
  };
  
  this.setWidth = function(width) {
    this.width = width;
  };
  
  this.setHeight = function(height) {
    this.height = height;
  };
  
  this.setBorderColor = function(borderColor) {
    this.borderColor = borderColor;
  };
  
  this.setLineWidth = function(lineWidth) {
    this.lineWidth = lineWidth;
  };
  
  this.setName = function(name) {
    this.name = name;
  };
  
  this.setFontFamily = function(fontFamily) {
    this.fontFamily = fontFamily;
  };
  
  this.setFontSize = function(fontSize) {
    this.fontSize = fontSize;
  };
  
  this.getX = function() {
    return this.x;
  };
  
  this.getY = function() {
    return this.y;
  };
  
  this.getWidth = function() {
    return this.width;
  };
  
  this.getHeight = function() {
    return this.height;
  };
  
  this.getBorderColor = function() {
    return this.borderColor;
  };
  
  this.getLineWidth = function() {
    return this.lineWidth;
  };
  
  this.getName = function() {
    return this.name;
  };
  
  this.getFontFamily = function() {
    return this.fontFamily;
  };
  
  this.getFontSize = function() {
    return this.fontSize;
  };
}

Shape.prototype.draw = function() {
  throw new Error('This method should not be directly called!');
};


function EmptyClass(x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize) {
  Shape.call(this, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize);
}

EmptyClass.prototype = new Shape();

EmptyClass.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var centerX = this.x + (this.width / 2);
  var centerY = this.y + (this.height / 2) + (this.fontSize / 2);
  context.save();
  context.beginPath();
  context.strokeStyle = this.borderColor;
  context.lineWidth = this.lineWidth;
  context.rect(this.x, this.y, this.width, this.height);
  context.font = 'bold ' + this.fontSize + 'px ' + this.fontFamily;
  context.textAlign = 'center';
  context.fillText(this.name, centerX, centerY, this.width);
  context.closePath();
  context.stroke();
  context.restore();
};


function AbstractClass(x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize) {
  Shape.call(this, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize);
}

AbstractClass.prototype = new Shape();

AbstractClass.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var centerX = this.x + (this.width / 2);
  var centerY = this.y + (this.height / 2) + (this.fontSize / 2);
  context.save();
  context.beginPath();
  context.strokeStyle = this.borderColor;
  context.lineWidth = this.lineWidth;
  context.rect(this.x, this.y, this.width, this.height);
  context.font = 'italic bold ' + this.fontSize + 'px ' + this.fontFamily;
  context.textAlign = 'center';
  context.fillText(this.name, centerX, centerY, this.width);
  context.closePath();
  context.stroke();
  context.restore();
};


function Comment(x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize) {
  Shape.call(this, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize);
}

Comment.prototype = new Shape();

Comment.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var horizontalPiece = this.width * 0.8;
  var verticalPiece = this.height * 0.3;
  var centerX = this.x + (this.width / 2);
  var centerY = this.y + (this.height / 2) + (this.fontSize / 2);
  context.save();
  context.beginPath();
  context.strokeStyle = this.borderColor;
  context.lineWidth = this.lineWidth;
  context.moveTo(this.x, this.y);
  context.lineTo(this.x + horizontalPiece, this.y);
  context.lineTo(this.x + this.width, this.y + verticalPiece);
  context.lineTo(this.x + this.width, this.y + this.height);
  context.lineTo(this.x, this.y + this.height);
  context.lineTo(this.x, this.y);
  context.moveTo(this.x + horizontalPiece, this.y);
  context.lineTo(this.x + horizontalPiece, this.y + verticalPiece);
  context.lineTo(this.x + this.width, this.y + verticalPiece);
  context.font = 'bold ' + this.fontSize + 'px ' + this.fontFamily;
  context.textAlign = 'center';
  context.fillText(this.name, centerX, centerY, this.width);
  context.closePath();
  context.stroke();
  context.restore();
};


function ActiveClass(x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize) {
  Shape.call(this, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize);
}

ActiveClass.prototype = new Shape();

ActiveClass.prototype.draw = function(canvas) {
  var startPosInner = this.x + this.width * 0.1;
  var endPosInner = this.x + this.width * 0.9;
  var context = canvas.getContext('2d');
  var centerX = this.x + (this.width / 2);
  var centerY = this.y + (this.height / 2) + (this.fontSize / 2);
  context.save();
  context.beginPath();
  context.strokeStyle = this.borderColor;
  context.lineWidth = this.lineWidth;
  context.rect(this.x, this.y, this.width, this.height);
  context.moveTo(startPosInner, this.y);
  context.lineTo(startPosInner, this.y + this.height);
  context.moveTo(endPosInner, this.y);
  context.lineTo(endPosInner, this.y + this.height);
  context.font = 'bold ' + this.fontSize + 'px ' + this.fontFamily;
  context.textAlign = 'center';
  context.fillText(this.name, centerX, centerY, this.width);
  context.closePath();
  context.stroke();
  context.restore();
};


function Class(x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize, attributes, methods) {
  Shape.call(this, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize);
  
  this.attributes = attributes instanceof Array ? attributes : [];
  this.methods = methods instanceof Array ? methods : [];
  
  this.setAttributes = function(attributes) {
    this.attributes = attributes;
  };
  
  this.setMethods = function(methods) {
    this.methods = methods;
  };
  
  this.getAttributes = function() {
    return this.attributes;
  };
  
  this.getMethods = function() {
    return this.methods;
  };
}

Class.prototype = new Shape();

Class.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  context.save();
  context.beginPath();
  context.strokeStyle = this.borderColor;
  context.lineWidth = this.lineWidth;
  context.rect(this.x, this.y, this.width, this.height);
  
  context.closePath();
  context.stroke();
  context.restore();
};
