/**
 *  Logik zum Definieren, Zeichnen, Wandeln, Speichern und Editieren der UML-Elemente.
 */

/**
 * Definition des Prototypes der UML-Elemente (von diesem Erben andere UML-Elemente)
 * @param {number} elementId              Die ID des Elements
 * @param {number} x                      Die x-Koordinate des Elements
 * @param {number} y                      Die y-Koordinate des Elements
 * @param {number} width                  Die Breite des Elements
 * @param {number} height                 Die Höhe des Elements
 * @param {string} name                   Der Name des Elements
 * @param {number} [lineWidth=1]          Die Breite der Linien
 * @param {string} [borderColor='black']  Die Farbe der Linien
 * @param {string} [fontFamily='Arial']   Die Schriftart
 * @param {number} [fontSize=16]          Die Schriftgröße
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

  /**
   * Setzt die x-Koordinate des Elements.
   * @param {number} x  Die x-Koordinate des Elements
   */
  this.setX = function(x) {
    this.x = x;
  };

  /**
   * Setzt die y-Koordinate des Elements.
   * @param {number} y  Die y-Koordinate des Elements
   */
  this.setY = function(y) {
    this.y = y;
  };

  /**
   * Setzt die Breite des Elements.
   * @param {number} width  Die Breite des Elements
   */
  this.setWidth = function(width) {
    this.width = width;
  };

  /**
   * Setzt die Höhe des Elements.
   * @param {number} height  Die Höhe des Elements
   */
  this.setHeight = function(height) {
    this.height = height;
  };

  /**
   * Setzt die Linienfarbe des Elements
   * @param {string} borderColor  Die Linienfarbe
   */
  this.setBorderColor = function(borderColor) {
    this.borderColor = borderColor;
  };

  /**
   * Setzt die Linienbreite des Elements
   * @param {number} lineWidth  Die Linienbreite
   */
  this.setLineWidth = function(lineWidth) {
    this.lineWidth = lineWidth;
  };

  /**
   * Setzt den Namen des Elements
   * @param {string} name  Der Name des Elements
   */
  this.setName = function(name) {
    this.name = name;
  };

  /**
   * Setzt die Schriftart für den Namenstext
   * @param {string} fontFamily  Die Schriftart
   */
  this.setFontFamily = function(fontFamily) {
    this.fontFamily = fontFamily;
  };

  /**
   * Setzt die Schriftgröße des Namenstextes
   * @param {number} fontSize  Die Schriftgröße
   */
  this.setFontSize = function(fontSize) {
    this.fontSize = fontSize;
  };

  /**
   * Gibt die x-Koordinate des Elements zurück.
   * @returns {number} Die x-Koordinate des Elements
   */
  this.getX = function() {
    return this.x;
  };

  /**
   * Gibt die y-Koordinate des Elements zurück.
   * @returns {number} Die y-Koordinate des Elements
   */
  this.getY = function() {
    return this.y;
  };

  /**
   * Gibt die Breite des Elements zurück.
   * @returns {number} Die Breite des Elements
   */
  this.getWidth = function() {
    return this.width;
  };

  /**
   * Gibt die Höhe des Elements zurück.
   * @returns {number} Die Höhe des Elements
   */
  this.getHeight = function() {
    return this.height;
  };

  /**
   * Gibt die Linienfarbe des Elements zurück.
   * @returns {string} Die Linienfarbe des Elements
   */
  this.getBorderColor = function() {
    return this.borderColor;
  };

  /**
   * Gibt die Linienbreite des Elements zurück.
   * @returns {number} Die Linienbreite des Elements
   */
  this.getLineWidth = function() {
    return this.lineWidth;
  };

  /**
   * Gibt den Namen des Elements zurück.
   * @returns {string} Der Name des Elements
   */
  this.getName = function() {
    return this.name;
  };

  /**
   * Gibt die Schriftart für den Namenstext zurück
   * @returns {string} Die Schriftart für den Namenstext
   */
  this.getFontFamily = function() {
    return this.fontFamily;
  };

  /**
   * Gibt die Schriftgröße für den Namenstext zurück
   * @returns {number} Die Schrifgröße für den Namenstext
   */
  this.getFontSize = function() {
    return this.fontSize;
  };
}

