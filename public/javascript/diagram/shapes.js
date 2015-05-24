function Shape(x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.name = name;
  this.lineWidth = (typeof lineWidth !== 'undefined') ? lineWidth : 1;
  this.borderColor = (typeof borderColor !== 'undefined') ? borderColor : 'black';
  this.fontFamily = (typeof fontFamily !== 'undefined') ? fontFamily : 'Arial';
  this.fontSize = (typeof fontSize !== 'undefined') ? fontSize : 16;
  
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


function Class(x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize) {
  Shape.call(this, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize);
}

Class.prototype = new Shape();

Class.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var centerX = this.x + (this.width / 2);
  var centerY = this.y + (this.height / 2) + (this.fontSize / 2);
  context.strokeStyle = this.borderColor;
  context.lineWidth = this.lineWidth;
  context.rect(this.x, this.y, this.width, this.height);
  context.font = "bold " + this.fontSize + "px " + this.fontFamily;
  context.textAlign = "center";
  context.fillText(this.name, centerX, centerY, this.width); 
  context.stroke();
};


function ActiveClass(x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize) {
  Shape.call(this, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize);
}

ActiveClass.prototype = new Shape();

ActiveClass.prototype.draw = function(canvas) {
  var innerWidth = this.width * 0.8;
  var posInnerWidth = this.x + (this.width - innerWidth) / 2;
  var context = canvas.getContext('2d');
  var centerX = this.x + (this.width / 2);
  var centerY = this.y + (this.height / 2) + (this.fontSize / 2);
  context.strokeStyle = this.borderColor;
  context.lineWidth = this.lineWidth;
  context.rect(this.x, this.y, this.width, this.height);
  context.rect(posInnerWidth, this.y, innerWidth, this.height);
  context.font = "italic bold " + this.fontSize + "px " + this.fontFamily;
  context.textAlign = "center";
  context.fillText(this.name, centerX, centerY, this.width); 
  context.stroke();
};
