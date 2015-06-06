/**
 * Logik zum Definieren, Zeichnen, Wandeln, Speichern und Editieren der verscheidenen Beziehungen.
 */

/**
 * Definition des Verbindungsprototyps, von welchem die Verbindungselemente erben.
 * @param {number} elementId            Die ID des Elements
 * @param {number[]} coordsA            Die Koordinaten des Anfangpunktes
 * @param {number[]} coordsB            Die Koordinaten des Endpunktes
 * @param {string} name                 Der Name der Verbindung
 * @param {number} [lineWidth=1]        Die Breite der Linie
 * @param {string} [lineColor='black']  Die Farbe der Linie
 * @param {string} [fontFamily='Arial'] Die Schriftart
 * @param {number} [fontSize=12]        Die Schriftgröße
 */
function Relation(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize) {
  this._id = elementId;
  this.shapeA = null;
  this.shapeB = null;
  this.coordsA = coordsA;
  this.coordsB = coordsB;
  this.name = name;
  this.lineWidth = (typeof lineWidth === 'number') ? lineWidth : 1;
  this.lineColor = (typeof lineColor === 'string') ? lineColor : 'black';
  this.fontFamily = (typeof fontFamily === 'string') ? fontFamily : 'Arial';
  this.fontSize = (typeof fontSize === 'number') ? fontSize : 12;

  /**
   * Setzt die ID des Elementes von welchem die Verbindung ausgeht.
   * @param {number} shapeA  Die ID des Startelementes
   */
  this.setShapeA = function(shapeA) {
    this.shapeA = shapeA;
  };

  /**
   * Setzt die ID des Elementes an welchem die Verbindung endet.
   * @param {number} shapeB  Die ID des Endelementes
   */
  this.setShapeB = function(shapeB) {
    this.shapeB = shapeB;
  };

  /**
   * Setzt die Koordinaten des Startpunktes.
   * @param {number[]} coordsA  Die Koordinaten des Startpunktes
   */
  this.setCoordsA = function(coordsA) {
    this.coordsA = coordsA;
  };

  /**
   * Setzt die Koordinaten des Endpunktes.
   * @param {number[]} coordsB  Die Koordinaten des Endpunktes
   */
  this.setCoordsB = function(coordsB) {
    this.coordsB = coordsB;
  };

  /**
   * Setzt den Namen der Verbindung.
   * @param {string} name  Der Name der Verbindung
   */
  this.setName = function(name) {
    this.name = name;
  };

  /**
   * Setzt die Farbe der Verbindung.
   * @param {string} lineColor  Die Frabe der Verbindung
   */
  this.setLineColor = function(lineColor) {
    this.lineColor = lineColor;
  };

  /**
   * Setzt die Breite der Verbindungslinie.
   * @param {number} lineWidth  Die Breite der Verbindungslinie
   */
  this.setLineWidth = function(lineWidth) {
    this.lineWidth = lineWidth;
  };
  
  /**
   * Setzt die Schriftart des Verbindungstextes.
   * @param {string} fontFamily  Die Schriftart des Verbindungstextes
   */
  this.setFontFamily = function(fontFamily) {
    this.fontFamily = fontFamily;
  };

  /**
   * Setzt die Schriftgröße des Verbindungstextes.
   * @param {number} fontSize  Die Schriftgröße des Verbindungstextes
   */
  this.setFontSize = function(fontSize) {
    this.fontSize = fontSize;
  };

  /**
   * Gibt die des Startelementes zurück.
   * @returns {number} Die ID des Startelementes
   */
  this.getShapeA = function() {
    return this.shapeA;
  };

  /**
   * Gibt die des Endelementes zurück.
   * @returns {number} Die ID des Endelementes
   */
  this.getShapeB = function() {
    return this.shapeB;
  };

  /**
   * Gibt die Koordinaten des Startpunktes zurück.
   * @returns {number[]} Die Koordinaten des Startpunktes
   */
  this.getCoordsA = function() {
    return this.coordsA;
  };

  /**
   * Gibt die Koordinaten des Endpunktes zurück.
   * @returns {number[]} Die Koordinaten des Endpunktes
   */
  this.getCoordsB = function() {
    return this.coordsB;
  };

  /**
   * Gibt den Namen der Verbindung zurück.
   * @returns {string} Der Name der Verbindung
   */
  this.getName = function() {
    return this.name;
  };

  /**
   * Gibt die Linienfarbe der Verbindung zurück.
   * @returns {string} Die Farbe der Verbindungslinie
   */
  this.getLineColor = function() {
    return this.lineColor;
  };

  /**
   * Gibt die Breite der Verbindungslinie zurück.
   * @returns {number} Die Breite der Verbindungslinie
   */
  this.getLineWidth = function() {
    return this.lineWidth;
  };

  /**
   * Gibt die Schriftart des Verbindungstextes zurück.
   * @returns {strinng} Die Schriftart des Verbindungstextes
   */
  this.getFontFamily = function() {
    return this.fontFamily;
  };

  /**
   * Gibt die Schriftart des Verbindungstextes zurück.
   * @returns {number} Die Schriftgröße des Verbindungstextes
   */
  this.getFontSize = function() {
    return this.fontSize;
  };
}

/**
 * Methode zum Zeichnen der Verbindung auf der Canvasfläche.
 * @param {Object} canvas Die Canvasfläche auf der das Element gezeichnet werden soll
 */
Relation.prototype.draw = function(canvas) {
  throw new Error('This method should not be directly called!');
};

/**
 * Methode zum Erstellen eines JSON-Objekts aus dem Objekt der Verbindung.
 * @returns {Object} Das Objekt mit den Eigenschaften
 */