/**
 * Methode zum Zeichnen des Elements auf der Canvasfläche.
 * @param {Object} canvas Die Canvasfläche auf der das Element gezeichnet werden soll
 */
Shape.prototype.draw = function(canvas) {
  throw new Error('This method should not be directly called!');
};

/**
 * Methode zum Erstellen eines JSON-Objekts aus dem Objekt des Elements.
 * @returns {Object} Das Objekt mit den Eigenschaften
 */
Shape.prototype.toJSON = function() {
  throw new Error('This method should not be directly called!');
};

/**
 * Methode zum Setzen der Objekteigenschaften aus einem JSON-Objekts.
 * @param {Object} json Der JSON-Objekt mit den Objekteigenschaften
 */
Shape.prototype.applyJSON = function(json) {
  throw new Error('This method should not be directly called!');
};

/**
 * Methode zum Erstellen eines Bearbeitungsfensters zum Bearbeiten der Objekteigenschaften.
 * @param {Object} modal Der Serviceobjekt für das Erstellen des modalen Fensters
 * @param {Function} callback Die Funktion die nach dem Editieren ausgeführt werden soll
 */
Shape.prototype.startEditmode = function(modal, callback) {
  throw new Error('This method should not be directly called!');
};


/**
 * Definition eines einfachen Klassenelementes
 * @param {number} elementId              Die ID des Elements
 * @param {number} x                      Die x-Koordinate des Elements
 * @param {number} y                      Die y-Koordinate des Elements
 * @param {number} width                  Die Breite des Elements
 * @param {number} height                 Die Höhe des Elements
 * @param {string} name                   Der Name des Elements
 * @param {number} [lineWidth=1]          Die Breite der Linien
 * @param {string} [borderColor='black']  Die Farbe der Linien
 * @param {string} [fontFamily='Arial']   Die Schriftart
 * @param {number} [fontSize=16]          Die Schriftgröße
 */
function EmptyClass(elementId, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize) {
  Shape.call(this, elementId, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize);
}

EmptyClass.prototype = new Shape();

/**
 * Methode zum Zeichnen des einfachen Klassenelements auf der Canvasfläche.
 * @param {Object} canvas Die Canvasfläche auf der das Element gezeichnet werden soll
 */
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

/**
 * Methode zum Erstellen eines JSON-Objekts aus dem Objekt des Klassenelements.
 * @returns {Object} Das Objekt mit den Eigenschaften
 */
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

/**
 * Methode zum Setzen der Objekteigenschaften aus einem JSON-Objekts.
 * @param {Object} json Der JSON-Objekt mit den Objekteigenschaften
 */
EmptyClass.prototype.applyJSON = function(json) {
  this.x = json.x;
  this.y = json.y;
  this.height = json.height;
  this.width = json.width;
  this.name = json.name;
  this._id = json._id;
};

/**
 * Methode zum Erstellen eines Bearbeitungsfensters zum Bearbeiten der Objekteigenschaften.
 * @param {Object} modal Der Serviceobjekt für das Erstellen des modalen Fensters
 * @param {Function} callback Die Funktion die nach dem Editieren ausgeführt werden soll
 */
EmptyClass.prototype.startEditmode = function(modal, callback) {
  var self = this;

  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      /**
       * Gibt die Eigenschaften als Objekt zurück.
       * @returns {Objekt} Das Objekt mit den Eigenschaften.
       */
      settings: function() {
        return {
          name: self.getName()
        };
      }
    }
  });

  /**
   * Setzt die geänderten Eigenschaften dem einfachen Klassenelements.
   * @param {Objekt} result Das Objekt mit den Editierten Eigenschaften
   */
  modalInstance.result.then(function(result) {
    self.setName(result.name);
    callback();
  });
};


