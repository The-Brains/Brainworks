/**
 * Definieren, zeichnen, wandeln, speichern und editieren der verscheidenen Beziehungen
 */
/**
 * Definition des Verbindungsprototyps, von welchem die Verbindungselemente erben
 * @param elementId
 * @param coordsA
 * @param coordsB
 * @param name
 * @param lineWidth
 * @param lineColor
 * @param fontFamily
 * @param fontSize
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

  this.setShapeA = function(shapeA) {
    this.shapeA = shapeA;
  };

  this.setShapeB = function(shapeB) {
    this.shapeB = shapeB;
  };

  this.setCoordsA = function(coordsA) {
    this.coordsA = coordsA;
  };

  this.setCoordsB = function(coordsB) {
    this.coordsB = coordsB;
  };

  this.setName = function(name) {
    this.name = name;
  };

  this.setLineColor = function(lineColor) {
    this.lineColor = lineColor;
  };

  this.setLineWidth = function(lineWidth) {
    this.lineWidth = lineWidth;
  };

  this.setFontFamily = function(fontFamily) {
    this.fontFamily = fontFamily;
  };

  this.setFontSize = function(fontSize) {
    this.fontSize = fontSize;
  };

  this.getShapeA = function() {
    return this.shapeA;
  };

  this.getShapeB = function() {
    return this.shapeB;
  };

  this.getCoordsA = function() {
    return this.coordsA;
  };

  this.getCoordsB = function() {
    return this.coordsB;
  };

  this.getName = function() {
    return this.name;
  };

  this.getLineColor = function() {
    return this.lineColor;
  };

  this.getLineWidth = function() {
    return this.lineWidth;
  };

  this.getFontFamily = function() {
    return this.fontFamily;
  };

  this.getFontSize = function() {
    return this.fontSize;
  };
}
/**
 * Zeichnen des Verbindungsprototyps
 */
Relation.prototype.draw = function() {
  throw new Error('This method should not be directly called!');
};
/**
 * Wandeln des Verbindungsprototyps zu einem JSON Objekt
 */
Relation.prototype.toJSON = function() {
  throw new Error('This method should not be directly called!');
};
/**
 * Speichern des JSON Objektes des Verbindungsprototyps
 * @param json
 */
Relation.prototype.applyJSON = function(json) {
  throw new Error('This method should not be directly called!');
};
/**
 * Editieren des Verbindungsprototyps aktivieren
 * @param modal
 * @param callback
 */
Relation.prototype.startEditmode = function(modal, callback) {
  throw new Error('This method should not be directly called!');
};

/**
 * Definition der Vererbung
 * @param elementId
 * @param coordsA
 * @param coordsB
 * @param name
 * @param lineWidth
 * @param lineColor
 * @param fontFamily
 * @param fontSize
 */
function Inheritance(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);
}
/* Über Prototype werden die Eigenschaften vererbt */
Inheritance.prototype = new Relation();
/**
 * Zeichnen der Vererbung
 * @param canvas
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
 * Wandeln der Vererbung in ein JSON Objekt
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
 *  Speichern des JSON Objektes der Vererbung
 *  @param json
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
 * Editieren der Vererbung aktivieren
 * @param modal
 * @param callback
 */
Inheritance.prototype.startEditmode = function(modal, callback) {
  var self = this;
  /* Bearbeiten des Editierbaren Elementes im Vordergrund */
  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      settings: function() {
        return {
          name: self.getName()
        };
      }
    }
  });
  modalInstance.result.then(function(result) {
    self.setName(result.name);
    callback();
  });
};


/**
 * Definition der Assoziation ( einfache Linie )
 * @param elementId
 * @param coordsA
 * @param coordsB
 * @param name
 * @param lineWidth
 * @param lineColor
 * @param fontFamily
 * @param fontSize
 * @param multiplicityA
 * @param multiplicityB
 */
function Association(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize, multiplicityA, multiplicityB) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);

  this.multiplicityA = (typeof multiplicityA === 'string') ? multiplicityA : '';
  this.multiplicityB = (typeof multiplicityB === 'string') ? multiplicityB : '';

  this.setMultiplicityA = function(multiplicityA) {
    this.multiplicityA = multiplicityA;
  };

  this.setMultiplicityB = function(multiplicityB) {
    this.multiplicityB = multiplicityB;
  };

  this.getMultiplicityA = function() {
    return this.multiplicityA;
  };

  this.getMultiplicityB = function() {
    return this.multiplicityB;
  };
}
Association.prototype = new Relation();
/**
 * Zeichnen der Assoziation mit der Einblendung von dessen Bezeichnungen
 * @param canvas : Fläche, auf welcher die Beziehungen liegen
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
 * Wandeln der Assoziation in ein JSON Objekt
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
 * Speichern des JSON Objektes der Assoziation
 * @param json
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
 * Editieren der Assoziation aktivieren
 * @param modal
 * @param callback
 */