Relation.prototype.toJSON = function() {
  throw new Error('This method should not be directly called!');
};

/**
 * Methode zum Setzen der Objekteigenschaften aus einem JSON-Objekts.
 * @param {Object} json Der JSON-Objekt mit den Objekteigenschaften
 */
Relation.prototype.applyJSON = function(json) {
  throw new Error('This method should not be directly called!');
};

/**
 * Methode zum Erstellen eines Bearbeitungsfensters zum Bearbeiten der Objekteigenschaften.
 * @param {Object} modal Der Serviceobjekt für das Erstellen des modalen Fensters
 * @param {Function} callback Die Funktion die nach dem Editieren ausgeführt werden soll
 */
Relation.prototype.startEditmode = function(modal, callback) {
  throw new Error('This method should not be directly called!');
};


/**
 * Definition der Vererbungsbeziehung
 * @param {number} elementId            Die ID des Elements
 * @param {number[]} coordsA            Die Koordinaten des Anfangpunktes
 * @param {number[]} coordsB            Die Koordinaten des Endpunktes
 * @param {string} name                 Der Name der Verbindung
 * @param {number} [lineWidth=1]        Die Breite der Linie
 * @param {string} [lineColor='black']  Die Farbe der Linie
 * @param {string} [fontFamily='Arial'] Die Schriftart
 * @param {number} [fontSize=12]        Die Schriftgröße
 */
function Inheritance(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);
}

/* Über Prototype werden die Eigenschaften vererbt */
Inheritance.prototype = new Relation();

/**
 * Methode zum Zeichnen der Vererbung auf der Canvasfläche.
 * @param {Object} canvas Die Canvasfläche auf der das Element gezeichnet werden soll
 */
Inheritance.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var deltaX = this.coordsB[0] - this.coordsA[0];
  var deltaY = this.coordsB[1] - this.coordsA[1];
  var length = Math.abs(Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2)));
  context.save();
  context.beginPath();
  context.strokeStyle = this.lineColor;
  context.lineWidth = this.lineWidth;
  context.translate(this.coordsA[0], this.coordsA[1]);
  context.rotate(Math.atan2(deltaY, deltaX));
  context.translate(-this.coordsA[0], -this.coordsA[1]);
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-10, this.coordsA[1]);
  context.moveTo(this.coordsA[0]+length-10, this.coordsA[1]+10);
  context.lineTo(this.coordsA[0]+length-10, this.coordsA[1]-10);
  context.lineTo(this.coordsA[0]+length, this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-10, this.coordsA[1]+10);
  context.closePath();
  context.stroke();
  context.font = 'bold ' + this.fontSize + 'px ' + this.fontFamily;
  context.textBaseline = 'middle';
  context.beginPath();
  context.fillStyle = 'white';
  context.fillRect(this.coordsA[0]+(length/2)-(context.measureText(this.name).width/2)-5, this.coordsA[1]-(this.fontSize/2), context.measureText(this.name).width, this.fontSize);
  context.fillStyle = 'black';
  context.fillText(this.name, this.coordsA[0]+(length/2)-(context.measureText(this.name).width/2)-5, this.coordsA[1]);
  context.closePath();
  context.stroke();
  context.restore();
};

/**
 * Methode zum Erstellen eines JSON-Objekts aus dem Objekt der Vererbung.
 * @returns {Object} Das Objekt mit den Eigenschaften
 */
Inheritance.prototype.toJSON = function() {
  return {
    _type: 'Inheritance',
    _id: this._id,
    shapeA: this.getShapeA(),
    shapeB: this.getShapeB(),
    name: this.getName(),
    coordsA: this.getCoordsA(),
    coordsB: this.getCoordsB()
  };
};

/**
 * Methode zum Setzen der Objekteigenschaften aus einem JSON-Objekts.
 * @param {Object} json Der JSON-Objekt mit den Objekteigenschaften
 */
Inheritance.prototype.applyJSON = function(json) {
  this._id = json._id;
  this.shapeA = json.shapeA;
  this.shapeB = json.shapeB;
  this.name = json.name;
  this.coordsA = json.coordsA;
  this.coordsB = json.coordsB;
};

/**
 * Methode zum Erstellen eines Bearbeitungsfensters zum Bearbeiten der Objekteigenschaften.
 * @param {Object} modal Der Serviceobjekt für das Erstellen des modalen Fensters
 * @param {Function} callback Die Funktion die nach dem Editieren ausgeführt werden soll
 */
Inheritance.prototype.startEditmode = function(modal, callback) {
  var self = this;
  /* Bearbeiten des Editierbaren Elementes im Vordergrund */
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
   * Setzt die geänderten Eigenschaften dem Vererbungselements.
   * @param {Objekt} result Das Objekt mit den Editierten Eigenschaften
   */
  modalInstance.result.then(function(result) {
    self.setName(result.name);
    callback();
  });
};


/**
 * Definition der Assoziation ( einfache Linie )
 * @param {number} elementId            Die ID des Elements
 * @param {number[]} coordsA            Die Koordinaten des Anfangpunktes
 * @param {number[]} coordsB            Die Koordinaten des Endpunktes
 * @param {string} name                 Der Name der Verbindung
 * @param {number} [lineWidth=1]        Die Breite der Linie
 * @param {string} [lineColor='black']  Die Farbe der Linie
 * @param {string} [fontFamily='Arial'] Die Schriftart
 * @param {number} [fontSize=12]        Die Schriftgröße
 * @param {string} [multiplicityA='']   Die Kardanalität des Startpunktes
 * @param {string} [multiplicityB='']   Die Kardanalität des Endpunktes
 */
