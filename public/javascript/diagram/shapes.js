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

// This will inherit the class Shape
Class.prototype = new Shape();

// Define functions for Class
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
 * The class AbstractClass                                                     *
 ******************************************************************************/

function AbstractClass(x, y, width, height, lineWidth, title, fontFamily, 
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

// This will inherit the class Shape
AbstractClass.prototype = new Shape();

// Define functions for AbstractClass
AbstractClass.prototype.draw = function(context) {
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
	
	  context.font = "italic bold " + fontSize + "px " + fontFamily;
	  context.textAlign = "center";
	  context.fillText(this.title, centerX, centerY, this.width);	
  }
              
  context.stroke();
  
  context.restore();
};

/*******************************************************************************
 * The class Notice                                                            *
 ******************************************************************************/

function Notice(x, y, width, height, lineWidth, title, fontFamily, 
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

//This will inherit the class Shape
Notice.prototype = new Shape();

//Define functions for Class
Notice.prototype.draw = function(context) {
  var horizontalPiece = this.width * 0.8;
  var verticalPiece = this.height * 0.3;
	
  context.save();
  context.strokeStyle = "black";
  
  context.beginPath();
  context.moveTo(this.x, this.y);
  context.lineTo(this.x + horizontalPiece, this.y);
  context.lineTo(this.x + this.width, this.y + verticalPiece);
  context.lineTo(this.x + this.width, this.y + this.height);
  context.lineTo(this.x, this.y + this.height);
  context.lineTo(this.x, this.y);
  context.moveTo(this.x + horizontalPiece, this.y);
  context.lineTo(this.x + horizontalPiece, this.y + verticalPiece);
  context.lineTo(this.x + this.width, this.y + verticalPiece);
      
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

// This will inherit the class Shape
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
	  var centerX = this.x + (this.width / 2);
	  var centerY = this.y + ((this.height / 2) + (fontSize / 2));
	
	  context.font = "italic bold " + fontSize + "px " + fontFamily;
	  context.textAlign = "center";
	  context.fillText(this.title, centerX, centerY, this.width);	
  }
              
  context.stroke();
  
  context.restore();
};

/*******************************************************************************
 * The class PackageClass                                                      *
 ******************************************************************************/

function PackageClass(x, y, width, height, lineWidth, title, fontFamily, 
  attributes, functions) {
  Shape.call(this, x, y, width, height, lineWidth);
	
  if (typeof title === "string") this.title = title
  else this.title = "";
  
  if (typeof fontFamily === "string") this.fontFamily = fontFamily
  else this.fontFamily = "";
  
  if (attributes instanceof Array) this.attributes = attributes;
  else this.attributes = [];
  
  if (functions instanceof Array) this.functions = functions;
  else this.functions = [];
	
  // Define the setters
  this.setTitle = function(title) {
    if (typeof title === "string") this.title = title;
  };
  this.setFontFamily = function(fontFamily) {
	if (typeof fontFamily === "string") this.fontFamily = fontFamily;
  };
  this.setAttributes = function(attributes) {
    if (attributes instanceof Array) this.attributes = attributes;
  };
  this.setFunctions = function(functions) {
	if (functions instanceof Array) this.functions = functions;
  };
	
  // Define the getters
  this.getTitle = function() {
    return this.title;
  };
  this.getFontFamily = function() {
    return this.fontFamily;
  };
  this.getAttributes = function() {
    return this.attributes;
  };
  this.getFunctions = function() {
	return this.functions;
  };
}

// This will inherit the class Shape
PackageClass.prototype = new Shape();

