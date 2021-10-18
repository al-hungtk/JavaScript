function insertCharacter(char) {
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
    $('.displaytotal').val('');

}

function deleteCharacter() { // lùi lại
    let currentValue = $('.inputDisplay').val();
    $('.inputDisplay').val(currentValue.substring(0, currentValue.length - 1));
}

function numberCharacter() {
    $('.inputDisplay').val($('.inputDisplay').val() * (-1));
}

function result() {
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

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();

document.getElementById("hvn").innerHTML = time;