Association.prototype.startEditmode = function(modal, callback) {
  var self = this;
  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      settings: function() {
        return {
          name: self.getName(),
          multiplicityA: self.getMultiplicityA(),
          multiplicityB: self.getMultiplicityB()
        };
      }
    }
  });
  modalInstance.result.then(function(result) {
    self.setName(result.name);
    self.setMultiplicityA(result.multiplicityA);
    self.setMultiplicityB(result.multiplicityB);
    callback();
  });
};

/**
 * Gerichtete Assoziation Definition (einfache Linie Mit Pfeil)
 * @param elementId
 * @param coordsA
 * @param coordsB
 * @param name
 * @param lineWidth
 * @param lineColor
 * @param fontFamily
 * @param fontSize
 * @param multiplicityB
 */
function UniDirectionalAssociation(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize, multiplicityB) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);
  this.multiplicityB = (typeof multiplicityB === 'string') ? multiplicityB : '';
  this.setMultiplicityB = function(multiplicityB) {
    this.multiplicityB = multiplicityB;
  };
  this.getMultiplicityB = function() {
    return this.multiplicityB;
  };
}
UniDirectionalAssociation.prototype = new Relation();
/**
 * Zeichnen der gerichteten Assoziation
 * @param canvas
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
 * Wandeln der gerichteten Assoziation in ein JSON Objekt
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
 * Speichern des JSON Objektes der gerichteten Assoziation
 * @param json
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
 * Editieren der gerichteten Assoziation aktivieren
 * @param modal
 * @param callback
 */
UniDirectionalAssociation.prototype.startEditmode = function(modal, callback) {
  var self = this;

  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      settings: function() {
        return {
          name: self.getName(),
          multiplicityB: self.getMultiplicityB()
        };
      }
    }
  });

  modalInstance.result.then(function(result) {
    self.setName(result.name);
    self.setMultiplicityB(result.multiplicityB);
    callback();
  });
};


/**
 * Definition der Aggregation (einfache Linie mit Quadraht)
 * @param elementId
 * @param coordsA
 * @param coordsB
 * @param name
 * @param lineWidth
 * @param lineColor
 * @param fontFamily
 * @param fontSize
 * @param multiplicityA
 * @param multiplicityB
 */
function Aggregation(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize, multiplicityA, multiplicityB) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);

  this.multiplicityA = (typeof multiplicityA === 'string') ? multiplicityA : '';
  this.multiplicityB = (typeof multiplicityB === 'string') ? multiplicityB : '';

  this.setMultiplicityA = function(multiplicityA) {
    this.multiplicityA = multiplicityA;
  };

  this.setMultiplicityB = function(multiplicityB) {
    this.multiplicityB = multiplicityB;
  };

  this.getMultiplicityA = function() {
    return this.multiplicityA;
  };

  this.getMultiplicityB = function() {
    return this.multiplicityB;
  };
}
Aggregation.prototype = new Relation();
/**
 * Zeichnen der Aggregation
 * @param canvas
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
 * Wandeln der Aggregation in ein JSON Objekt
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
 * Speichern des JSON Objektes der Aggregation
 * @param json
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
 * Editieren der Aggregation aktivieren
 * @param modal
 * @param callback
 */
Aggregation.prototype.startEditmode = function(modal, callback) {
  var self = this;

  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      settings: function() {
        return {
          name: self.getName(),
          multiplicityA: self.getMultiplicityA(),
          multiplicityB: self.getMultiplicityB()
        };
      }
    }
  });

  modalInstance.result.then(function(result) {
    self.setName(result.name);
    self.setMultiplicityA(result.multiplicityA);
    self.setMultiplicityB(self.multiplicityB);
    callback();
  });
};

/*TODO Composition Quadraht ausfüllen? Kann nicht einfach die Aggregation geklont werden (mit kleiner Änderung beim Zeichnen)?*/
/**
 * Definition der Komposition (Sonderfall der Aggregation)
 * @param elementId
 * @param coordsA
 * @param coordsB
 * @param name
 * @param lineWidth
 * @param lineColor
 * @param fontFamily
 * @param fontSize
 * @param multiplicityA
 * @param multiplicityB
 */