function Association(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize, multiplicityA, multiplicityB) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);

  this.multiplicityA = (typeof multiplicityA === 'string') ? multiplicityA : '';
  this.multiplicityB = (typeof multiplicityB === 'string') ? multiplicityB : '';

  /**
   * Setzt die Kardanalität des Startpunktes
   * @param {string} mulltiplicityA Die Kadanalität des Startpunktes
   */
  this.setMultiplicityA = function(multiplicityA) {
    this.multiplicityA = multiplicityA;
  };

  /**
   * Setzt die Kardanalität des Endpunktes
   * @param {string} mulltiplicityB Die Kadanalität des Endpunktes
   */
  this.setMultiplicityB = function(multiplicityB) {
    this.multiplicityB = multiplicityB;
  };

  /**
   * Gibt die Kardanalität des Startpunktes zurück.
   * @returns {string} Die Kardanalität des Startpunktes
   */
  this.getMultiplicityA = function() {
    return this.multiplicityA;
  };

  /**
   * Gibt die Kardanalität des Endpunktes zurück.
   * @returns {string} Die Kardanalität des Endpunktes
   */
  this.getMultiplicityB = function() {
    return this.multiplicityB;
  };
}

Association.prototype = new Relation();

/**
 * Methode zum Zeichnen der Assoziation auf der Canvasfläche.
 * @param {Object} canvas Die Canvasfläche auf der das Element gezeichnet werden soll
 */
Association.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var deltaX = this.coordsB[0] - this.coordsA[0];
  var deltaY = this.coordsB[1] - this.coordsA[1];
  var length = Math.abs(Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2)));
  context.save();
  context.beginPath();
  context.strokeStyle = this.lineColor;
  context.lineWidth = this.lineWidth;
  context.translate(this.coordsA[0], this.coordsA[1]);
  context.rotate(Math.atan2(deltaY, deltaX));
  context.translate(-this.coordsA[0], -this.coordsA[1]);
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length, this.coordsA[1]);
  context.closePath();
  context.stroke();
  context.font = 'bold ' + this.fontSize + 'px ' + this.fontFamily;
  context.textBaseline = 'middle';
  context.beginPath();
  context.fillStyle = 'white';
  context.fillRect(this.coordsA[0]+(length/2)-(context.measureText(this.name).width/2), this.coordsA[1]-(this.fontSize/2), context.measureText(this.name).width, this.fontSize);
  context.fillStyle = 'black';
  context.fillText(this.name, this.coordsA[0]+(length/2)-(context.measureText(this.name).width/2), this.coordsA[1]);
  context.textBaseline = 'alphabetic';
  context.fillText(this.multiplicityA, this.coordsA[0], this.coordsA[1]-5);
  context.fillText(this.multiplicityB, this.coordsA[0]+length-context.measureText(this.multiplicityB).width, this.coordsA[1]-5);
  context.closePath();
  context.stroke();
  context.restore();
};

/**
 * Methode zum Erstellen eines JSON-Objekts aus dem Objekt der Assoziation.
 * @returns {Object} Das Objekt mit den Eigenschaften
 */
Association.prototype.toJSON = function() {
  return {
    _type: 'Association',
    _id: this._id,
    shapeA: this.getShapeA(),
    shapeB: this.getShapeB(),
    name: this.getName(),
    coordsA: this.getCoordsA(),
    coordsB: this.getCoordsB(),
    multiplicityA: this.getMultiplicityA(),
    multiplicityB: this.getMultiplicityB()
  };
};

/**
 * Methode zum Setzen der Objekteigenschaften aus einem JSON-Objekts.
 * @param {Object} json Der JSON-Objekt mit den Objekteigenschaften
 */
Association.prototype.applyJSON = function(json) {
  this._id = json._id;
  this.shapeA = json.shapeA;
  this.shapeB = json.shapeB;
  this.name = json.name;
  this.coordsA = json.coordsA;
  this.coordsB = json.coordsB;
  this.multiplicityA = json.multiplicityA;
  this.multiplicityB = json.multiplicityB;
};

/**
 * Methode zum Erstellen eines Bearbeitungsfensters zum Bearbeiten der Objekteigenschaften.
 * @param {Object} modal Der Serviceobjekt für das Erstellen des modalen Fensters
 * @param {Function} callback Die Funktion die nach dem Editieren ausgeführt werden soll
 */
Association.prototype.startEditmode = function(modal, callback) {
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
          multiplicityA: self.getMultiplicityA(),
          multiplicityB: self.getMultiplicityB()
        };
      }
    }
  });
  /**
   * Setzt die geänderten Eigenschaften dem Assoziationselements.
   * @param {Objekt} result Das Objekt mit den Editierten Eigenschaften
   */
  modalInstance.result.then(function(result) {
    self.setName(result.name);
    self.setMultiplicityA(result.multiplicityA);
    self.setMultiplicityB(result.multiplicityB);
    callback();
  });
};


/**
 * Gerichtete Assoziation Definition (einfache Linie Mit Pfeil)
 * @param {number} elementId            Die ID des Elements
 * @param {number[]} coordsA            Die Koordinaten des Anfangpunktes
 * @param {number[]} coordsB            Die Koordinaten des Endpunktes
 * @param {string} name                 Der Name der Verbindung
 * @param {number} [lineWidth=1]        Die Breite der Linie
 * @param {string} [lineColor='black']  Die Farbe der Linie
 * @param {string} [fontFamily='Arial'] Die Schriftart
 * @param {number} [fontSize=12]        Die Schriftgröße
 * @param {string} [multiplicityB='']   Die Kardanalität des Endpunktes
 */
