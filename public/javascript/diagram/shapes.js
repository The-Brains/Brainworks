/**
 *  Logik zum Definieren, Zeichnen, Wandeln, Speichern und Editieren der Klassenelemente
 */

/**
 * Definition des Prototypes der Klassenelemente (von diesem Erben andere Klassenelemente)
 * @param {Number[]} $elementId
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {String} name
 * @param {Number} lineWidth
 * @param {String} borderColor
 * @param {String} fontFamily
 * @param {Number} fontSize
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

  this.setX =
    /**
     * @param {Number} x
     */
    function(x) {
    this.x = x;
  };

  this.setY =
    /**
     * @param {Number} y
     */
    function(y) {
    this.y = y;
  };

  this.setWidth =
    /**
     * @param {Number} width
     */
    function(width) {
    this.width = width;
  };

  this.setHeight =
    /**
     * @param {Number} height
     */
    function(height) {
    this.height = height;
  };

  this.setBorderColor =
    /**
     * @param {String} borderColor
     */
    function(borderColor) {
    this.borderColor = borderColor;
  };

  this.setLineWidth =
    /**
     * @param {Number} lineWidth
     */
    function(lineWidth) {
    this.lineWidth = lineWidth;
  };

  this.setName =
    /**
     * @param {String} name
     */
    function(name) {
    this.name = name;
  };

  this.setFontFamily =
    /**
     * @param {String} fontFamily
     */
    function(fontFamily) {
    this.fontFamily = fontFamily;
  };

  this.setFontSize =
    /**
     * @param {Number} fontSize
     */
    function(fontSize) {
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

Shape.prototype.draw =
  /**
   * Zeichen des Prototypes der Klassenelemente
   * @param {Object} canvas
   */
  function(canvas) {
  throw new Error('This method should not be directly called!');
};

Shape.prototype.toJSON =
  /**
   * Wandeln des Prototypes der Kassenelemente in ein JSON Objekt
   */
  function() {
  throw new Error('This method should not be directly called!');
};

Shape.prototype.applyJSON =
  /**
   * Speichern des Prototypes der Klassenelemente als JSON Objekt
   * @param {Object} json
   */
  function(json) {
  throw new Error('This method should not be directly called!');
};

Shape.prototype.startEditmode =
  /**
   * Editieren des Prototypes der Klassenelemente als JSON Objekt
   * @param {Object} modal
   * @param {Object} callback
   */
  function(modal, callback) {
  throw new Error('This method should not be directly called!');
};
/**
 * Definition eines einfachen Klassenelementes
 * @param {Number[]} $elementId
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {String} name
 * @param {Number} lineWidth
 * @param {String} borderColor
 * @param {String} fontFamily
 * @param {Number} fontSize
 */
function EmptyClass(elementId, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize) {
  Shape.call(this, elementId, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize);
}
EmptyClass.prototype = new Shape();

EmptyClass.prototype.draw =
  /**
   * Zeichnen des einfachen Klassenelementes
   * @param {Object} canvas
   */
  function(canvas) {
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

EmptyClass.prototype.toJSON =
  /**
   * Wandeln des einfachen Klassenelementes zu einem JSON Objekt
   */
  function() {
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

EmptyClass.prototype.applyJSON =
  /**
   * Speichern des JSON Objekt des einfachen Klassenelementes
   * @param {Object} json
   */
  function(json) {
  this.x = json.x;
  this.y = json.y;
  this.height = json.height;
  this.width = json.width;
  this.name = json.name;
  this._id = json._id;
};

EmptyClass.prototype.startEditmode =
  /**
   * Editieren des einfachen Klassenelementes aktivieren
   * @param {Object} modal
   * @param {Object} callback
   */
  function(modal, callback) {
  var self = this;

  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      settings:
        /**
         * Liefert den Namen des Attributes
         */
        function() {
        return {
          name: self.getName()
        };
      }
    }
  });

  modalInstance.result.then(
    /**
     * Ändert den Namen des Attributes
     * @param {Object} result
     */
    function(result) {
    self.setName(result.name);
    callback();
  });
};