/**
 * Definition einer abstrakten Klasse
 * @param {number} elementId              Die ID des Elements
 * @param {number} x                      Die x-Koordinate des Elements
 * @param {number} y                      Die y-Koordinate des Elements
 * @param {number} width                  Die Breite des Elements
 * @param {number} height                 Die Höhe des Elements
 * @param {string} name                   Der Name des Elements
 * @param {number} [lineWidth=1]          Die Breite der Linien
 * @param {string} [borderColor='black']  Die Farbe der Linien
 * @param {string} [fontFamily='Arial']   Die Schriftart
 * @param {number} [fontSize=16]          Die Schriftgröße
 * @param {string[]} attributes           Die Attribute der abstrakten Klasse
 * @param {string[]} methods              Die Methoden der abstrakten Klasse
 */
function AbstractClass(elementId, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize, attributes, methods) {
  Shape.call(this, elementId, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize);

  this.attributes = attributes instanceof Array ? attributes : ['Attribute'];
  this.methods = methods instanceof Array ? methods : ['Methoden'];

  /**
   * Setzt die Attribute der abstrakten Klasse
   * @param {string[]} attributes  Die Attribute der abstrakten Klasse
   */
  this.setAttributes = function(attributes) {
    this.attributes = attributes;
  };

  /**
   * Setzt die Methoden der abstrakten Klasse
   * @param {string[]} methods  Die Methoden der abstrakten Klasse
   */
  this.setMethods = function(methods) {
    this.methods = methods;
  };

  /**
   * Gibt die Attribute der abstrakten Klasse zurück
   * @returns {string[]}  Die Attribute der abstrakten Klasse
   */
  this.getAttributes = function() {
    return this.attributes;
  };

  /**
   * Gibt die Methoden der abstrakten Klasse zurück
   * @returns {string[]}  Die Methoden der abstrakten Klasse
   */
  this.getMethods = function() {
    return this.methods;
  };
}

AbstractClass.prototype = new Shape();

/**
 * Methode zum Zeichnen des abstrakten Klassenelements auf der Canvasfläche.
 * @param {Object} canvas Die Canvasfläche auf der das Element gezeichnet werden soll
 */
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

/**
 * Methode zum Erstellen eines JSON-Objekts aus dem Objekt des abstrakten Klassenelements.
 * @returns {Object} Das Objekt mit den Eigenschaften
 */
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

/**
 * Methode zum Setzen der Objekteigenschaften aus einem JSON-Objekts.
 * @param {Object} json Der JSON-Objekt mit den Objekteigenschaften
 */
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

/**
 * Methode zum Erstellen eines Bearbeitungsfensters zum Bearbeiten der Objekteigenschaften.
 * @param {Object} modal Der Serviceobjekt für das Erstellen des modalen Fensters
 * @param {Function} callback Die Funktion die nach dem Editieren ausgeführt werden soll
 */
AbstractClass.prototype.startEditmode = function(modal, callback) {
  var self = this;

  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      /**
       * Gibt die Eigenschaften als Objekt zurück.
       * @returns {Objekt} Das Objekt mit den Eigenschaften.
       */
      settings: function() {
        return {
          name: self.getName(),
          attributes: self.getAttributes().join("\n"),
          methods: self.getMethods().join("\n")
        };
      }
    }
  });

  /**
   * Setzt die geänderten Eigenschaften dem abstrakten Klassenelements.
   * @param {Objekt} result Das Objekt mit den Editierten Eigenschaften
   */
  modalInstance.result.then(function(result) {
    self.setName(result.name);
    self.setAttributes(result.attributes.split("\n"));
    self.setMethods(result.methods.split("\n"));
    callback();
  });
};