function UniDirectionalAssociation(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize, multiplicityB) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);
  
  this.multiplicityB = (typeof multiplicityB === 'string') ? multiplicityB : '';
  
  /**
   * Setzt die Kardanalität des Endpunktes
   * @param {string} mulltiplicityB Die Kadanalität des Endpunktes
   */
  this.setMultiplicityB = function(multiplicityB) {
    this.multiplicityB = multiplicityB;
  };
  
  /**
   * Gibt die Kardanalität des Endpunktes zurück.
   * @returns {string} Die Kardanalität des Endpunktes
   */
  this.getMultiplicityB = function() {
    return this.multiplicityB;
  };
}

UniDirectionalAssociation.prototype = new Relation();

/**
 * Methode zum Zeichnen der gerichteten Assoziation auf der Canvasfläche.
 * @param {Object} canvas Die Canvasfläche auf der das Element gezeichnet werden soll
 */
UniDirectionalAssociation.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var deltaX = this.coordsB[0] - this.coordsA[0];
  var deltaY = this.coordsB[1] - this.coordsA[1];
  var length = Math.abs(Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2)));
  context.save();
  context.beginPath();
  context.strokeStyle = this.lineColor;
  context.lineWidth = this.lineWidth;
  context.translate(this.coordsA[0], this.coordsA[1]);
  context.rotate(Math.atan2(deltaY, deltaX));
  context.translate(-this.coordsA[0], -this.coordsA[1]);
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length, this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-10, this.coordsA[1]-10);
  context.moveTo(this.coordsA[0]+length, this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-10, this.coordsA[1]+10);
  context.closePath();
  context.stroke();
  context.font = 'bold ' + this.fontSize + 'px ' + this.fontFamily;
  context.textBaseline = 'middle';
  context.beginPath();
  context.fillStyle = 'white';
  context.fillRect(this.coordsA[0]+(length/2)-(context.measureText(this.name).width/2)-5, this.coordsA[1]-(this.fontSize/2), context.measureText(this.name).width, this.fontSize);
  context.fillStyle = 'black';
  context.fillText(this.name, this.coordsA[0]+(length/2)-(context.measureText(this.name).width/2)-5, this.coordsA[1]);
  context.textBaseline = 'alphabetic';
  context.fillText(this.multiplicityB, this.coordsA[0]+length-context.measureText(this.multiplicityB).width-15, this.coordsA[1]-5);
  context.closePath();
  context.stroke();
  context.restore();
};

/**
 * Methode zum Erstellen eines JSON-Objekts aus dem Objekt der gerichteten Assoziation.
 * @returns {Object} Das Objekt mit den Eigenschaften
 */
UniDirectionalAssociation.prototype.toJSON = function() {
  return {
    _type: 'UniDirectionalAssociation',
    _id: this._id,
    shapeA: this.getShapeA(),
    shapeB: this.getShapeB(),
    name: this.getName(),
    coordsA: this.getCoordsA(),
    coordsB: this.getCoordsB(),
    multiplicityB: this.getMultiplicityB()
  };
};

/**
 * Methode zum Setzen der Objekteigenschaften aus einem JSON-Objekts.
 * @param {Object} json Der JSON-Objekt mit den Objekteigenschaften
 */
UniDirectionalAssociation.prototype.applyJSON = function(json) {
  this._id = json._id;
  this.shapeA = json.shapeA;
  this.shapeB = json.shapeB;
  this.name = json.name;
  this.coordsA = json.coordsA;
  this.coordsB = json.coordsB;
  this.multiplicityB = json.multiplicityB;
};

/**
 * Methode zum Erstellen eines Bearbeitungsfensters zum Bearbeiten der Objekteigenschaften.
 * @param {Object} modal Der Serviceobjekt für das Erstellen des modalen Fensters
 * @param {Function} callback Die Funktion die nach dem Editieren ausgeführt werden soll
 */
UniDirectionalAssociation.prototype.startEditmode = function(modal, callback) {
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
          multiplicityB: self.getMultiplicityB()
        };
      }
    }
  });

  /**
   * Setzt die geänderten Eigenschaften dem Assoziationselements.
   * @param {Objekt} result Das Objekt mit den Editierten Eigenschaften
   */
  modalInstance.result.then(function(result) {
    self.setName(result.name);
    self.setMultiplicityB(result.multiplicityB);
    callback();
  });
};


/**
 * Definition der Aggregation (einfache Linie mit Quadraht)
 * @param {number} elementId            Die ID des Elements
 * @param {number[]} coordsA            Die Koordinaten des Anfangpunktes
 * @param {number[]} coordsB            Die Koordinaten des Endpunktes
 * @param {string} name                 Der Name der Verbindung
 * @param {number} [lineWidth=1]        Die Breite der Linie
 * @param {string} [lineColor='black']  Die Farbe der Linie
 * @param {string} [fontFamily='Arial'] Die Schriftart
 * @param {number} [fontSize=12]        Die Schriftgröße
 * @param {string} [multiplicityA='']   Die Kardanalität des Startpunktes
 * @param {string} [multiplicityB='']   Die Kardanalität des Endpunktes
 */
