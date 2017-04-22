
$(document).ready(function () {
  $("#calc td").addClass("well");
  $("#calc td a").addClass("btn btn-default").attr("href", "#").attr("role", "button");

  var operands = [];
  var operators = [];
  var displayClearFlag = false;

  var appendDigit = function appendDigit(d) {
    var displayText = displayClearFlag ? "" : $("#display").text();
    var currentStr = displayText == "0" ? "" : displayText;
    $("#display").text(currentStr + d);
    displayClearFlag = false;
  };

  var appendOperator = function appendOperator(op) {
    var displayText = $("#display").text();
    operands.push(displayText);
    operators.push(op);
    var opsText = operands.reduce(function (acc, el, i) {
      acc += el + (operators[i] || "");
      return acc;
    }, "");
    $("#ops").text(opsText);
    $("#display").text("0");
  };

  var getDecPointBtnClickHandlerFn = function getDecPointBtnClickHandlerFn() {
    var displayText = $("#display").text();
    if (displayText.indexOf(".") === -1) {
      var currentStr = displayText + ".";
      $("#display").text(currentStr);
    }
  };

  var getDigitBtnClickHandlerFn = function getDigitBtnClickHandlerFn(d) {
    return function () {
      appendDigit(d);
    };
  };

  var getOperatorBtnClickHandlerFn = function getOperatorBtnClickHandlerFn(op) {
    return function () {
      appendOperator(op);
    };
  };
  $("#btnDecPnt").click(getDecPointBtnClickHandlerFn);
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

  $("#btnEquals").click(function () {
    var displayText = $("#display").text();
    operands.push(displayText);

    // var opsText = operands.reduce(function(acc, el, i){
    //   acc += el + (operators[i] ? operators[i] : "");
    //   return acc;
    // }, "");
    // $("#display").text(eval(opsText));

    var result = operators.reduce(function (acc, el, i) {

      var currentResult = eval("" + acc + el + operands[i + 1]);
      return currentResult;
    }, operands[0]);
    $("#display").text(result);

    $("#ops").html("&nbsp;");

    operators.length = 0;
    operands.length = 0;
    displayClearFlag = true;
  });

  $("#btnAC").click(function () {
    operators.length = 0;
    operands.length = 0;
    $("#display").text("0");
    $("#ops").html("&nbsp;");
  });

  $("#btnCE").click(function () {
    $("#display").text("0");
  });
});