/** TODO hier werden die objekte die das zeichnen der einzelnen shapes uebernehmen definiert diese enthalten eine draw(canvas) funktion wo das zeichnen durchgef�hrt wird
 * dabei gibt es ein oberobjekt shape von welchem die shapes erben und diesen erweitern!
 * das oberobjekt definiert die standardfunktionalitaeten, welche aus der projektdokumentation zu entnehmen sind!
 */

/*******************************************************************************
 * The class Layout                                                            *
 ******************************************************************************/

// This is the super class, but beware of Prototype!
var Layout = function() {};

// Define a initialisation for Layout
Layout.prototype.init = function(x, y, width, height, borderColor, lineWidth) {
  if (typeof x === "number") this.x = x;
  else this.x = 0;
  
  if (typeof y === "number") this.y = y;
  else this.y = 0;
  
  if (typeof width === "number") this.width = width;
  else this.width = 0;
  
  if (typeof height === "number") this.height = height;
  else this.height = 0;
  
  if (typeof borderColor === "string") this.borderColor = borderColor;
  else this.borderColor = "black";
  
  if (typeof lineWidth === "number") this.lineWidth = lineWidth;
  else this.lineWidth = 1;
};

// Define setters for Layout
Layout.prototype.setX = function(x) {
  if (typeof x === "number") this.x = x;
  else this.x = 0;
}
Layout.prototype.setY = function(y) {
  if (typeof y === "number") this.y = y;
  else this.y = 0;
}
Layout.prototype.setWidth = function(width) {
  if (typeof width === "number") this.width = width;
  else this.width = 0;
}
Layout.prototype.setHeight = function(height) {
  if (typeof height === "number") this.height = height;
  else this.height = 0;
}
Layout.prototype.setBorderColor = function(borderColor) {
  if (typeof borderColor === "string") this.borderColor = borderColor;
  else this.borderColor = "black";
}
Layout.prototype.setLineWidth = function(lineWidth) {
  if (typeof lineWidth === "number") this.lineWidth = lineWidth;
  else this.lineWidth = 1;
}

//Define getters for Layout
Layout.prototype.getX = function() {
  return this.x;
}
Layout.prototype.getY = function() {
  return this.y;
}
Layout.prototype.getWidth = function() {
  return this.width;
}
Layout.prototype.getHeight = function() {
  return this.height;
}
Layout.prototype.getBorderColor = function() {
  return this.borderColor;
}
Layout.prototype.getLineWidth = function() {
  return this.lineWidth;
}

/*******************************************************************************
 * The class activeClass                                                       *
 ******************************************************************************/

var ActiveClass = function(x, y, width, height, borderColor, lineWidth) {
  this.init(x, y, width, height, borderColor, lineWidth);  
}
// This will inherit the class Layout
ActiveClass.prototype = new Layout();

// This will set the contstructor to itself
ActiveClass.prototype.constructor = ActiveClass;

// This will add a parent to the ActiveClass (also known as "super" in Java)
ActiveClass.parent = Layout.prototype;

// Define a initialisation for ActiveClass
ActiveClass.prototype.init = function(x, y, width, height, borderColor, lineWidth) {
  
  // This will add the values to the parent class
  ActiveClass.parent.init(x, y, width, height, borderColor, lineWidth);
}

//Define functions for DemoClass
ActiveClass.prototype.draw = function(context) {
  var x = DemoClass.parent.getX();
  var y = DemoClass.parent.getY();
  var width = DemoClass.parent.getWidth();
  var height = DemoClass.parent.getHeight();
  var borderColor = DemoClass.parent.getBorderColor();
  var lineWidth = DemoClass.parent.getLineWidth();
    
  var innerWidth = width * 0.8;
  var posInnerWidth = (width - innerWidth) / 2;
    
    context.save();
    
    context.rect(x, y, width, height);
    context.rect(posInnerWidth, y, innerWidth, height);
    
    // Settings for border color
    if (borderColor) context.strokeStyle = borderColor; 
    else context.strokeStyle = "black";
    
    // Settings for border width
    if (lineWidth) context.lineWidth = lineWidth;
    else context.lineWidth = 1;
              
    context.stroke();
    
    context.restore();
}