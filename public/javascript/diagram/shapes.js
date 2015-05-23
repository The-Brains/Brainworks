function Shape(x, y, width, height, borderColor, lineWidth) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.borderColor = borderColor;
  this.lineWidth = lineWidth;
  
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
}

Shape.prototype.draw = function() {
  throw new Error('This method should not be directly called!');
};

function ActiveClass(x, y, width, height, borderColor, lineWidth) {
  Shape.call(this, x, y, width, height, borderColor, lineWidth);
}

ActiveClass.prototype = new Shape();

ActiveClass.prototype.draw = function(canvas) {
  var innerWidth = this.width * 0.8;
  var posInnerWidth = this.x + (this.width - innerWidth) / 2;
  var context = canvas.getContext('2d');
  context.beginPath();
  context.strokeStyle = this.borderColor;
  context.lineWidth = this.lineWidth;
  context.rect(this.x, this.y, this.width, this.height);
  context.rect(posInnerWidth, this.y, innerWidth, this.height);
  context.stroke();
};
