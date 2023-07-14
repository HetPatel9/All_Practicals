"use strict";
/// <reference path="interface.ts"/>
var buttons = document.querySelectorAll(".btn");
buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        var text = button.innerText;
        buttonFunctionality(text);
    });
});
var flag = {
    func: false,
    trigoBox: false,
    trigoFunc: true,
    isDegree: false,
};
var display = [];
var memory = 0;
var hCounter = -1;
function buttonFunctionality(btnTxt) {
    var trigoBox = document.querySelector('.trigonometry');
    var trigoFunc = document.querySelector('.rg1');
    var inverseTrigoFunc = document.querySelector('.rg2');
    switch (btnTxt) {
        case '1':
            display.push(1);
            break;
        case '2':
            display.push(2);
            break;
        case '3':
            display.push(3);
            break;
        case '4':
            display.push(4);
            break;
        case '5':
            display.push(5);
            break;
        case '6':
            display.push(6);
            break;
        case '7':
            display.push(7);
            break;
        case '8':
            display.push(8);
            break;
        case '9':
            display.push(9);
            break;
        case '0':
            display.push(0);
            break;
        case '.':
            display.push('.');
            break;
        case '+':
            display.push('+');
            break;
        case '-':
            display.push('-');
            break;
        case '/':
            display.push('/');
            break;
        case 'mod':
            display.push('%');
            break;
        case 'X':
            display.push('*');
            break;
        case 'C':
            display = [];
            hCounter = -1;
            break;
        case 'back':
            display.pop();
            break;
        case 'exp':
            display.push('E');
            break;
        case '|x|':
            display.push("abs(");
            break;
        case 'π':
            display.push('π');
            break;
        case 'e':
            display.push('e');
            break;
        case 'X2':
            display.push('^2');
            break;
        case '1/x':
            display.push('1/');
            break;
        case '√x':
            display.push('√(');
            break;
        case '(':
            display.push('(');
            break;
        case ')':
            display.push(')');
            break;
        case 'n!':
            display.push('!');
            break;
        case 'xy':
            display.push('^');
            break;
        case '10x':
            display.push('10^');
            break;
        case 'log':
            display.push('log(');
            break;
        case '+/-':
            var change = [];
            for (var i = display.length - 1; i > -1; i--) {
                if (isNaN(display[i])) {
                    break;
                }
                else {
                    change.unshift(display[i]);
                    display.pop();
                }
            }
            var num = eval(change.join(''));
            display.push(num * -1);
            break;
        case 'Ceil':
            var ceil = Math.ceil(eval(display.join('')));
            display = [];
            display.push(ceil);
            break;
        case 'Floor':
            var floor = Math.floor(eval(display.join('')));
            display = [];
            display.push(floor);
            break;
        case 'Round':
            var round = Math.round(eval(display.join('')));
            display = [];
            display.push(round);
            break;
        case 'ln':
            display.push('ln(');
            break;
        case 'RAD':
            flag.isDegree = true;
            var RtoD = document.querySelector('.DtoR');
            RtoD.innerHTML = 'DEG';
            break;
        case 'DEG':
            flag.isDegree = false;
            var DtoR = document.querySelector('.DtoR');
            DtoR.innerHTML = 'RAD';
            break;
        case 'sin':
            display.push('sin(');
            break;
        case 'cos':
            display.push('cos(');
            break;
        case 'tan':
            display.push('tan(');
            break;
        case 'sinh':
            display.push('sinh(');
            break;
        case 'cosh':
            display.push('cosh(');
            break;
        case 'tanh':
            display.push('tanh(');
            break;
        case 'sin-1':
            display.push('sin-1(');
            break;
        case 'cos-1':
            display.push('cos-1(');
            break;
        case 'tan-1':
            display.push('tan-1(');
            break;
        case 'sinh-1':
            display.push('sinh-1(');
            break;
        case 'cosh-1':
            display.push('cosh-1(');
            break;
        case 'tanh-1':
            display.push('tanh-1(');
            break;
        case 'Function':
            var row1 = document.querySelector('.rg3');
            if (flag.func == false) {
                row1.style.display = 'flex';
                flag.func = true;
            }
            else {
                row1.style.display = 'none';
                flag.func = false;
            }
            break;
        case 'Trigonometry':
            if (flag.trigoBox == false) {
                trigoBox.style.display = 'flex';
                trigoFunc.style.display = 'flex';
                inverseTrigoFunc.style.display = 'none';
                flag.trigoBox = true;
            }
            else {
                trigoBox.style.display = 'none';
                trigoFunc.style.display = 'none';
                inverseTrigoFunc.style.display = 'none';
                flag.trigoBox = false;
            }
            break;
        case 'Inv':
            if (flag.trigoFunc == true) {
                inverseTrigoFunc.style.display = 'flex';
                trigoFunc.style.display = 'none';
                flag.trigoFunc = false;
            }
            else {
                inverseTrigoFunc.style.display = 'none';
                trigoFunc.style.display = 'flex';
                flag.trigoFunc = true;
            }
            break;
        case 'F-E':
            var tempAns = eval(display.join('')).toExponential();
            display = [];
            display.push(tempAns);
            break;
        case '=':
            var ans_1 = calculation(display);
            display = [];
            display.push(ans_1);
            break;
        case 'MC':
            memory = 0;
            display = [];
            break;
        case 'MS':
            memory = eval(display.join(''));
            if (isNaN(memory)) {
                memory = 0;
            }
            break;
        case 'M+':
            memory += eval(display.join(''));
            break;
        case 'M-':
            memory -= eval(display.join(''));
            break;
        case 'MR':
            display.push(memory);
            break;
        case 'H+':
            if (hCounter == -1) {
                hCounter = 0;
            }
            else {
                hCounter = (hCounter + 1) % historyArray.length;
            }
            display = [];
            display.push(historyArray[hCounter]);
            break;
        case 'H-':
            if (hCounter == -1) {
                hCounter = historyArray.length - 1;
            }
            else {
                hCounter = (hCounter - 1 + historyArray.length) % historyArray.length;
            }
            display = [];
            display.push(historyArray[hCounter]);
            break;
        default:
            break;
    }
    var ans = document.querySelector('input');
    ans.value = display.join('');
}
var sArray = [];
var calArray = [];
var historyArray = [];
function calculation(temp) {
    sArray = temp;
    for (var i = 0; i < sArray.length; i++) {
        switch (sArray[i]) {
            case '^':
                calArray.push('**');
                break;
            case '^2':
                calArray.push('**2');
                break;
            case 'e':
                calArray.push('Math.E');
                break;
            case 'π':
                calArray.push('Math.PI');
                break;
            case 'abs(':
                calArray.push('Math.abs(');
                break;
            case '!':
                var num = factNum(i);
                var ans = fact(num);
                calArray.push(ans);
                break;
            case '10^':
                calArray.push('10**');
                break;
            case 'E':
                calArray.push('*10**');
                break;
            case '1/':
                calArray.push('1/');
                break;
            case 'log(':
                calArray.push('Math.log10(');
                break;
            case 'ln(':
                calArray.push('Math.log(');
                break;
            case '√(':
                calArray.push('Math.sqrt(');
                break;
            case '∛(':
                calArray.push('Math.cbrt(');
                break;
            case 'sin(':
                calArray.push(flag.isDegree == false ? "Math.sin(" : "Math.sin(Math.PI/180*");
                break;
            case 'cos(':
                calArray.push(flag.isDegree == false ? "Math.cos(" : "Math.cos(Math.PI/180*");
                break;
            case 'tan(':
                calArray.push(flag.isDegree == false ? "Math.tan(" : "Math.tan(Math.PI/180*");
                break;
            case 'sinh(':
                calArray.push(flag.isDegree == false ? "Math.sinh(" : "Math.sinh(Math.PI/180*");
                break;
            case 'cosh(':
                calArray.push(flag.isDegree == false ? "Math.cosh(" : "Math.cosh(Math.PI/180*");
                break;
            case 'tanh(':
                calArray.push(flag.isDegree == false ? "Math.tanh(" : "Math.tanh(Math.PI/180*");
                break;
            case 'sin-1(':
                calArray.push('Math.asin(');
                break;
            case 'cos-1(':
                calArray.push('Math.acos(');
                break;
            case 'tan-1(':
                calArray.push('Math.atan(');
                break;
            case 'sinh-1(':
                calArray.push('Math.asinh(');
                break;
            case 'cosh-1(':
                calArray.push('Math.acosh(');
                break;
            case 'tanh-1(':
                calArray.push('Math.atanh(');
                break;
            default:
                calArray.push(sArray[i]);
                break;
        }
    }
    try {
        var ans = eval(calArray.join(''));
        if (historyArray.length < 5) {
            historyArray.unshift(ans);
        }
        else {
            historyArray.pop();
            historyArray.unshift(ans);
        }
        return ans;
    }
    catch (error) {
        return 'Error';
    }
    finally {
        calArray = [];
    }
}
function factNum(index) {
    var num = [];
    if (isNaN(sArray[index - 1]) && sArray[index - 1] != ')') {
        return new Error('ERror');
    }
    else if (sArray[index - 1] != ')') {
        for (var i = index - 1; i >= 0; i--) {
            if (!isNaN(sArray[i])) {
                num.unshift(sArray[i]);
                calArray.pop();
            }
            else {
                break;
            }
        }
        return num.join('');
    }
    else {
        var temp = [];
        for (var i = index - 1; i >= 0; i--) {
            if (sArray[i] == '(') {
                temp.unshift(sArray[i]);
                calArray.pop();
                break;
            }
            else {
                temp.unshift(sArray[i]);
                calArray.pop();
            }
        }
        return eval(temp.join(''));
    }
}
function fact(n) {
    var ans = 1;
    if (n == 0) {
        return 1;
    }
    else if (n > 0) {
        for (var i = 1; i <= n; i++) {
            ans = i * ans;
        }
    }
    else {
        ans = "error";
    }
    return ans;
}