function Aggregation(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize, multiplicityA, multiplicityB) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);

  this.multiplicityA = (typeof multiplicityA === 'string') ? multiplicityA : '';
  this.multiplicityB = (typeof multiplicityB === 'string') ? multiplicityB : '';

  /**
   * Setzt die Kardanalität des Startpunktes
   * @param {string} mulltiplicityA Die Kadanalität des Startpunktes
   */
  this.setMultiplicityA = function(multiplicityA) {
    this.multiplicityA = multiplicityA;
  };

  /**
   * Setzt die Kardanalität des Endpunktes
   * @param {string} mulltiplicityB Die Kadanalität des Endpunktes
   */
  this.setMultiplicityB = function(multiplicityB) {
    this.multiplicityB = multiplicityB;
  };

  /**
   * Gibt die Kardanalität des Startpunktes zurück.
   * @returns {string} Die Kardanalität des Startpunktes
   */
  this.getMultiplicityA = function() {
    return this.multiplicityA;
  };

  /**
   * Gibt die Kardanalität des Endpunktes zurück.
   * @returns {string} Die Kardanalität des Endpunktes
   */
  this.getMultiplicityB = function() {
    return this.multiplicityB;
  };
}

Aggregation.prototype = new Relation();

/**
 * Methode zum Zeichnen der Aggregation auf der Canvasfläche.
 * @param {Object} canvas Die Canvasfläche auf der das Element gezeichnet werden soll
 */
Aggregation.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var deltaX = this.coordsB[0] - this.coordsA[0];
  var deltaY = this.coordsB[1] - this.coordsA[1];
  var length = Math.abs(Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2)));
  context.save();
  context.beginPath();
  context.strokeStyle = this.lineColor;
  context.lineWidth = this.lineWidth;
  context.translate(this.coordsA[0], this.coordsA[1]);
  context.rotate(Math.atan2(deltaY, deltaX));
  context.translate(-this.coordsA[0], -this.coordsA[1]);
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-30, this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-15, this.coordsA[1]-10);
  context.lineTo(this.coordsA[0]+length, this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-15, this.coordsA[1]+10);
  context.lineTo(this.coordsA[0]+length-30, this.coordsA[1]);
  context.closePath();
  context.stroke();
  context.font = 'bold ' + this.fontSize + 'px ' + this.fontFamily;
  context.textBaseline = 'middle';
  context.beginPath();
  context.fillStyle = 'white';
  context.fillRect(this.coordsA[0]+(length/2)-(context.measureText(this.name).width/2)-17.5, this.coordsA[1]-(this.fontSize/2), context.measureText(this.name).width, this.fontSize);
  context.fillStyle = 'black';
  context.fillText(this.name, this.coordsA[0]+(length/2)-(context.measureText(this.name).width/2)-17.5, this.coordsA[1]);
  context.textBaseline = 'alphabetic';
  context.fillText(this.multiplicityA, this.coordsA[0], this.coordsA[1]-5);
  context.fillText(this.multiplicityB, this.coordsA[0]+length-context.measureText(this.multiplicityB).width-35, this.coordsA[1]-5);
  context.fill();
  context.closePath();
  context.stroke();
  context.restore();
};

/**
 * Methode zum Erstellen eines JSON-Objekts aus dem Objekt der Aggregation.
 * @returns {Object} Das Objekt mit den Eigenschaften
 */
Aggregation.prototype.toJSON = function() {
  return {
    _type: 'Aggregation',
    _id: this._id,
    shapeA: this.getShapeA(),
    shapeB: this.getShapeB(),
    name: this.getName(),
    coordsA: this.getCoordsA(),
    coordsB: this.getCoordsB(),
    multiplicityA: this.getMultiplicityA(),
    multiplicityB: this.getMultiplicityB()
  };
};

/**
 * Methode zum Setzen der Objekteigenschaften aus einem JSON-Objekts.
 * @param {Object} json Der JSON-Objekt mit den Objekteigenschaften
 */
Aggregation.prototype.applyJSON = function(json) {
  this._id = json._id;
  this.shapeA = json.shapeA;
  this.shapeB = json.shapeB;
  this.name = json.name;
  this.coordsA = json.coordsA;
  this.coordsB = json.coordsB;
  this.multiplicityA = json.multiplicityA;
  this.multiplicityB = json.multiplicityB;
};

/**
 * Methode zum Erstellen eines Bearbeitungsfensters zum Bearbeiten der Objekteigenschaften.
 * @param {Object} modal Der Serviceobjekt für das Erstellen des modalen Fensters
 * @param {Function} callback Die Funktion die nach dem Editieren ausgeführt werden soll
 */
Aggregation.prototype.startEditmode = function(modal, callback) {
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
          multiplicityA: self.getMultiplicityA(),
          multiplicityB: self.getMultiplicityB()
        };
      }
    }
  });
  
  /**
   * Setzt die geänderten Eigenschaften dem Aggregationselements.
   * @param {Objekt} result Das Objekt mit den Editierten Eigenschaften
   */
  modalInstance.result.then(function(result) {
    self.setName(result.name);
    self.setMultiplicityA(result.multiplicityA);
    self.setMultiplicityB(self.multiplicityB);
    callback();
  });
};


/**
 * Definition der Komposition (Sonderfall der Aggregation)
 * @param {number} elementId            Die ID des Elements
 * @param {number[]} coordsA            Die Koordinaten des Anfangpunktes
 * @param {number[]} coordsB            Die Koordinaten des Endpunktes
 * @param {string} name                 Der Name der Verbindung
 * @param {number} [lineWidth=1]        Die Breite der Linie
 * @param {string} [lineColor='black']  Die Farbe der Linie
 * @param {string} [fontFamily='Arial'] Die Schriftart
 * @param {number} [fontSize=12]        Die Schriftgröße
 * @param {string} [multiplicityA='']   Die Kardanalität des Startpunktes
 * @param {string} [multiplicityB='']   Die Kardanalität des Endpunktes
 */
