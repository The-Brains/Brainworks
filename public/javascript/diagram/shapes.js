/**
 * @param elementId
 * @param x
 * @param y
 * @param width
 * @param height
 * @param name
 * @param lineWidth
 * @param borderColor
 * @param fontFamily
 * @param fontSize
 */
function Shape(elementId, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize) {
  this._id = elementId;
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

Shape.prototype.applyJSON = function(json) {
  throw new Error('This method should not be directly called!');
};

Shape.prototype.startEditmode = function(modal) {
  throw new Error('This method should not be directly called!');
};


function EmptyClass(elementId, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize) {
  Shape.call(this, elementId, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize);
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

EmptyClass.prototype.toJSON = function() {
  return {
    _type: 'EmptyClass',
    x: this.getX(),
    y: this.getY(),
    height: this.getHeight(),
    width: this.getWidth(),
    name: this.getName(),
    _id: this._id
  };
};

EmptyClass.prototype.applyJSON = function(json) {
  this.x = json.x;
  this.y = json.y;
  this.height = json.height;
  this.width = json.width;
  this.name = json.name;
  this._id = json._id;
};

EmptyClass.prototype.startEditmode = function(modal) {
  var self = this;
  
  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      settings: function() {
        return {
          title: self.getName(),
          attributes: null,
          methods: null
        };  
      }
    }
  });
  
  modalInstance.result.then(function(result) {
    self.setName(result.title);
  });
};


function AbstractClass(elementId, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize, attributes, methods) {
  Shape.call(this, elementId, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize);

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

AbstractClass.prototype = new Shape();

AbstractClass.prototype.draw = function(canvas) {
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
  var fontTitle = 'bold italic ' + fontSize + 'px ' + this.fontFamily;
  var fontText = fontSize + 'px ' + this.fontFamily;

  // Settings for finding the biggest width and its text
  var biggestWidth = 0;
  var biggestText = '';

  // Finding the biggest width and its text
  for (var a = 0; a < 2; a++) {

    // Checks the width of the title
    if (a === 0) {
      context.font = fontTitle;

      var width = context.measureText(this.name).width;
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

    fontTitle = 'bold italic ' + fontSize + 'px ' + this.fontFamily;
    fontText = fontSize + 'px ' + this.fontFamily;

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
    context.textAlign = 'center';
    context.fillText(this.name, centerX, yPos, this.width);
    yPos += yNextGap;

    // Draws the first line
    context.moveTo(this.x, yPos);
    context.lineTo(this.x + this.width, yPos);
    yPos += yNextGap;

    // Fill the attributes
    context.font = fontText;
    context.textAlign = 'left';
    for (var a = 0; a < numAttributes; a++) {
      context.fillText(this.attributes[a], leftSpacing, yPos, this.width * 0.95);
      yPos += yNextGap;
    }

    // Draws the second line
    context.moveTo(this.x, yPos);
    context.lineTo(this.x + this.width, yPos);
    yPos += yNextGap;

    // Fill the functions
    context.font = fontText;
    context.textAlign = 'left';
    for (var a = 0; a < numMethods; a++) {
      context.fillText(this.methods[a], leftSpacing, yPos, this.width * 0.95);
    yPos += yNextGap;
    }
  } else if (numAttributes > 0 && numMethods === 0) {
    var yPos = this.y + yNextGap;

    // Fill the title
    context.font = fontTitle;
    context.textAlign = 'center';
    context.fillText(this.name, centerX, yPos, this.width);
    yPos += yNextGap;

    // Draws the first line
    context.moveTo(this.x, yPos);
    context.lineTo(this.x + this.width, yPos);
    yPos += yNextGap;

    // Fill the attributes
    context.font = fontText;
    context.textAlign = 'left';
    for (var a = 0; a < numAttributes; a++) {
      context.fillText(this.attributes[a], leftSpacing, yPos, this.width * 0.95);
      yPos += yNextGap;
    }
  } else if (numAttributes === 0 && numMethods > 0) {
    var yPos = this.y + yNextGap;

    // Fill the title
    context.font = fontTitle;
    context.textAlign = 'center';
    alert(context.measureText(this.name).width);
    context.fillText(this.name, centerX, yPos, this.width);
    yPos += yNextGap;

    // Draws the first line
    context.moveTo(this.x, yPos);
    context.lineTo(this.x + this.width, yPos);
    yPos += yNextGap;

    // Fill the functions
    context.font = fontText;
    context.textAlign = 'left';
    for (var a = 0; a < numMethods; a++) {
      context.fillText(this.methods[a], leftSpacing, yPos, this.width * 0.95);
      yPos += yNextGap;
    }
  } else {
    context.font = 'bold ' + fontSize + 'px ' + this.fontFamily;
    context.textAlign = 'center';
    context.fillText(this.name, centerX, centerY, this.width);
  }
  context.closePath();
  context.stroke();
  context.restore();
};

AbstractClass.prototype.toJSON = function() {
  return {
    _type: 'AbstractClass',
    x: this.getX(),
    y: this.getY(),
    height: this.getHeight(),
    width: this.getWidth(),
    name: this.getName(),
    methods: this.getMethods(),
    attributes: this.getAttributes(),
    _id: this._id
  };
};

AbstractClass.prototype.applyJSON = function(json) {
  this.x = json.x;
  this.y = json.y;
  this.height = json.height;
  this.width = json.width;
  this.name = json.name;
  this.methods = json.methods;
  this.attributes = json.attributes;
  this._id = json._id;
};

AbstractClass.prototype.startEditmode = function(modal) {
  var self = this;
  
  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      settings: function() {
        return {
          title: self.getName(),
          attributes: self.getAttributes().join("\n"),
          methods: self.getMethods().join("\n")
        };  
      }
    }
  });
  
  modalInstance.result.then(function(result) {
    self.setName(result.title);
    self.setAttributes(result.attributes.split("\n"));
    self.setMethods(result.methods.split("\n"));
  });
};