// Define functions for PackageClass
PackageClass.prototype.draw = function(context) {
  var minSpacing = Math.round(this.height * 0.05);
  	
  context.save();
  context.strokeStyle = "black";
  context.textBaseline = "middle";
	
  context.rect(this.x, this.y, this.width, this.height);
	   
  // Settings for border width
  if (this.lineWidth) context.lineWidth = this.lineWidth;
  else context.lineWidth = 1;
	
  if (this.title) {
	  var numAttributes = this.attributes.length;
	  var numFunctions = this.functions.length;
	  var numElements = 1 + numAttributes + numFunctions;
	
	  // Settings for font-family  
	  if (this.fontFamily) var fontFamily = this.fontFamily;
	  else var fontFamily = "Arial";
	
	  // Initializes the font-size
	  if (numAttributes > 0 && numFunctions > 0) {
	    var totalSpace = 6 + (numAttributes - 1) + (numFunctions - 1);
	  } else if (numAttributes > 0 && numFunctions === 0) {
	    var totalSpace = 4 + (numAttributes - 1);
	  } else if (numAttributes === 0 && numFunctions > 0) {
	    var totalSpace = 4 + (numFunctions - 1);
	  } else {
	    var totalSpace = 2;
	  }
		
	  // Settings for the fonts (fontSize are defined in px)
	  var fontSize = Math.floor((this.height - (totalSpace * minSpacing)) / numElements);
	  var fontTitle = "bold " + fontSize + "px " + fontFamily;
	  var fontText = fontSize + "px " + fontFamily;
	
	  /** TODO: Check if a text is bigger than the given width, then create a 
	   * decreasing loop to reduce the font size. Meanwhile in the loop check if 
	   * the new width is correct.*/
	
	  // Settings for text-orientation
	  var centerX = this.x + (this.width / 2);
	  var centerY = this.y + ((this.height / 2) + (fontSize / 2));
	  var leftSpacing = this.x + (this.width * 0.05);
	  var yNextGap = minSpacing + (fontSize / 2);
	
	  if (numAttributes > 0 && numFunctions > 0) {
	    var yPos = this.y + yNextGap;
	  	  
	    // Fill the title
	    context.font = fontTitle;
	    context.textAlign = "center";
	    context.fillText(context.measureText(this.title).width, 155, 0);
	    context.fillText(this.title, centerX, yPos, this.width);
	    yPos += yNextGap;
	  
	    // Draws the first line
	    context.moveTo(this.x, yPos);
	    context.lineTo(this.width, yPos);
	    yPos += yNextGap;
	  
	    // Fill the attributes
	    context.font = fontText;
	    context.textAlign = "left";
	    for (var a = 0; a < numAttributes; a++) {
		    context.fillText(this.attributes[a], leftSpacing, yPos, this.width - leftSpacing);
		    yPos += yNextGap; 
	    }
	  
	    // Draws the second line
	    context.moveTo(this.x, yPos);
	    context.lineTo(this.width, yPos);
	    yPos += yNextGap;
	  
	    // Fill the functions
	    context.font = fontText;
	    context.textAlign = "left";
	    for (var a = 0; a < numFunctions; a++) {
		    context.fillText(this.functions[a], leftSpacing, yPos, this.width - leftSpacing);
		  yPos += yNextGap; 
	    }
	  } else if (numAttributes > 0 && numFunctions === 0) {
	    var yPos = this.y + yNextGap;
	  	  
	    // Fill the title
	    context.font = fontTitle;
	    context.textAlign = "center";
	    context.fillText(this.title, centerX, yPos, this.width);
	    yPos += yNextGap;
		  
	    // Draws the first line
	    context.moveTo(this.x, yPos);
	    context.lineTo(this.width, yPos);
	    yPos += yNextGap;
		  
	    // Fill the attributes
	    context.font = fontText;
	    context.textAlign = "left";
	    for (var a = 0; a < numAttributes; a++) {
	      context.fillText(this.attributes[a], leftSpacing, yPos, this.width - leftSpacing);
	      yPos += yNextGap; 
	    }
	  } else if (numAttributes === 0 && numFunctions > 0) {
	    var yPos = this.y + yNextGap;
	  	  
	    // Fill the title
	    context.font = fontTitle;
	    context.textAlign = "center";
	    alert(context.measureText(this.title).width);
	    context.fillText(this.title, centerX, yPos, this.width);
	    yPos += yNextGap;
		  
	    // Draws the first line
	    context.moveTo(this.x, yPos);
	    context.lineTo(this.width, yPos);
	    yPos += yNextGap;
		  
	    // Fill the functions
	    context.font = fontText;
	    context.textAlign = "left";
	    for (var a = 0; a < numFunctions; a++) {
		    context.fillText(this.functions[a], leftSpacing, yPos, this.width - leftSpacing);
		    yPos += yNextGap; 
	    }		
	  } else {
	    context.font = "bold " + fontSize + "px " + fontFamily;
	    context.textAlign = "center";
	    context.fillText(this.title, centerX, centerY, this.width);
	  }
  }
	           
  context.stroke();
	
  context.restore();
};