/**
 * Definition des Kommentars
 * @param {number} elementId              Die ID des Elements
 * @param {number} x                      Die x-Koordinate des Elements
 * @param {number} y                      Die y-Koordinate des Elements
 * @param {number} width                  Die Breite des Elements
 * @param {number} height                 Die Höhe des Elements
 * @param {string} name                   Der Name des Elements
 * @param {number} [lineWidth=1]          Die Breite der Linien
 * @param {string} [borderColor='black']  Die Farbe der Linien
 * @param {string} [fontFamily='Arial']   Die Schriftart
 * @param {number} [fontSize=16]          Die Schriftgröße
 */
function Comment(elementId, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize) {
  Shape.call(this, elementId, x, y, width, height, borderColor, lineWidth, name, fontFamily, fontSize);
}

Comment.prototype = new Shape();

/**
 * Methode zum Zeichnen des Kommentars auf der Canvasfläche.
 * @param {Object} canvas Die Canvasfläche auf der das Element gezeichnet werden soll
 */
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

/**
 * Methode zum Erstellen eines JSON-Objekts aus dem Objekt des Kommentars.
 * @returns {Object} Das Objekt mit den Eigenschaften
 */
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

/**
 * Methode zum Setzen der Objekteigenschaften aus einem JSON-Objekts.
 * @param {Object} json Der JSON-Objekt mit den Objekteigenschaften
 */
Comment.prototype.applyJSON = function(json) {
  this.x = json.x;
  this.y = json.y;
  this.height = json.height;
  this.width = json.width;
  this.name = json.name;
  this._id = json._id;
};

/**
 * Methode zum Erstellen eines Bearbeitungsfensters zum Bearbeiten der Objekteigenschaften.
 * @param {Object} modal Der Serviceobjekt für das Erstellen des modalen Fensters
 * @param {Function} callback Die Funktion die nach dem Editieren ausgeführt werden soll
 */
Comment.prototype.startEditmode = function(modal, callback) {
  var self = this;

  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      /**
       * Gibt die Eigenschaften als Objekt zurück.
       * @returns {Objekt} Das Objekt mit den Eigenschaften.
       */
      settings: function() {
        return {
          name: self.getName()
        };
      }
    }
  });

  /**
   * Setzt die geänderten Eigenschaften dem Kommentar.
   * @param {Objekt} result Das Objekt mit den Editierten Eigenschaften
   */
  modalInstance.result.then(function(result) {
    self.setName(result.name);
    callback();
  });
};


/**
 * Definition einer aktiven Klasse
 * @param {number} elementId              Die ID des Elements
 * @param {number} x                      Die x-Koordinate des Elements
 * @param {number} y                      Die y-Koordinate des Elements
 * @param {number} width                  Die Breite des Elements
 * @param {number} height                 Die Höhe des Elements
 * @param {string} name                   Der Name des Elements
 * @param {number} [lineWidth=1]          Die Breite der Linien
 * @param {string} [borderColor='black']  Die Farbe der Linien
 * @param {string} [fontFamily='Arial']   Die Schriftart
 * @param {number} [fontSize=16]          Die Schriftgröße
 */
function ActiveClass(elementId, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize) {
  Shape.call(this, elementId, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize);
}

ActiveClass.prototype = new Shape();

/**
 * Methode zum Zeichnen der aktiven Klasse auf der Canvasfläche.
 * @param {Object} canvas Die Canvasfläche auf der das Element gezeichnet werden soll
 */
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

/**
 * Methode zum Erstellen eines JSON-Objekts aus dem Objekt der aktiven Klasse.
 * @returns {Object} Das Objekt mit den Eigenschaften
 */
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

/**
 * Methode zum Setzen der Objekteigenschaften aus einem JSON-Objekts.
 * @param {Object} json Der JSON-Objekt mit den Objekteigenschaften
 */