function Composition(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize, multiplicityA, multiplicityB) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);

  this.multiplicityA = (typeof multiplicityA === 'string') ? multiplicityA : '';
  this.multiplicityB = (typeof multiplicityB === 'string') ? multiplicityB : '';

  /**
   * Setzt die Kardanalität des Startpunktes
   * @param {string} mulltiplicityA Die Kadanalität des Startpunktes
   */
  this.setMultiplicityA = function(multiplicityA) {
    this.multiplicityA = multiplicityA;
  };

  /**
   * Setzt die Kardanalität des Endpunktes
   * @param {string} mulltiplicityB Die Kadanalität des Endpunktes
   */
  this.setMultiplicityB = function(multiplicityB) {
    this.multiplicityB = multiplicityB;
  };

  /**
   * Gibt die Kardanalität des Startpunktes zurück.
   * @returns {string} Die Kardanalität des Startpunktes
   */
  this.getMultiplicityA = function() {
    return this.multiplicityA;
  };

  /**
   * Gibt die Kardanalität des Endpunktes zurück.
   * @returns {string} Die Kardanalität des Endpunktes
   */
  this.getMultiplicityB = function() {
    return this.multiplicityB;
  };
}

Composition.prototype = new Relation();

/**
 * Methode zum Zeichnen der Komposition auf der Canvasfläche.
 * @param {Object} canvas Die Canvasfläche auf der das Element gezeichnet werden soll
 */
Composition.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var deltaX = this.coordsB[0] - this.coordsA[0];
  var deltaY = this.coordsB[1] - this.coordsA[1];
  var length = Math.abs(Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2)));
  context.save();
  context.beginPath();
  context.strokeStyle = this.lineColor;
  context.lineWidth = this.lineWidth;
  context.translate(this.coordsA[0], this.coordsA[1]);
  context.rotate(Math.atan2(deltaY, deltaX));
  context.translate(-this.coordsA[0], -this.coordsA[1]);
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-30, this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-15, this.coordsA[1]-10);
  context.lineTo(this.coordsA[0]+length, this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-15, this.coordsA[1]+10);
  context.lineTo(this.coordsA[0]+length-30, this.coordsA[1]);
  context.closePath();
  context.stroke();
  context.font = 'bold ' + this.fontSize + 'px ' + this.fontFamily;
  context.textBaseline = 'middle';
  context.beginPath();
  context.fillStyle = 'white';
  context.fillRect(this.coordsA[0]+(length/2)-(context.measureText(this.name).width/2)-17.5, this.coordsA[1]-(this.fontSize/2), context.measureText(this.name).width, this.fontSize);
  context.fillStyle = 'black';
  context.fillText(this.name, this.coordsA[0]+(length/2)-(context.measureText(this.name).width/2)-17.5, this.coordsA[1]);
  context.textBaseline = 'alphabetic';
  context.fillText(this.multiplicityA, this.coordsA[0], this.coordsA[1]-5);
  context.fillText(this.multiplicityB, this.coordsA[0]+length-context.measureText(this.multiplicityB).width-35, this.coordsA[1]-5);
  context.closePath();
  context.stroke();
  context.restore();
};

/**
 * Methode zum Erstellen eines JSON-Objekts aus dem Objekt der Komposition.
 * @returns {Object} Das Objekt mit den Eigenschaften
 */
Composition.prototype.toJSON = function() {
  return {
    _type: 'Composition',
    _id: this._id,
    shapeA: this.getShapeA(),
    shapeB: this.getShapeB(),
    name: this.getName(),
    coordsA: this.getCoordsA(),
    coordsB: this.getCoordsB(),
    multiplicityA: this.getMultiplicityA(),
    multiplicityB: this.getMultiplicityB()
  };
};

/**
 * Methode zum Setzen der Objekteigenschaften aus einem JSON-Objekts.
 * @param {Object} json Der JSON-Objekt mit den Objekteigenschaften
 */
Composition.prototype.applyJSON = function(json) {
  this._id = json._id;
  this.shapeA = json.shapeA;
  this.shapeB = json.shapeB;
  this.name = json.name;
  this.coordsA = json.coordsA;
  this.coordsB = json.coordsB;
  this.multiplicityA = json.multiplicityA;
  this.multiplicityB = json.multiplicityB;
};

/**
 * Methode zum Erstellen eines Bearbeitungsfensters zum Bearbeiten der Objekteigenschaften.
 * @param {Object} modal Der Serviceobjekt für das Erstellen des modalen Fensters
 * @param {Function} callback Die Funktion die nach dem Editieren ausgeführt werden soll
 */
Composition.prototype.startEditmode = function(modal, callback) {
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
          multiplicityA: self.getMultiplicityA(),
          multiplicityB: self.getMultiplicityB()
        };
      }
    }
  });

  /**
   * Setzt die geänderten Eigenschaften dem Kompositionselements.
   * @param {Objekt} result Das Objekt mit den Editierten Eigenschaften
   */
  modalInstance.result.then(function(result) {
    self.setName(result.name);
    self.setMultiplicityA(result.multiplicityA);
    self.setMultiplicityB(result.multiplicityB);
    callback();
  });
};


/**
 * Definition der Realisierung (Schraffierte Linie mit Dreieck)
 * @param {number} elementId            Die ID des Elements
 * @param {number[]} coordsA            Die Koordinaten des Anfangpunktes
 * @param {number[]} coordsB            Die Koordinaten des Endpunktes
 * @param {string} name                 Der Name der Verbindung
 * @param {number} [lineWidth=1]        Die Breite der Linie
 * @param {string} [lineColor='black']  Die Farbe der Linie
 * @param {string} [fontFamily='Arial'] Die Schriftart
 * @param {number} [fontSize=12]        Die Schriftgröße
 */
function Realization(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);
}

Realization.prototype = new Relation();

