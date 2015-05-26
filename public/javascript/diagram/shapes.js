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

Shape.prototype.draw = function(canvas) {
  throw new Error('This method should not be directly called!');
};

Shape.prototype.toJSON = function() {
  throw new Error('This method should not be directly called!');
};

Shape.prototype.startEditmode = function(canvas) {
  throw new Error('This method should not be directly called!');
};

Shape.prototype.endEditmode = function(canvas) {
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
  
  this.attributes = attributes instanceof Array ? attributes : ['Attribute'];
  this.methods = methods instanceof Array ? methods : ['Methoden'];
  
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
  var minSpacing = Math.round(this.height * 0.05);
  var numAttributes = this.attributes.length;
  var numMethods = this.methods.length;
  var numElements = 1 + numAttributes + numMethods;
  context.save();
  context.beginPath();
  context.strokeStyle = this.borderColor;
  context.lineWidth = this.lineWidth;
  context.rect(this.x, this.y, this.width, this.height);
  //Initializes the font-size
  if (numAttributes > 0 && numMethods > 0) {
    var totalSpace = 6 + (numAttributes - 1) + (numMethods - 1);
  } else if (numAttributes > 0 && numMethods === 0) {
    var totalSpace = 4 + (numAttributes - 1);
  } else if (numAttributes === 0 && numMethods > 0) {
    var totalSpace = 4 + (numMethods - 1);
  } else {
    var totalSpace = 2;
  }
  
  // Settings for the fonts (fontSize are defined in px)
  var fontSize = Math.floor((this.height - (totalSpace * minSpacing)) / numElements);
  var fontTitle = "bold " + fontSize + "px " + this.fontFamily;
  var fontText = fontSize + "px " + this.fontFamily;

  // Settings for finding the biggest width and its text
  var biggestWidth = 0;
  var biggestText = "";
  
  // Finding the biggest width and its text
  for (var a = 0; a < 2; a++) {
    
    // Checks the width of the title  
    if (a === 0) {
      context.font = fontTitle;
        
      var width = context.measureText(this.title).width;
      if (width > biggestWidth) {
        biggestWidth = width;
        biggestText = this.text;
      }
    }
    
    // Checks the width of each attributes elements
    if (a === 1 && numAttributes > 0) {
      context.font = fontText;
        
      for (var b = 0; b < numAttributes; b++) {
        var width = context.measureText(this.attributes[b]).width;
        if (width > biggestWidth) {
          biggestWidth = width;
          biggestText = this.attributes[b];
        }
      }
    }
    
    // Checks the width of each functions elements
    if (a === 2 && numMethods > 0) {
      context.font = fontText;
        
      for (var b = 0; b < numMethods; b++) {
        var width = context.measureText(this.methods[b]).width;
        if (width > biggestWidth) {
          biggestWidth = width;
          biggestText = this.functions[b];
        }
      }
    }
  }
  
  // Reduce the font until it fits to the given width
  while (biggestWidth > (this.width / 2)) {
    fontSize--;
    
    fontTitle = "bold " + fontSize + "px " + this.fontFamily;
    fontText = fontSize + "px " + this.fontFamily;
    
    context.font = fontTitle;
    var width1 = context.measureText(biggestText).width;
        
    context.font = fontText;
    var width2 = context.measureText(biggestText).width;
    
    if (width1 < (this.width / 2) && width2 < (this.width / 2)) break;
  }

  // Settings for text-orientation
  var centerX = this.x + (this.width / 2);
  var centerY = this.y + ((this.height / 2) + (fontSize / 2));
  var leftSpacing = this.x + (this.width * 0.05);
  var yNextGap = minSpacing + (fontSize / 2);

  if (numAttributes > 0 && numMethods > 0) {
    var yPos = this.y + yNextGap;
      
    // Fill the title
    context.font = fontTitle;
    context.textAlign = "center";
    context.fillText(context.measureText(this.title).width, 155, 0);
    context.fillText(this.name, centerX, yPos, this.width);
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
    for (var a = 0; a < numMethods; a++) {
      context.fillText(this.methods[a], leftSpacing, yPos, this.width - leftSpacing);
    yPos += yNextGap; 
    }
  } else if (numAttributes > 0 && numMethods === 0) {
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
    for (var a = 0; a < numMethods; a++) {
      context.fillText(this.methods[a], leftSpacing, yPos, this.width - leftSpacing);
      yPos += yNextGap; 
    }   
  } else {
    context.font = "bold " + fontSize + "px " + this.fontFamily;
    context.textAlign = "center";
    context.fillText(this.name, centerX, centerY, this.width);
  }
  context.closePath();
  context.stroke();
  context.restore();
};