ActiveClass.prototype.applyJSON = function(json) {
  this.x = json.x;
  this.y = json.y;
  this.height = json.height;
  this.width = json.width;
  this.name = json.name;
  this._id = json._id;
};

/**
 * Methode zum Erstellen eines Bearbeitungsfensters zum Bearbeiten der Objekteigenschaften.
 * @param {Object} modal Der Serviceobjekt für das Erstellen des modalen Fensters
 * @param {Function} callback Die Funktion die nach dem Editieren ausgeführt werden soll
 */
ActiveClass.prototype.startEditmode = function(modal, callback) {
  var self = this;

  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      /**
       * Gibt die Eigenschaften als Objekt zurück.
       * @returns {Objekt} Das Objekt mit den Eigenschaften.
       */
      settings: function() {
        return {
          name: self.getName()
        };
      }
    }
  });

  /**
   * Setzt die geänderten Eigenschaften der aktiven Klasse.
   * @param {Objekt} result Das Objekt mit den Editierten Eigenschaften
   */
  modalInstance.result.then(function(result) {
    self.setName(result.name);
    callback();
  });
};


/**
 * Definition einer Standartklasse (mit Attribut & Methode)
 * @param {number} elementId              Die ID des Elements
 * @param {number} x                      Die x-Koordinate des Elements
 * @param {number} y                      Die y-Koordinate des Elements
 * @param {number} width                  Die Breite des Elements
 * @param {number} height                 Die Höhe des Elements
 * @param {string} name                   Der Name des Elements
 * @param {number} [lineWidth=1]          Die Breite der Linien
 * @param {string} [borderColor='black']  Die Farbe der Linien
 * @param {string} [fontFamily='Arial']   Die Schriftart
 * @param {number} [fontSize=16]          Die Schriftgröße
 * @param {string[]} attributes           Die Attribute der Klasse
 * @param {string[]} methods              Die Methoden der Klasse
 */
function Class(elementId, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize, attributes, methods) {
  Shape.call(this, elementId, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize);

  this.attributes = attributes instanceof Array ? attributes : ['Attribute'];
  this.methods = methods instanceof Array ? methods : ['Methoden'];

  /**
   * Setzt die Attribute der Klasse
   * @param {string[]} attributes  Die Attribute der Klasse
   */
  this.setAttributes = function(attributes) {
    this.attributes = attributes;
  };

  /**
   * Setzt die Methoden der Klasse
   * @param {string[]} methods  Die Methoden der Klasse
   */
  this.setMethods = function(methods) {
    this.methods = methods;
  };

  /**
   * Gibt die Attribute der Klasse zurück
   * @returns {string[]}  Die Attribute der Klasse
   */
  this.getAttributes = function() {
    return this.attributes;
  };

  /**
   * Gibt die Methoden der Klasse zurück
   * @returns {string[]}  Die Methoden der Klasse
   */
  this.getMethods = function() {
    return this.methods;
  };
}

Class.prototype = new Shape();

/**
 * Methode zum Zeichnen des Klassenelements auf der Canvasfläche.
 * @param {Object} canvas Die Canvasfläche auf der das Element gezeichnet werden soll
 */
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

/**
 * Methode zum Erstellen eines JSON-Objekts aus dem Objekt des Klassenelements.
 * @returns {Object} Das Objekt mit den Eigenschaften
 */
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

/**
 * Methode zum Setzen der Objekteigenschaften aus einem JSON-Objekts.
 * @param {Object} json Der JSON-Objekt mit den Objekteigenschaften
 */
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

/**
 * Methode zum Erstellen eines Bearbeitungsfensters zum Bearbeiten der Objekteigenschaften.
 * @param {Object} modal Der Serviceobjekt für das Erstellen des modalen Fensters
 * @param {Function} callback Die Funktion die nach dem Editieren ausgeführt werden soll
 */
