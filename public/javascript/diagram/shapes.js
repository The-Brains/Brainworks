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
Layout.prototype.init = function(x, y, width, height, lineWidth) {
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
};

// Define setters for Layout
Layout.prototype.setX = function(x) {
  if (typeof x === "number") this.x = x;
  else this.x = 0;
};
Layout.prototype.setY = function(y) {
  if (typeof y === "number") this.y = y;
  else this.y = 0;
};
Layout.prototype.setWidth = function(width) {
  if (typeof width === "number") this.width = width;
  else this.width = 0;
};
Layout.prototype.setHeight = function(height) {
  if (typeof height === "number") this.height = height;
  else this.height = 0;
};
Layout.prototype.setLineWidth = function(lineWidth) {
  if (typeof lineWidth === "number") this.lineWidth = lineWidth;
  else this.lineWidth = 1;
};

//Define getters for Layout
Layout.prototype.getX = function() {
  return this.x;
};
Layout.prototype.getY = function() {
  return this.y;
};
Layout.prototype.getWidth = function() {
  return this.width;
};
Layout.prototype.getHeight = function() {
  return this.height;
};
Layout.prototype.getLineWidth = function() {
  return this.lineWidth;
};


/*******************************************************************************
 * The class ActiveClass                                                       *
 ******************************************************************************/

var ActiveClass = function(x, y, width, height, lineWidth, title, fontFamily, 
  fontSize) {
  this.init(x, y, width, height, lineWidth, title, fontFamily, fontSize);  
}
// This will inherit the class Layout
ActiveClass.prototype = new Layout();

// This will set the contstructor to itself
ActiveClass.prototype.constructor = ActiveClass;

// This will add a parent to the ActiveClass (also known as "super" in Java)
ActiveClass.parent = Layout.prototype;

// Define a initialisation for ActiveClass
ActiveClass.prototype.init = function(x, y, width, height, lineWidth, title, 
  fontFamily, fontSize) {
  
  // This will add the values to the parent class
  ActiveClass.parent.init(x, y, width, height, lineWidth);
  
  if (typeof title === "string") this.title = title;
  else this.title = "";
  
  if (typeof fontFamily === "string") this.fontFamily = fontFamily;
  else this.fontFamily = "";
  
  if (typeof fontSize === "number") this.fontSize = fontSize;
  else this.fontSize = 0;
};

// Define setters for ActiveClass
ActiveClass.prototype.setTitle = function(title) {
  if (typeof title === "string") this.title = title;	
};
ActiveClass.prototype.setFontFamily = function(fontFamily) {
  if (typeof fontFamily === "string") this.fontFamily = fontFamily;	
};
ActiveClass.prototype.setFontSize = function(fontSize) {
  if (typeof fontSize === "number") this.fontSize = fontSize;	
};
	
// Define getters for ActiveClass
ActiveClass.prototype.getTitle = function() {
  return this.title;	
};
ActiveClass.prototype.setFontFamily = function(fontFamily) {
  return this.fontFamily;	
};
ActiveClass.prototype.setFontSize = function(fontSize) {
  return this.fontSize;	
};

// Define functions for ActiveClass
ActiveClass.prototype.draw = function(context) {
  var x = ActiveClass.parent.getX();
  var y = ActiveClass.parent.getY();
  var width = ActiveClass.parent.getWidth();
  var height = ActiveClass.parent.getHeight();
  var lineWidth = ActiveClass.parent.getLineWidth();
    
  var innerWidth = width * 0.8;
  var posInnerWidth = (width - innerWidth) / 2;
    
  context.save();
  context.strokeStyle = "black";
  
  context.rect(x, y, width, height);
  context.rect(posInnerWidth, y, innerWidth, height);
      
  // Settings for border width
  if (lineWidth) context.lineWidth = lineWidth;
  else context.lineWidth = 1;
  
  if (this.title) {
	  
	  // Settings for font-family  
	  if (this.fontFamily) var fontFamily = this.fontFamily;
	  else var fontFamily = "Arial";
	
	  // Settings for font-size in px
	  if (this.fontSize) var fontSize = this.fontSize;
	  else var fontSize = 16;
	
	  // Settings for text-orientation in the center of both sides
	  var centerX = width / 2;
	  var centerY = (height / 2) + (fontSize / 2);
	
	  context.font = "italic bold " + fontSize + "px " + fontFamily;
	  context.textAlign = "center";
	  context.fillText(this.title, centerX, centerY, width);	
  }
              
  context.stroke();
  
  context.restore();
};