function Comment(elementId, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize) {
  Shape.call(this, elementId, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize);
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

Comment.prototype.toJSON = function() {
  return {
    _type: 'Comment',
    x: this.getX(),
    y: this.getY(),
    height: this.getHeight(),
    width: this.getWidth(),
    name: this.getName(),
    _id: this._id
  };
};

Comment.prototype.applyJSON = function(json) {
  this.x = json.x;
  this.y = json.y;
  this.height = json.height;
  this.width = json.width;
  this.name = json.name;
  this._id = json._id;
};

Comment.prototype.startEditmode = function(modal) {
  var self = this;
  
  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      settings: function() {
        return {
          title: self.getName(),
          attributes: null,
          methods: null
        };  
      }
    }
  });
  
  modalInstance.result.then(function(result) {
    self.setName(result.title);
  });
};


function ActiveClass(elementId, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize) {
  Shape.call(this, elementId, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize);
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

ActiveClass.prototype.toJSON = function() {
  return {
    _type: 'ActiveClass',
    x: this.getX(),
    y: this.getY(),
    height: this.getHeight(),
    width: this.getWidth(),
    name: this.getName(),
    _id: this._id
  };
};

ActiveClass.prototype.applyJSON = function(json) {
  this.x = json.x;
  this.y = json.y;
  this.height = json.height;
  this.width = json.width;
  this.name = json.name;
  this._id = json._id;
};

ActiveClass.prototype.startEditmode = function(modal) {
  var self = this;
  
  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      settings: function() {
        return {
          title: self.getName(),
          attributes: null,
          methods: null
        };  
      }
    }
  });
  
  modalInstance.result.then(function(result) {
    self.setName(result.title);
  });
};