/**
 * Methode zum Zeichnen der Realisierung auf der Canvasfläche.
 * @param {Object} canvas Die Canvasfläche auf der das Element gezeichnet werden soll
 */
Realization.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var deltaX = this.coordsB[0] - this.coordsA[0];
  var deltaY = this.coordsB[1] - this.coordsA[1];
  var length = Math.abs(Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2)));
  context.save();
  context.beginPath();
  context.strokeStyle = this.lineColor;
  context.lineWidth = this.lineWidth;
  context.translate(this.coordsA[0], this.coordsA[1]);
  context.rotate(Math.atan2(deltaY, deltaX));
  context.translate(-this.coordsA[0], -this.coordsA[1]);
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.setLineDash([5, 10]);
  context.lineTo(this.coordsA[0]+length-10, this.coordsA[1]);
  context.closePath();
  context.stroke();
  context.beginPath();
  context.setLineDash([]);
  context.moveTo(this.coordsA[0]+length-10, this.coordsA[1]+10);
  context.lineTo(this.coordsA[0]+length-10, this.coordsA[1]-10);
  context.lineTo(this.coordsA[0]+length, this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-10, this.coordsA[1]+10);
  context.closePath();
  context.stroke();
  context.font = 'bold ' + this.fontSize + 'px ' + this.fontFamily;
  context.textBaseline = 'middle';
  context.beginPath();
  context.fillStyle = 'white';
  context.fillRect(this.coordsA[0]+(length/2)-(context.measureText(this.name).width/2)-5, this.coordsA[1]-(this.fontSize/2), context.measureText(this.name).width, this.fontSize);
  context.fillStyle = 'black';
  context.fillText(this.name, this.coordsA[0]+(length/2)-(context.measureText(this.name).width/2)-5, this.coordsA[1]);
  context.closePath();
  context.stroke();
  context.restore();
};

/**
 * Methode zum Erstellen eines JSON-Objekts aus dem Objekt der Realisierung.
 * @returns {Object} Das Objekt mit den Eigenschaften
 */
Realization.prototype.toJSON = function() {
  return {
    _type: 'Realization',
    _id: this._id,
    shapeA: this.getShapeA(),
    shapeB: this.getShapeB(),
    name: this.getName(),
    coordsA: this.getCoordsA(),
    coordsB: this.getCoordsB()
  };
};

/**
 * Methode zum Setzen der Objekteigenschaften aus einem JSON-Objekts.
 * @param {Object} json Der JSON-Objekt mit den Objekteigenschaften
 */
Realization.prototype.applyJSON = function(json) {
  this._id = json._id;
  this.shapeA = json.shapeA;
  this.shapeB = json.shapeB;
  this.name = json.name;
  this.coordsA = json.coordsA;
  this.coordsB = json.coordsB;
};

/**
 * Methode zum Erstellen eines Bearbeitungsfensters zum Bearbeiten der Objekteigenschaften.
 * @param {Object} modal Der Serviceobjekt für das Erstellen des modalen Fensters
 * @param {Function} callback Die Funktion die nach dem Editieren ausgeführt werden soll
 */
Realization.prototype.startEditmode = function(modal, callback) {
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
   * Setzt die geänderten Eigenschaften dem Realisierungselements.
   * @param {Objekt} result Das Objekt mit den Editierten Eigenschaften
   */
  modalInstance.result.then(function(result) {
    self.setName(result.name);
    callback();
  });
};


/**
 * Definition einer Abhängigkeit (Schraffierte Linier mit Pfeil)
 * @param {number} elementId            Die ID des Elements
 * @param {number[]} coordsA            Die Koordinaten des Anfangpunktes
 * @param {number[]} coordsB            Die Koordinaten des Endpunktes
 * @param {string} name                 Der Name der Verbindung
 * @param {number} [lineWidth=1]        Die Breite der Linie
 * @param {string} [lineColor='black']  Die Farbe der Linie
 * @param {string} [fontFamily='Arial'] Die Schriftart
 * @param {number} [fontSize=12]        Die Schriftgröße
 */
function Dependency(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);
}

Dependency.prototype = new Relation();

/**
 * Methode zum Zeichnen der Abhängigkeit auf der Canvasfläche.
 * @param {Object} canvas Die Canvasfläche auf der das Element gezeichnet werden soll
 */
Dependency.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var deltaX = this.coordsB[0] - this.coordsA[0];
  var deltaY = this.coordsB[1] - this.coordsA[1];
  var length = Math.abs(Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2)));
  context.save();
  context.beginPath();
  context.strokeStyle = this.lineColor;
  context.lineWidth = this.lineWidth;
  context.translate(this.coordsA[0], this.coordsA[1]);
  context.rotate(Math.atan2(deltaY, deltaX));
  context.translate(-this.coordsA[0], -this.coordsA[1]);
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.setLineDash([5, 10]);
  context.lineTo(this.coordsA[0]+length, this.coordsA[1]);
  context.closePath();
  context.stroke();
  context.beginPath();
  context.setLineDash([]);
  context.moveTo(this.coordsA[0]+length, this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-10, this.coordsA[1]-10);
  context.moveTo(this.coordsA[0]+length, this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length-10, this.coordsA[1]+10);
  context.closePath();
  context.stroke();
  context.font = 'bold ' + this.fontSize + 'px ' + this.fontFamily;
  context.textBaseline = 'middle';
  context.beginPath();
  context.fillStyle = 'white';
  context.fillRect(this.coordsA[0]+(length/2)-(context.measureText(this.name).width/2)-5, this.coordsA[1]-(this.fontSize/2), context.measureText(this.name).width, this.fontSize);
  context.fillStyle = 'black';
  context.fillText(this.name, this.coordsA[0]+(length/2)-(context.measureText(this.name).width/2)-5, this.coordsA[1]);
  context.closePath();
  context.stroke();
  context.restore();
};

