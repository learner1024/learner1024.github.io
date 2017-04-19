
$(document).ready(function(){
  $("#calc td").addClass("well");
  $("#calc td a")
    .addClass("btn btn-default")
    .attr("href", "#")
    .attr("role", "button");
  
  var operands = [];
  var operators = [];
  var appendDigit = function(d){
    var displayText = $("#display").text();
    var currentStr = displayText == "0" ? "" : displayText;
    $("#display").text(currentStr + d);
  }
  
  var appendOperator = function(op){
    var displayText = $("#display").text();
    operands.push(displayText);
    operators.push(op);
    var opsText = operands.reduce(function(acc, el, i){
      acc += el + operators[i];
      return acc;
    }, "");
    $("#ops").text(opsText);
    $("#display").text("0");
  }
  
  var getDigitBtnClickHandlerFn = function(d){
    return function(){
      appendDigit(d);
    }
  }
  
  var getOperatorBtnClickHandlerFn = function(op){
    return function(){
      appendOperator(op);
    }
  }
  
  $("#btn0").click(getDigitBtnClickHandlerFn(0));
  $("#btn1").click(getDigitBtnClickHandlerFn(1));
  $("#btn2").click(getDigitBtnClickHandlerFn(2));
  $("#btn3").click(getDigitBtnClickHandlerFn(3));
  $("#btn4").click(getDigitBtnClickHandlerFn(4));
  $("#btn5").click(getDigitBtnClickHandlerFn(5));
  $("#btn6").click(getDigitBtnClickHandlerFn(6));
  $("#btn7").click(getDigitBtnClickHandlerFn(7));
  $("#btn8").click(getDigitBtnClickHandlerFn(8));
  $("#btn9").click(getDigitBtnClickHandlerFn(9));
  $("#btnAdd").click(getOperatorBtnClickHandlerFn('+'));
  $("#btnSub").click(getOperatorBtnClickHandlerFn('-'));
  $("#btnMul").click(getOperatorBtnClickHandlerFn('*'));
  $("#btnDiv").click(getOperatorBtnClickHandlerFn('/'));
  $("#btnEquals").click(function(){
    var displayText = $("#display").text();
    operands.push(displayText);
    
    var opsText = operands.reduce(function(acc, el, i){
      acc += el + (operators[i] ? operators[i] : "");
      return acc;
    }, "");
    $("#ops").text(opsText);
    
    $("#display").text(eval(opsText));
  });
  $("#btnAC").click(function(){
    operators.length = 0;
    operands.length = 0;
    $("#display").text("0");
    $("#ops").html("&nbsp;");
  });
});