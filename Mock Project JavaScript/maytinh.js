function insertCharacter(char) { // hàm xử lý  tính toán nhập vào
    let currentValue = $('.inputDisplay').val();
    let length = $('.inputDisplay').val().length;
    let flag = false;
    if (char == '+' || char == '-' || char == '*' || char == '/')
        flag = true;
    if (length == 0) {
        if (flag)
            return;
    }
    let flagNew = false;
    let lastCharacter = currentValue[length - 1];
    if (lastCharacter == '+' || lastCharacter == '-' || lastCharacter == '*' || lastCharacter == '/')
        flagNew = true;
    if (flag && flagNew)
        $('.inputDisplay').val(currentValue.substring(0, length - 1) + char);
    else
        $('.inputDisplay').val($('.inputDisplay').val() + char);
}

function clearInput() { // xoá kết quả 
    $('.inputDisplay').val('');
    $('.displaytotal').val('0');

}

$("#positive").click(function() { // xử lý âm dương
    let myScreen = $(".inputDisplay").val();
    let subString, checkCatch;
    if (isOperator(myScreen)) {
        for (let i = 0; i < myScreen.length; i++) {
            if (Spread(myScreen[myScreen.length - i], "*", "/")) {
                subString = myScreen.substring(myScreen.length - i + 1, myScreen.length)
                try {
                    subString = positive(subString);
                    $(".inputDisplay").val(myScreen.slice(0, myScreen.length - i + 1) + subString);
                } catch (e) {
                    checkCatch = evalCatch(e);
                }
                break;
            } else if (Spread(myScreen[myScreen.length - i], "+", "-")) {
                subString = myScreen.substring(myScreen.length - i, myScreen.length)
                try {
                    subString = positive(subString);
                    if (subString > 0 && (sumopera(myScreen[myScreen.length - i - 1], "*", "/", "+"))) {
                        subString = "+" + subString;
                    }
                    $(".inputDisplay").val(myScreen.slice(0, myScreen.length - i) + subString);
                } catch (e) {
                    checkCatch = evalCatch(e)
                }
                break;
            } else if (myScreen[0] === "-" && sumOperator(myScreen) === 1) {
                try {
                    $(".inputDisplay").val(positive(myScreen));
                } catch (e) {
                    checkCatch = evalCatch(e)
                }
                break;
            }
        }
    } else {
        $(".inputDisplay").val(positive(myScreen));
    }
});

$("#dividepercent").click(function() { // chia phần trăm
    let myScreen = $(".inputDisplay").val();
    let subString, checkCatch;
    if (isOperator(myScreen)) {
        for (let i = 0; i < myScreen.length; i++) {
            if (sumOperator(myScreen) === 1 && Spread2(myScreen[0])) {
                $('.inputDisplay').val(dividepercent(myScreen));
                break;
            } else if (sumOperator(myScreen) >= 1 && Spread2(myScreen[myScreen.length - i])) {
                subString = myScreen.substring(myScreen.length - i + 1, myScreen.length)
                try {
                    subString = dividepercent(subString);
                    $(".inputDisplay").val(myScreen.slice(0, myScreen.length - i + 1) + subString);
                } catch (e) {
                    checkCatch = evalCatch(e);
                }
                break;
            }
        }
    } else {
        $('.inputDisplay').val(dividepercent(myScreen));
    }
});

function deleteCharacter() { // lùi lại
    let currentValue = $('.inputDisplay').val();
    $('.inputDisplay').val(currentValue.substring(0, currentValue.length - 1));
}

function numberCharacter() {
    $('.displaytotal').val($('.displaytotal').val() * (-1));


}

function result() { // hiển thị và trả kết quả tính toán
    let currentValue = $('.inputDisplay').val();
    let length = currentValue.length;
    let flag = false;
    let char = currentValue[length - 1];
    if (char == '+' || char == '-' || char == '*' || char == '/')
        flag = true;
    if (flag)
        $('.displaytotal').val("ERROR!!!!");
    else
        $('.displaytotal').val(eval($('.inputDisplay').val()));
}

var today = new Date(); // ngày giờ
var time = today.getHours() + ":" + today.getMinutes();
document.getElementById("hvn").innerHTML = time;



isOperator = function(myScreen) {
    return myScreen.includes("-") || myScreen.includes("+") ||
        myScreen.includes("*") || myScreen.includes("/");
};
Spread2 = function(value) {
    return value === ("-") || value === ("+") || value === ("*") || value === ("/")

}
sumOperator = function(value) {
    let num = 0;
    for (let i = 0; i < value.length; i++) {
        if (value[i] === ("-") || value[i] === ("+") || value[i] === ("*") || value[i] === ("/")) {
            num += 1;
        }
    }
    return num;
};
Spread = function(value, ope1, ope2) {
    return value === (ope1) || value === (ope2)
};
sumopera = function(value, ope1, ope2, ope3) {
    return value !== (ope1) && value !== (ope2) && value !== (ope3);
};

positive = function(myScreen) {
    return eval(myScreen + "*(-1)");
};
dividepercent = function(myScreen) {
    return eval(myScreen + "/100");
};