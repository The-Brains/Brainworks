/** TODO hier werden die objekte die das zeichnen der einzelnen shapes uebernehmen definiert diese enthalten eine draw(canvas) funktion wo das zeichnen durchgef�hrt wird
 * dabei gibt es ein oberobjekt shape von welchem die shapes erben und diesen erweitern!
 * das oberobjekt definiert die standardfunktionalitaeten, welche aus der projektdokumentation zu entnehmen sind!
 */

/*******************************************************************************
 * The class Shape                                                            *
 ******************************************************************************/

function Shape(x, y, width, height, lineWidth) {
  if (typeof x === "number") this.x = x;
  else this.x = 0;
  
  if (typeof y === "number") this.y = y;
  else this.y = 0;
  
  if (typeof width === "number") this.width = width;
  else this.width = 0;
  
  if (typeof height === "number") this.height = height;
  else this.height = 0;
  
  if (typeof lineWidth === "number") this.lineWidth = lineWidth;
  else this.lineWidth = 0;
  
  // Define the setters
  this.setX = function(x) {
    if (typeof x === "number") this.x = x;
  };  
  this.setY = function(y) {
    if (typeof y === "number") this.y = y;
  };  
  this.setWidth = function(width) {
    if (typeof width === "number") this.width = width;
  };  
  this.setHeight = function(height) {
    if (typeof height === "number") this.height = height;
  };  
  this.setLineWidth = function(lineWidth) {
    if (typeof lineWidth === "number") this.lineWidth = lineWidth;
  };
  
  // Define the getters
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
  this.getLineWidth = function() {
    return this.lineWidth;
  };
}

Shape.prototype.draw = function() {
  throw new Error('This method should not be directly called!');
};

/*******************************************************************************
 * The class Class                                                             *
 ******************************************************************************/

function Class(x, y, width, height, lineWidth, title, fontFamily, 
  fontSize) {
  Shape.call(this, x, y, width, height, lineWidth);
  
  if (typeof title === "string") this.title = title;
  else this.title = "";
  
  if (typeof fontFamily === "string") this.fontFamily = fontFamily;
  else this.fontFamily = "";
  
  if (typeof fontSize === "number") this.fontSize = fontSize;
  else this.fontSize = 0;
  
  // Define the setters
  this.setTitle = function() {
    if (typeof title === "string") this.title = title;
  };
  this.getY = function() {
    if (typeof fontFamily === "string") this.fontFamily = fontFamily;
  };
  this.getWidth = function() {
    if (typeof fontSize === "number") this.fontSize = fontSize;
  };
  
  // Define the getters
  this.getTitle = function() {
    return this.title;
  };
  this.getFontFamily = function() {
    return this.fontFamily;
  };
  this.getFontSize = function() {
    return this.fontSize;
  };  
}

// This will inherit the class Layout
Class.prototype = new Shape();

// Define functions for ActiveClass
Class.prototype.draw = function(context) {
  context.save();
  context.strokeStyle = "black";
  
  context.rect(this.x, this.y, this.width, this.height);
      
  // Settings for border width
  if (this.lineWidth) context.lineWidth = this.lineWidth;
  else context.lineWidth = 1;
  
  if (this.title) {
	  
	  // Settings for font-family  
	  if (this.fontFamily) var fontFamily = this.fontFamily;
	  else var fontFamily = "Arial";
	
	  // Settings for font-size in px
	  if (this.fontSize) var fontSize = this.fontSize;
	  else var fontSize = 16;
	
	  // Settings for text-orientation in the center of both sides
	  var centerX = this.x + (this.width / 2);
	  var centerY = this.y + (this.height / 2) + (fontSize / 2);
	
	  context.font = "bold " + fontSize + "px " + fontFamily;
	  context.textAlign = "center";
	  context.fillText(this.title, centerX, centerY, this.width);	
  }
              
  context.stroke();
  
  context.restore();
};

/*******************************************************************************
 * The class ActiveClass                                                       *
 ******************************************************************************/

function ActiveClass(x, y, width, height, lineWidth, title, fontFamily, 
  fontSize) {
  Shape.call(this, x, y, width, height, lineWidth);
  
  if (typeof title === "string") this.title = title;
  else this.title = "";
  
  if (typeof fontFamily === "string") this.fontFamily = fontFamily;
  else this.fontFamily = "";
  
  if (typeof fontSize === "number") this.fontSize = fontSize;
  else this.fontSize = 0;
  
  // Define the setters
  this.setTitle = function() {
    if (typeof title === "string") this.title = title;
  };
  this.getY = function() {
    if (typeof fontFamily === "string") this.fontFamily = fontFamily;
  };
  this.getWidth = function() {
    if (typeof fontSize === "number") this.fontSize = fontSize;
  };
  
  // Define the getters
  this.getTitle = function() {
    return this.title;
  };
  this.getFontFamily = function() {
    return this.fontFamily;
  };
  this.getFontSize = function() {
    return this.fontSize;
  };  
}

// This will inherit the class Layout
ActiveClass.prototype = new Shape();

// Define functions for ActiveClass
ActiveClass.prototype.draw = function(context) {
  var innerWidth = this.width * 0.8;
  var posInnerWidth = this.x + ((this.width - innerWidth) / 2);
    
  context.save();
  context.strokeStyle = "black";
  
  context.rect(this.x, this.y, this.width, this.height);
  context.rect(posInnerWidth, this.y, innerWidth, this.height);
      
  // Settings for border width
  if (this.lineWidth) context.lineWidth = this.lineWidth;
  else context.lineWidth = 1;
  
  if (this.title) {
	  
	  // Settings for font-family  
	  if (this.fontFamily) var fontFamily = this.fontFamily;
	  else var fontFamily = "Arial";
	
	  // Settings for font-size in px
	  if (this.fontSize) var fontSize = this.fontSize;
	  else var fontSize = 16;
	
	  // Settings for text-orientation in the center of both sides
	  var centerX = this.width / 2;
	  var centerY = (this.height / 2) + (fontSize / 2);
	
	  context.font = "italic bold " + fontSize + "px " + fontFamily;
	  context.textAlign = "center";
	  context.fillText(this.title, centerX, centerY, this.width);	
  }
              
  context.stroke();
  
  context.restore();
};