Class.prototype.startEditmode = function(modal, callback) {
  var self = this;

  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      /**
       * Gibt die Eigenschaften als Objekt zurück.
       * @returns {Objekt} Das Objekt mit den Eigenschaften.
       */
      settings: function() {
        return {
          name: self.getName(),
          attributes: self.getAttributes().join("\n"),
          methods: self.getMethods().join("\n")
        };
      }
    }
  });

  /**
   * Setzt die geänderten Eigenschaften dem Klassenelements.
   * @param {Objekt} result Das Objekt mit den Editierten Eigenschaften
   */
  modalInstance.result.then(function(result) {
    self.setName(result.name);
    self.setAttributes(result.attributes.split("\n"));
    self.setMethods(result.methods.split("\n"));
    callback();
  });
};


/**
 * Definieren eines Interface-Elementes
 * @param {number} elementId              Die ID des Elements
 * @param {number} x                      Die x-Koordinate des Elements
 * @param {number} y                      Die y-Koordinate des Elements
 * @param {number} width                  Die Breite des Elements
 * @param {number} height                 Die Höhe des Elements
 * @param {string} name                   Der Name des Elements
 * @param {number} [lineWidth=1]          Die Breite der Linien
 * @param {string} [borderColor='black']  Die Farbe der Linien
 * @param {string} [fontFamily='Arial']   Die Schriftart
 * @param {number} [fontSize=16]          Die Schriftgröße
 * @param {string[]} methods              Die Methoden der Klasse
 */
function Interface(elementId, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize, methods) {
  Shape.call(this, elementId, x, y, width, height, name, lineWidth, borderColor, fontFamily, fontSize);

  this.methods = methods instanceof Array ? methods : ['Methoden'];

  /**
   * Setzt die Methoden der Schnittstelle
   * @param {string[]} attributes  Die Methoden der Schnittstelle
   */
  this.setMethods = function(methods) {
    this.methods = methods;
  };

  /**
   * Gibt die Methoden der Schnittstelle zurück
   * @returns {string[]}  Die Methoden der Schnittstelle
   */
  this.getMethods = function() {
    return this.methods;
  };
}

Interface.prototype = new Shape();

/**
 * Methode zum Zeichnen des Schnittstellenelements auf der Canvasfläche.
 * @param {Object} canvas Die Canvasfläche auf der das Element gezeichnet werden soll
 */
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

/**
 * Methode zum Erstellen eines JSON-Objekts aus dem Objekt des Schnittstellenelements.
 * @returns {Object} Das Objekt mit den Eigenschaften
 */
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

/**
 * Methode zum Setzen der Objekteigenschaften aus einem JSON-Objekts.
 * @param {Object} json Der JSON-Objekt mit den Objekteigenschaften
 */
Interface.prototype.applyJSON = function(json) {
  this.x = json.x;
  this.y = json.y;
  this.height = json.height;
  this.width = json.width;
  this.name = json.name;
  this._id = json._id;
  this.methods = json.methods;
};

/**
 * Methode zum Erstellen eines Bearbeitungsfensters zum Bearbeiten der Objekteigenschaften.
 * @param {Object} modal Der Serviceobjekt für das Erstellen des modalen Fensters
 * @param {Function} callback Die Funktion die nach dem Editieren ausgeführt werden soll
 */
Interface.prototype.startEditmode = function(modal, callback) {
  var self = this;

  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      /**
       * Gibt die Eigenschaften als Objekt zurück.
       * @returns {Objekt} Das Objekt mit den Eigenschaften.
       */
      settings: function() {
        return {
          name: self.getName(),
          attributes: null,
          methods: self.getMethods().join("\n")
        };
      }
    }
  });

  /**
   * Setzt die geänderten Eigenschaften dem Schnittstellenelements.
   * @param {Objekt} result Das Objekt mit den Editierten Eigenschaften
   */
  modalInstance.result.then(function(result) {
    self.setName(result.name);
    self.setMethods(result.methods.split("\n"));
    callback();
  });
};