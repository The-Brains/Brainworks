/**
 *
 */

angular.module('brainworks.diagram')
.controller('CanvasCtrl', function ($scope) {
  var canvas = document.getElementById("canvas");
  if (canvas) {
    var context = canvas.getContext("2d");
    
    var payment = new ActiveClass(1, 1, 100, 50, "blue", 2);
    payment.draw(context);
  }
  
  /*****************************************************************************
   * All raw figure drawings are defined here                                  *
   ****************************************************************************/
  
  
  
  function drawText(context, x, y, maxWidth, font, fontColor) {
    
  }
  
  function drawEllipse(context, x, y, width, height, borderColor, lineWidth) {
    // Variables for the ellipse
    var kappa = .5522848;
    var ox = (width / 2) * kappa;     // control point offset horizontal
    var oy = (height / 2) * kappa;    // control point offset vertical
    var xe = x + width;               // x-end
    var ye = y + height;              // y-end
    var xm = x + width / 2;           // x-middle
    var ym = y + height / 2;          // y-middle
    
    context.save();
    context.beginPath();
    context.moveTo(x, ym);
    context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    
    // Settings for border color
    if (borderColor) context.strokeStyle = borderColor;
    else context.strokeStyle = "black";
    
    // Settings for border width
    if (lineWidth) context.lineWidth = lineWidth;
    else context.lineWidth = 1;
    
    context.stroke();
    context.restore();
  }
  
  function drawRectangle(context, x, y, width, height, borderColor, lineWidth) {
    context.save();
    context.rect(x, y, width, height);
    
    // Settings for border color
    if (borderColor) context.strokeStyle = borderColor; 
    else context.strokeStyle = "black";
    
    // Settings for border width
    if (lineWidth) context.lineWidth = lineWidth;
    else context.lineWidth = 1;
          
    context.stroke();
    context.restore();
  }
  
  

});