function Class(elementId, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize, attributes, methods) {
  Shape.call(this, elementId, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize);

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
  var fontTitle = 'bold ' + fontSize + 'px ' + this.fontFamily;
  var fontText = fontSize + 'px ' + this.fontFamily;

  // Settings for finding the biggest width and its text
  var biggestWidth = 0;
  var biggestText = '';

  // Finding the biggest width and its text
  for (var a = 0; a < 2; a++) {

    // Checks the width of the title
    if (a === 0) {
      context.font = fontTitle;

      var width = context.measureText(this.name).width;
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

    fontTitle = 'bold ' + fontSize + 'px ' + this.fontFamily;
    fontText = fontSize + 'px ' + this.fontFamily;

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
    context.textAlign = 'center';
    context.fillText(this.name, centerX, yPos, this.width);
    yPos += yNextGap;

    // Draws the first line
    context.moveTo(this.x, yPos);
    context.lineTo(this.x + this.width, yPos);
    yPos += yNextGap;

    // Fill the attributes
    context.font = fontText;
    context.textAlign = 'left';
    for (var a = 0; a < numAttributes; a++) {
      context.fillText(this.attributes[a], leftSpacing, yPos, this.width * 0.95);
      yPos += yNextGap;
    }

    // Draws the second line
    context.moveTo(this.x, yPos);
    context.lineTo(this.x + this.width, yPos);
    yPos += yNextGap;

    // Fill the functions
    context.font = fontText;
    context.textAlign = 'left';
    for (var a = 0; a < numMethods; a++) {
      context.fillText(this.methods[a], leftSpacing, yPos, this.width * 0.95);
    yPos += yNextGap;
    }
  } else if (numAttributes > 0 && numMethods === 0) {
    var yPos = this.y + yNextGap;

    // Fill the title
    context.font = fontTitle;
    context.textAlign = 'center';
    context.fillText(this.name, centerX, yPos, this.width);
    yPos += yNextGap;

    // Draws the first line
    context.moveTo(this.x, yPos);
    context.lineTo(this.x + this.width, yPos);
    yPos += yNextGap;

    // Fill the attributes
    context.font = fontText;
    context.textAlign = 'left';
    for (var a = 0; a < numAttributes; a++) {
      context.fillText(this.attributes[a], leftSpacing, yPos, this.width * 0.95);
      yPos += yNextGap;
    }
  } else if (numAttributes === 0 && numFunctions > 0) {
    var yPos = this.y + yNextGap;

    // Fill the title
    context.font = fontTitle;
    context.textAlign = 'center';
    context.fillText(this.name, centerX, yPos, this.width);
    yPos += yNextGap;

    // Draws the first line
    context.moveTo(this.x, yPos);
    context.lineTo(this.x + this.width, yPos);
    yPos += yNextGap;

    // Fill the functions
    context.font = fontText;
    context.textAlign = 'left';
    for (var a = 0; a < numMethods; a++) {
      context.fillText(this.methods[a], leftSpacing, yPos, this.width * 0.95);
      yPos += yNextGap;
    }
  } else {
    context.font = 'bold ' + fontSize + 'px ' + this.fontFamily;
    context.textAlign = 'center';
    context.fillText(this.name, centerX, centerY, this.width);
  }
  context.closePath();
  context.stroke();
  context.restore();
};

Class.prototype.toJSON = function() {
  return {
    _type: 'Class',
    x: this.getX(),
    y: this.getY(),
    height: this.getHeight(),
    width: this.getWidth(),
    name: this.getName(),
    methods: this.getMethods(),
    attributes: this.getAttributes(),
    _id: this._id
  };
};

Class.prototype.applyJSON = function(json) {
  this.x = json.x;
  this.y = json.y;
  this.height = json.height;
  this.width = json.width;
  this.name = json.name;
  this._id = json._id;
  this.methods = json.methods;
  this.attributes = json.attributes;
};

Class.prototype.startEditmode = function(modal) {
  var self = this;
  
  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      settings: function() {
        return {
          title: self.getName(),
          attributes: self.getAttributes().join("\n"),
          methods: self.getMethods().join("\n")
        };  
      }
    }
  });
  
  modalInstance.result.then(function(result) {
    self.setName(result.title);
    self.setAttributes(result.attributes.split("\n"));
    self.setMethods(result.methods.split("\n"));
  });
};