function Composition(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize, multiplicityA, multiplicityB) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);

  this.multiplicityA = (typeof multiplicityA === 'string') ? multiplicityA : '';
  this.multiplicityB = (typeof multiplicityB === 'string') ? multiplicityB : '';

  this.setMultiplicityA = function(multiplicityA) {
    this.multiplicityA = multiplicityA;
  };

  this.setMultiplicityB = function(multiplicityB) {
    this.multiplicityB = multiplicityB;
  };

  this.getMultiplicityA = function() {
    return this.multiplicityA;
  };

  this.getMultiplicityB = function() {
    return this.multiplicityB;
  };
}
Composition.prototype = new Relation();
/**
 * Zeichnen der Komposition
 * @param canvas
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
 * Wandeln der Komposition in ein JSON Objekt
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
 * Speichern des JSON Objektes der Komposition
 * @param json
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
 * Editieren der Komposition aktivieren
 * @param modal
 * @param callback
 */
Composition.prototype.startEditmode = function(modal, callback) {
  var self = this;

  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      settings: function() {
        return {
          name: self.getName(),
          multiplicityA: self.getMultiplicityA(),
          multiplicityB: self.getMultiplicityB()
        };
      }
    }
  });

  modalInstance.result.then(function(result) {
    self.setName(result.name);
    self.setMultiplicityA(result.multiplicityA);
    self.setMultiplicityB(result.multiplicityB);
    callback();
  });
};

/**
 * Definition der Realisierung (Schraffierte Linie mit Dreieck)
 * @param elementId
 * @param coordsA
 * @param coordsB
 * @param name
 * @param lineWidth
 * @param lineColor
 * @param fontFamily
 * @param fontSize
 */
function Realization(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);
}
Realization.prototype = new Relation();
/**
 * Zeichnen der Realisierung
 * @param canvas
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
 * Wandeln der Realisierung in ein JSON Objekt
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
 * Speichern des JSON Objektes der Realisierung
 * @param json
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
 * Editieren der Realisierung aktivieren
 * @param modal
 * @param callback
 */
Realization.prototype.startEditmode = function(modal, callback) {
  var self = this;

  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      settings: function() {
        return {
          name: self.getName()
        };
      }
    }
  });

  modalInstance.result.then(function(result) {
    self.setName(result.name);
    callback();
  });
};

/**
 * Definition einer Abhängigkeit (Schraffierte Linier mit Pfeil)
 * @param elementId
 * @param coordsA
 * @param coordsB
 * @param name
 * @param lineWidth
 * @param lineColor
 * @param fontFamily
 * @param fontSize
 */
function Dependency(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);
}
Dependency.prototype = new Relation();
/**
 * Zeichnen der Abhängigkeit
 * @param canvas
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
 * Wandeln der Abhängigkeit in ein JSON Objekt
 * @returns {___anonymous27837_28034}
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
 * Speichern des JSON Objektes der Abhängigkeit
 * @param json
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
 * Editieren der Abhängigkeit aktivieren
 * @param modal
 * @param callback
 */
Dependency.prototype.startEditmode = function(modal, callback) {
  var self = this;

  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      settings: function() {
        return {
          name: self.getName()
        };
      }
    }
  });

  modalInstance.result.then(function(result) {
    self.setName(result.name);
    callback();
  });
};

/**
 * Definition eines Verbinders (Schraffierte Linie)
 * @param elementId
 * @param coordsA
 * @param coordsB
 * @param name
 * @param lineWidth
 * @param lineColor
 * @param fontFamily
 * @param fontSize
 */
function Link(elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize) {
  Relation.call(this, elementId, coordsA, coordsB, name, lineWidth, lineColor, fontFamily, fontSize);
}

Link.prototype = new Relation();
/**
 * Zeichnen des Verbinders
 * @param canvas
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
 * Wandelt den Verbinder in ein JSON Objekt
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
 * Speichert das JSON Objekt des Verbinders
 * @param json
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
 * Editieren des Verbinders aktivieren
 * @param modal
 * @param callback
 */
Link.prototype.startEditmode = function(modal, callback) {
  var self = this;

  var modalInstance = modal.open({
    templateUrl: '/diagram/attributesEditor',
    controller: 'attributesEditorCtrl',
    resolve: {
      settings: function() {
        return {
          name: self.getName()
        };
      }
    }
  });

  modalInstance.result.then(function(result) {
    self.setName(result.name);
    callback();
  });
};