/**
 * Methode zum Erstellen eines JSON-Objekts aus dem Objekt der Abhängigkeit.
 * @returns {Object} Das Objekt mit den Eigenschaften
 */
Dependency.prototype.toJSON = function() {
  return {
    _type: 'Dependency',
    _id: this._id,
    shapeA: this.getShapeA(),
    shapeB: this.getShapeB(),
    name: this.getName(),
    coordsA: this.getCoordsA(),
    coordsB: this.getCoordsB()
  };
};

/**
 * Methode zum Setzen der Objekteigenschaften aus einem JSON-Objekts.
 * @param {Object} json Der JSON-Objekt mit den Objekteigenschaften
 */
Dependency.prototype.applyJSON = function(json) {
  this._id = json._id;
  this.shapeA = json.shapeA;
  this.shapeB = json.shapeB;
  this.name = json.name;
  this.coordsA = json.coordsA;
  this.coordsB = json.coordsB;
};

/**
 * Methode zum Erstellen eines Bearbeitungsfensters zum Bearbeiten der Objekteigenschaften.
 * @param {Object} modal Der Serviceobjekt für das Erstellen des modalen Fensters
 * @param {Function} callback Die Funktion die nach dem Editieren ausgeführt werden soll
 */
Dependency.prototype.startEditmode = function(modal, callback) {
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
   * Setzt die geänderten Eigenschaften dem Abhängigkeitselements.
   * @param {Objekt} result Das Objekt mit den Editierten Eigenschaften
   */
  modalInstance.result.then(function(result) {
    self.setName(result.name);
    callback();
  });
};


/**
 * Definition eines Verbinders (Schraffierte Linie)
 * @param {number} elementId            Die ID des Elements
 * @param {number[]} coordsA            Die Koordinaten des Anfangpunktes
 * @param {number[]} coordsB            Die Koordinaten des Endpunktes
 * @param {string} name                 Der Name der Verbindung
 * @param {number} [lineWidth=1]        Die Breite der Linie
 * @param {string} [lineColor='black']  Die Farbe der Linie
 * @param {string} [fontFamily='Arial'] Die Schriftart
 * @param {number} [fontSize=12]        Die Schriftgröße
 */
function Link(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);
}

Link.prototype = new Relation();

/**
 * Methode zum Zeichnen des Verbinders auf der Canvasfläche.
 * @param {Object} canvas Die Canvasfläche auf der das Element gezeichnet werden soll
 */
Link.prototype.draw = function(canvas) {
  var context = canvas.getContext('2d');
  var deltaX = this.coordsB[0] - this.coordsA[0];
  var deltaY = this.coordsB[1] - this.coordsA[1];
  var length = Math.abs(Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2)));
  context.save();
  context.beginPath();
  context.translate(this.coordsA[0], this.coordsA[1]);
  context.rotate(Math.atan2(deltaY, deltaX));
  context.translate(-this.coordsA[0], -this.coordsA[1]);
  context.setLineDash([5, 10]);
  context.strokeStyle = this.lineColor;
  context.lineWidth = this.lineWidth;
  context.moveTo(this.coordsA[0], this.coordsA[1]);
  context.lineTo(this.coordsA[0]+length, this.coordsA[1]);
  context.closePath();
  context.stroke();
  context.font = 'bold ' + this.fontSize + 'px ' + this.fontFamily;
  context.textBaseline = 'middle';
  context.beginPath();
  context.fillStyle = 'white';
  context.fillRect(this.coordsA[0]+(length/2)-(context.measureText(this.name).width/2), this.coordsA[1]-(this.fontSize/2), context.measureText(this.name).width, this.fontSize);
  context.fillStyle = 'black';
  context.fillText(this.name, this.coordsA[0]+(length/2)-(context.measureText(this.name).width/2), this.coordsA[1]);
  context.closePath();
  context.stroke();
  context.restore();
};

/**
 * Methode zum Erstellen eines JSON-Objekts aus dem Objekt der Verbindung.
 * @returns {Object} Das Objekt mit den Eigenschaften
 */
Link.prototype.toJSON = function() {
  return {
    _type: 'Link',
    _id: this._id,
    shapeA: this.getShapeA(),
    shapeB: this.getShapeB(),
    name: this.getName(),
    coordsA: this.getCoordsA(),
    coordsB: this.getCoordsB()
  };
};

/**
 * Methode zum Setzen der Objekteigenschaften aus einem JSON-Objekts.
 * @param {Object} json Der JSON-Objekt mit den Objekteigenschaften
 */
Link.prototype.applyJSON = function(json) {
  this._id = json._id;
  this.shapeA = json.shapeA;
  this.shapeB = json.shapeB;
  this.name = json.name;
  this.coordsA = json.coordsA;
  this.coordsB = json.coordsB;
};

/**
 * Methode zum Erstellen eines Bearbeitungsfensters zum Bearbeiten der Objekteigenschaften.
 * @param {Object} modal Der Serviceobjekt für das Erstellen des modalen Fensters
 * @param {Function} callback Die Funktion die nach dem Editieren ausgeführt werden soll
 */
Link.prototype.startEditmode = function(modal, callback) {
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
   * Setzt die geänderten Eigenschaften dem Verbindungselements.
   * @param {Objekt} result Das Objekt mit den Editierten Eigenschaften
   */
  modalInstance.result.then(function(result) {
    self.setName(result.name);
    callback();
  });
};