/**
 * Definition einer abstrakten Klasse
 * @param {Number[]} $elementId
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {String} borderColor
 * @param {Number} lineWidth
 * @param {String} name
 * @param {String} fontFamily
 * @param {Number} fontSize
 * @param {Object[]} attributes
 * @param {Object[]} methods
 */
function AbstractClass(elementId, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize, attributes, methods) {
  Shape.call(this, elementId, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize);

  this.attributes = attributes instanceof Array ? attributes : ['Attribute'];
  this.methods = methods instanceof Array ? methods : ['Methoden'];

  this.setAttributes =
    /**
     * @param {Object[]} attributes
     */
    function(attributes) {
    this.attributes = attributes;
  };


  this.setMethods =
    /**
     * @param {Object[]} methods
     */
    function(methods) {
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

AbstractClass.prototype.draw =
  /**
   * Zeichnen der abstrakten Klasse
   * @param {Object} canvas
   */
  function(canvas) {
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
  /**
   * TODO - Folgende Zeilenkommentare nochmal auf dessen Sinn prüfen - bisher nur übersetzt
   * Btw. Würde der ganze Kram einfach dreimal copy/pastet?
   */
  /* Initiiert die Schriftgröße */
  if (numAttributes > 0 && numMethods > 0) {
    var totalSpace = 6 + (numAttributes - 1) + (numMethods - 1);
  } else if (numAttributes > 0 && numMethods === 0) {
    var totalSpace = 4 + (numAttributes - 1);
  } else if (numAttributes === 0 && numMethods > 0) {
    var totalSpace = 4 + (numMethods - 1);
  } else {
    var totalSpace = 2;
  }

  /* Einstellungen für Schriften */
  var fontSize = Math.floor((this.height - (totalSpace * minSpacing)) / numElements);
  var fontTitle = 'bold italic ' + fontSize + 'px ' + this.fontFamily;
  var fontText = fontSize + 'px ' + this.fontFamily;

  var biggestWidth = 0;
  var biggestText = '';

  /* Finden der größten Breite und dessen Text */
  for (var a = 0; a < 2; a++) {

    /* Prüft die Breite des Titels */
    if (a === 0) {
      context.font = fontTitle;

      var width = context.measureText(this.name).width;
      if (width > biggestWidth) {
        biggestWidth = width;
        biggestText = this.text;
      }
    }

    /* Prüft die Breite jedes elementes der Attribute */
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

    /* Prüft die Breite jedes elementes der Attribute */
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

  /* Verringert die Schriftgröße, bis sie in die gegebene Breite passt */
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

  /* Einstellungen für die text-orientation */
  var centerX = this.x + (this.width / 2);
  var centerY = this.y + ((this.height / 2) + (fontSize / 2));
  var leftSpacing = this.x + (this.width * 0.05);
  var yNextGap = minSpacing + (fontSize / 2);

  if (numAttributes > 0 && numMethods > 0) {
    var yPos = this.y + yNextGap;

    /* Füllt den Titel */
    context.font = fontTitle;
    context.textAlign = 'center';
    context.fillText(this.name, centerX, yPos, this.width);
    yPos += yNextGap;

    /* Zeichnet die erste Zeile */
    context.moveTo(this.x, yPos);
    context.lineTo(this.x + this.width, yPos);
    yPos += yNextGap;

    /* Füllt die Attribute */
    context.font = fontText;
    context.textAlign = 'left';
    for (var a = 0; a < numAttributes; a++) {
      context.fillText(this.attributes[a], leftSpacing, yPos, this.width * 0.95);
      yPos += yNextGap;
    }

    /* Zeichnet eine zweite Zeile */
    context.moveTo(this.x, yPos);
    context.lineTo(this.x + this.width, yPos);
    yPos += yNextGap;

    /* Füllt die Funktionen */
    context.font = fontText;
    context.textAlign = 'left';
    for (var a = 0; a < numMethods; a++) {
      context.fillText(this.methods[a], leftSpacing, yPos, this.width * 0.95);
    yPos += yNextGap;
    }
  } else if (numAttributes > 0 && numMethods === 0) {
    var yPos = this.y + yNextGap;

    /* Füllt den Titel */
    context.font = fontTitle;
    context.textAlign = 'center';
    context.fillText(this.name, centerX, yPos, this.width);
    yPos += yNextGap;

    /* Zeichent die erste Zeile */
    context.moveTo(this.x, yPos);
    context.lineTo(this.x + this.width, yPos);
    yPos += yNextGap;

    /* Füllt die Attribute */
    context.font = fontText;
    context.textAlign = 'left';
    for (var a = 0; a < numAttributes; a++) {
      context.fillText(this.attributes[a], leftSpacing, yPos, this.width * 0.95);
      yPos += yNextGap;
    }
  } else if (numAttributes === 0 && numMethods > 0) {
    var yPos = this.y + yNextGap;

    /* Füllt den Titel */
    context.font = fontTitle;
    context.textAlign = 'center';
    alert(context.measureText(this.name).width);
    context.fillText(this.name, centerX, yPos, this.width);
    yPos += yNextGap;

    /* Zeichnet die erste Zeile */
    context.moveTo(this.x, yPos);
    context.lineTo(this.x + this.width, yPos);
    yPos += yNextGap;

    /* Füllt die Funktionen */
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

AbstractClass.prototype.toJSON =
  /**
   * Wandeln der abstrakten Klasse in ein JSON Objekt
   */
  function() {
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

AbstractClass.prototype.applyJSON =
  /**
   * Speichern des JSON Objektes der abstrakten Klasse
   * @param {Object} json
   */
  function(json) {
  this.x = json.x;
  this.y = json.y;
  this.height = json.height;
  this.width = json.width;
  this.name = json.name;
  this.methods = json.methods;
  this.attributes = json.attributes;
  this._id = json._id;
};

AbstractClass.prototype.startEditmode =
  /**
   * Editieren der abstrakten Klasse aktivieren
   * @param {Object} modal
   * @param {Object} callback
   */
  function(modal, callback) {
  var self = this;

  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      settings:
        /**
         * Auslesen der Attributnamen im "Eigenschaften Ändern" Menü
         */
        function() {
        return {
          name: self.getName(),
          attributes: self.getAttributes().join("\n"),
          methods: self.getMethods().join("\n")
        };
      }
    }
  });

  modalInstance.result.then(
    /**
     * Ändern der Eigenschaften eines Elementes
     * @param {Object} result
     */
    function(result) {
    self.setName(result.name);
    self.setAttributes(result.attributes.split("\n"));
    self.setMethods(result.methods.split("\n"));
    callback();
  });
};

/**
 * Definition des Kommentars
 * @param {Number[]} $elementId
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {String} borderColor
 * @param {Number} lineWidth
 * @param {String} name
 * @param {String} fontFamily
 * @param {Number} fontSize
 */
function Comment(elementId, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize) {
  Shape.call(this, elementId, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize);
}
Comment.prototype = new Shape();

Comment.prototype.draw =
  /**
   * Zeichnen des Kommentars
   * @param {Object} canvas
   */
  function(canvas) {
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

Comment.prototype.toJSON =
  /**
   * Wandeln des Kommentars zu einem JSON Objekt
   */
  function() {
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

Comment.prototype.applyJSON =
  /**
   * Speichern des JSON Objekts des Kommentars
   * @param {Object} json
   */
  function(json) {
  this.x = json.x;
  this.y = json.y;
  this.height = json.height;
  this.width = json.width;
  this.name = json.name;
  this._id = json._id;
};

Comment.prototype.startEditmode =
  /**
   * Editieren des Kommentars wird aktiviert
   * @param {Object} modal
   * @param {Object} callback
   */
  function(modal, callback) {
  var self = this;

  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      settings:
        /**
         * Liefert den Namen des Kommentars aus den Eigenschaften
         */
        function() {
        return {
          name: self.getName()
        };
      }
    }
  });

  modalInstance.result.then(
    /**
     * Ändert den Namen des Kommentars in den Eigenschaften
     * @param {Object} result
     */
    function(result) {
    self.setName(result.name);
    callback();
  });
};

/**
 * Definition einer aktiven Klasse
 * @param {Number[]} $elementId
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {String} name
 * @param {Number} lineWidth
 * @param {String} borderColor
 * @param {String} fontFamily
 * @param {Number} fontSize
 */
function ActiveClass(elementId, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize) {
  Shape.call(this, elementId, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize);
}
ActiveClass.prototype = new Shape();
ActiveClass.prototype.draw =
  /**
   * Zeichnen der aktiven Klasse
   * @param {Object} canvas
   */
  function(canvas) {
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

ActiveClass.prototype.toJSON =
  /**
   * Wandelt die aktive Klasse zu einem JSON Objekt
   */
  function() {
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

ActiveClass.prototype.applyJSON =
  /**
   * Speichern des JSON Objektes der aktiven Klasse
   * @param {Object} json
   */
  function(json) {
  this.x = json.x;
  this.y = json.y;
  this.height = json.height;
  this.width = json.width;
  this.name = json.name;
  this._id = json._id;
};

ActiveClass.prototype.startEditmode =
  /**
   * Editieren der aktiven Klasse aktivieren
   * @param {Object} modal
   * @param {Object} callback
   */
  function(modal, callback) {
  var self = this;

  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      settings:
        /**
         * Liefert den Namen des Attributes
         */
        function() {
        return {
          name: self.getName()
        };
      }
    }
  });

  modalInstance.result.then(
    /**
     * @param {Object} result
     */
    function(result) {
    self.setName(result.name);
    callback();
  });
};
/**
 * Definition einer Standartklasse (mit Attribut & Methode)
 * @param {Number[]} $elementId
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {String} name
 * @param {Number} lineWidth
 * @param {String} borderColor
 * @param {String} fontFamily
 * @param {Number} fontSize
 * @param {Object[]} methods
 */
function Class(elementId, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize, attributes, methods) {
  Shape.call(this, elementId, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize);

  this.attributes = attributes instanceof Array ? attributes : ['Attribute'];
  this.methods = methods instanceof Array ? methods : ['Methoden'];

  this.setAttributes =
    /**
     * @param {Object[]} attributes
     */
    function(attributes) {
    this.attributes = attributes;
  };


  this.setMethods =
    /**
     * @param {Object[]} methods
     */
    function(methods) {
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

Class.prototype.draw =
  /**
   * Zeichnen der Standartklasse
   * @param {Object} canvas
   */
  function(canvas) {
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
  /**
   * TODO - Folgende Zeilenkommentare nochmal auf dessen Sinn prüfen - bisher nur übersetzt
   */
  /* Initiiert die Schriftgröße */
  if (numAttributes > 0 && numMethods > 0) {
    var totalSpace = 6 + (numAttributes - 1) + (numMethods - 1);
  } else if (numAttributes > 0 && numMethods === 0) {
    var totalSpace = 4 + (numAttributes - 1);
  } else if (numAttributes === 0 && numMethods > 0) {
    var totalSpace = 4 + (numMethods - 1);
  } else {
    var totalSpace = 2;
  }

  /* Einstellung für die Schrift */
  var fontSize = Math.floor((this.height - (totalSpace * minSpacing)) / numElements);
  var fontTitle = 'bold ' + fontSize + 'px ' + this.fontFamily;
  var fontText = fontSize + 'px ' + this.fontFamily;

  var biggestWidth = 0;
  var biggestText = '';

  /* Finden der größten Breite und dessen Text */
  for (var a = 0; a < 2; a++) {

    /* Prüft die Breite des Titels */
    if (a === 0) {
      context.font = fontTitle;

      var width = context.measureText(this.name).width;
      if (width > biggestWidth) {
        biggestWidth = width;
        biggestText = this.text;
      }
    }

    /* Prüft die Breite von jedem Element der Attribute */
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

    /* Prüft die Breite jedes Funktionselementes */
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

   /* Verkleinert die Schriftgröße bis sie in die gegebene Elementgröße passt */
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

  /* Einstellungen für die text-orientation */
  var centerX = this.x + (this.width / 2);
  var centerY = this.y + ((this.height / 2) + (fontSize / 2));
  var leftSpacing = this.x + (this.width * 0.05);
  var yNextGap = minSpacing + (fontSize / 2);

  if (numAttributes > 0 && numMethods > 0) {
    var yPos = this.y + yNextGap;

    /* Füllt den Titel */
    context.font = fontTitle;
    context.textAlign = 'center';
    context.fillText(this.name, centerX, yPos, this.width);
    yPos += yNextGap;

    /* Zeichnet die Erste Zeile */
    context.moveTo(this.x, yPos);
    context.lineTo(this.x + this.width, yPos);
    yPos += yNextGap;

    /* Füllt die Attribute */
    context.font = fontText;
    context.textAlign = 'left';
    for (var a = 0; a < numAttributes; a++) {
      context.fillText(this.attributes[a], leftSpacing, yPos, this.width * 0.95);
      yPos += yNextGap;
    }

    /* Zeichnet die zweite Linie */
    context.moveTo(this.x, yPos);
    context.lineTo(this.x + this.width, yPos);
    yPos += yNextGap;

    /* Füllt die Funktionen */
    context.font = fontText;
    context.textAlign = 'left';
    for (var a = 0; a < numMethods; a++) {
      context.fillText(this.methods[a], leftSpacing, yPos, this.width * 0.95);
    yPos += yNextGap;
    }
  } else if (numAttributes > 0 && numMethods === 0) {
    var yPos = this.y + yNextGap;

    /* Füllt den Titel */
    context.font = fontTitle;
    context.textAlign = 'center';
    context.fillText(this.name, centerX, yPos, this.width);
    yPos += yNextGap;

    /* Zeichnet die erste Zeile */
    context.moveTo(this.x, yPos);
    context.lineTo(this.x + this.width, yPos);
    yPos += yNextGap;

    /* Füllt die Attribute */
    context.font = fontText;
    context.textAlign = 'left';
    for (var a = 0; a < numAttributes; a++) {
      context.fillText(this.attributes[a], leftSpacing, yPos, this.width * 0.95);
      yPos += yNextGap;
    }
  } else if (numAttributes === 0 && numFunctions > 0) {
    var yPos = this.y + yNextGap;

    /* Füllt den Titel */
    context.font = fontTitle;
    context.textAlign = 'center';
    context.fillText(this.name, centerX, yPos, this.width);
    yPos += yNextGap;

    /* Zeichnet die erste Zeile */
    context.moveTo(this.x, yPos);
    context.lineTo(this.x + this.width, yPos);
    yPos += yNextGap;

    /* Füllt die Funktionen */
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

Class.prototype.toJSON =
  /**
   * Wandeln der Standartklasse in ein JSON Objekt
   */
  function() {
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

Class.prototype.applyJSON =
  /**
   * Speichern des JSON Objektes der Standartklasse
   * @param {Object} json
   */
  function(json) {
  this.x = json.x;
  this.y = json.y;
  this.height = json.height;
  this.width = json.width;
  this.name = json.name;
  this._id = json._id;
  this.methods = json.methods;
  this.attributes = json.attributes;
};

Class.prototype.startEditmode =
  /**
   * Editieren der Standartklasse aktivieren
   * @param {Object} modal
   * @param {Object} callback
   */
  function(modal, callback) {
  var self = this;

  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      settings:
        /**
         * Anzeige der eingetragenen Eigenschaften der Standartklasse
         */
        function() {
        return {
          name: self.getName(),
          attributes: self.getAttributes().join("\n"),
          methods: self.getMethods().join("\n")
        };
      }
    }
  });

  modalInstance.result.then(
    /**
     * Aktualisieren der eingetragenen Daten
     * @param {Object} result
     */
    function(result) {
    self.setName(result.name);
    self.setAttributes(result.attributes.split("\n"));
    self.setMethods(result.methods.split("\n"));
    callback();
  });
};
/**
 * Definieren eines Interface-Elementes
 * @param {Number[]} $elementId
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {String} name
 * @param {Number} lineWidth
 * @param {String} borderColor
 * @param {String} fontFamily
 * @param {Number} fontSize
 * @param {Object[]} methods
 */
function Interface(elementId, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize, methods) {
  Shape.call(this, elementId, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize);

  this.methods = methods instanceof Array ? methods : ['Methoden'];

  this.setMethods =
    /**
     * @param {Object[]} methods
     */
    function(methods) {
    this.methods = methods;
  };

  this.getMethods = function() {
    return this.methods;
  };
}
Interface.prototype = new Shape();

Interface.prototype.draw =
  /**
   * Zeichnen des Interface-Elementes
   * @param {Object} canvas
   */
  function(canvas) {
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
  /**
   * TODO - Folgende Zeilenkommentare nochmal auf dessen Sinn prüfen - bisher nur übersetzt
   */
  /* Initiiert die Schriftgröße  */
  if (numMethods > 0) {
    var totalSpace = 5 + (numMethods - 1);
  } else {
    var totalSpace = 2;
  }

  /* Einstellungen für die Schrift */
  var fontSize = Math.floor((this.height - (totalSpace * minSpacing)) / numElements);
  var fontTitle = 'bold italic ' + fontSize + 'px ' + this.fontFamily;
  var fontText = fontSize + 'px ' + this.fontFamily;

  /* Einstellungen, um die größte breite und dessen Text zu finden */
  var biggestWidth = 0;
  var biggestText = '';

  /* Finden der größten breite und dessen Text */
  for (var a = 0; a < 2; a++) {

  /* Prüft die Breite des Interface Titels */
  if (a === 0) {
    context.font = fontText;

    var width = context.measureText(firstTitle).width;
    if (width > biggestWidth) {
      biggestWidth = width;
      biggestText = this.text;
    }
  }

    /* Prüft die Breite des Titels */
    if (a === 1) {
      context.font = fontTitle;

      var width = context.measureText(this.name).width;
      if (width > biggestWidth) {
        biggestWidth = width;
        biggestText = this.text;
      }
    }

    /* Prüft die Breite von jedem Funktionselement */
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

  /* Verkleinert die Schrift, bis sie in die gegebene Breite Passt */
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

  /* Einstellungen für die text-orientation */
  var centerX = this.x + (this.width / 2);
  var centerY = this.y + ((this.height / 2) + (fontSize / 2));
  var leftSpacing = this.x + (this.width * 0.05);
  var yNextGap = minSpacing + (fontSize / 2);

  if (numMethods > 0) {
    var yPos = this.y + yNextGap;

    /* Füllt den ersten Titel */
    context.font = fontText;
    context.textAlign = 'center';
    context.fillText(firstTitle, centerX, yPos, this.width);
    yPos += yNextGap;

    /* Füllt den Titel */
    context.font = fontTitle;
    context.textAlign = 'center';
    context.fillText(this.name, centerX, yPos, this.width);
    yPos += yNextGap;

    /* Zeichnet die erste Zeile */
    context.moveTo(this.x, yPos);
    context.lineTo(this.x + this.width, yPos);
    yPos += yNextGap;

    /* Füllt die Funktionen */
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

Interface.prototype.toJSON =
  /**
   * Wandeln des Interface-Elementes in ein JSON Objekt
   */
  function() {
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

Interface.prototype.applyJSON =
  /**
   * Speichern des JSON Objektes des Interface-Elementes
   * @param {Object} json
   */
  function(json) {
  this.x = json.x;
  this.y = json.y;
  this.height = json.height;
  this.width = json.width;
  this.name = json.name;
  this._id = json._id;
  this.methods = json.methods;
};

Interface.prototype.startEditmode =
  /**
   * Editieren des Interface-Elementes aktivieren
   * @param {Object} modal
   * @param {Object} callback
   */
  function(modal, callback) {
  var self = this;

  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      settings:
        /**
         * Eigenschaften ändern des Interface-Elementes werden ausgelesen
         */
        function() {
        return {
          name: self.getName(),
          attributes: null,
          methods: self.getMethods().join("\n")
        };
      }
    }
  });

  modalInstance.result.then(
    /**
     * Eigenschaften des Interface-Elementes werden gesetzt
     * @param {Object} result
     */
    function(result) {
    self.setName(result.name);
    self.setMethods(result.methods.split("\n"));
    callback();
  });
};