function Interface(elementId, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize, methods) {
  Shape.call(this, elementId, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize);

  this.methods = methods instanceof Array ? methods : ['Methoden'];

  this.setMethods = function(methods) {
    this.methods = methods;
  };

  this.getMethods = function() {
    return this.methods;
  };
}

Interface.prototype = new Shape();

Interface.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var minSpacing = Math.round(this.height * 0.05);
  var numMethods = this.methods.length;
  var numElements = 2 + numMethods;
  var firstTitle = '<<interface>>';
  context.save();
  context.beginPath();
  context.strokeStyle = this.borderColor;
  context.lineWidth = this.lineWidth;
  context.rect(this.x, this.y, this.width, this.height);
  //Initializes the font-size
  if (numMethods > 0) {
    var totalSpace = 5 + (numMethods - 1);
  } else {
    var totalSpace = 2;
  }

  // Settings for the fonts (fontSize are defined in px)
  var fontSize = Math.floor((this.height - (totalSpace * minSpacing)) / numElements);
  var fontTitle = 'bold italic ' + fontSize + 'px ' + this.fontFamily;
  var fontText = fontSize + 'px ' + this.fontFamily;

  // Settings for finding the biggest width and its text
  var biggestWidth = 0;
  var biggestText = '';

  // Finding the biggest width and its text
  for (var a = 0; a < 2; a++) {

  // Checks the width of the interface-title
  if (a === 0) {
    context.font = fontText;

    var width = context.measureText(firstTitle).width;
    if (width > biggestWidth) {
      biggestWidth = width;
      biggestText = this.text;
    }
  }

    // Checks the width of the title
    if (a === 1) {
      context.font = fontTitle;

      var width = context.measureText(this.name).width;
      if (width > biggestWidth) {
        biggestWidth = width;
        biggestText = this.text;
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

    fontTitle = 'bold ' + fontSize + 'px ' + this.fontFamily;
    fontText = fontSize + 'px ' + this.fontFamily;

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

  if (numMethods > 0) {
    var yPos = this.y + yNextGap;

    // Fill the first-title
    context.font = fontText;
    context.textAlign = 'center';
    context.fillText(firstTitle, centerX, yPos, this.width);
    yPos += yNextGap;

    // Fill the title
    context.font = fontTitle;
    context.textAlign = 'center';
    context.fillText(this.name, centerX, yPos, this.width);
    yPos += yNextGap;

    // Draws the first line
    context.moveTo(this.x, yPos);
    context.lineTo(this.x + this.width, yPos);
    yPos += yNextGap;

    // Fill the functions
    context.font = fontText;
    context.textAlign = 'left';
    for (var a = 0; a < numMethods; a++) {
      context.fillText(this.methods[a], leftSpacing, yPos, this.width * 0.95);
      yPos += yNextGap;
    }
  } else {
    context.font = 'bold ' + fontSize + 'px ' + this.fontFamily;
    context.textAlign = 'center';
    context.fillText(this.name, centerX, centerY, this.width);
  }
  context.closePath();
  context.stroke();
  context.restore();
};

Interface.prototype.toJSON = function() {
  return {
    _type: 'Interface',
    x: this.getX(),
    y: this.getY(),
    height: this.getHeight(),
    width: this.getWidth(),
    name: this.getName(),
    methods: this.getMethods(),
    _id: this._id
  };
};

Interface.prototype.applyJSON = function(json) {
  this.x = json.x;
  this.y = json.y;
  this.height = json.height;
  this.width = json.width;
  this.name = json.name;
  this._id = json._id;
  this.methods = json.methods;
};

Interface.prototype.startEditmode = function(modal) {
  var self = this;
  
  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      settings: function() {
        return {
          title: self.getName(),
          attributes: null,
          methods: self.getMethods().join("\n")
        };  
      }
    }
  });
  
  modalInstance.result.then(function(result) {
    self.setName(result.title);
    self.setMethods(result.methods.split("\n"));
  });
};