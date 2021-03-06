'use strict';

var phoneBook = [];

module.exports.add = function add(name, phone, email) {
    var telephoneRegex = /\+|\s|-|\(|\)/g;
    if (validPhone(phone) && validMail(email)) {
        var tmp = {
            name: name,
            phone: phone.replace(telephoneRegex, ''),
            email: email

        };
        phoneBook.push(tmp);
    }
};

function validPhone(phone) {
    var phoneRegex = /^(\+?\d{1,2})?\s?(\(\d{3}\)|(\d{3}))\s?(\d{3})(\s|-)?(\d{1})(\s|-)?(\d{3})$/;
    return phoneRegex.test(phone);
}

function validMail(email) {
    var mailRegex = /^(\w)+@[A-Za-zА-Яа-я0-9_-]+\.[A-Za-zА-Яа-я0-9_]+(\.([A-Za-zА-Яа-я0-9_])+)?/;
    return mailRegex.test(email);
}

function makeGoodPhone(phone) {
    if (phone.length === 10) {
        phone = '7' + phone;
    }
    if (phone.length === 11) {
        phone = '+' + phone.substr(0, 1) + ' (' +
            phone.substr(1, 3) + ') ' + phone.substr(4, 3) + '-' +
            phone.substr(7, 1) + '-' + phone.substr(8, 3);
    }
    if (phone.length === 12) {
        phone = '+' + phone.substr(0, 2) + ' (' +
            phone.substr(2, 3) + ') ' + phone.substr(5, 3) + '-' +
            phone.substr(8, 1) + '-' + phone.substr(9, 3);
    }
    return phone;
}

module.exports.find = function find(query) {
    if (!query) {
        for (var i = 0; i < phoneBook.length; i++) {
            console.log(phoneBook[i].name + ', ' +
                makeGoodPhone(phoneBook[i].phone) + ', ' + phoneBook[i].email);
        }
    } else {
        var telephoneRegex = /\+|\s|-|\(|\)/g;
        for (var i = 0; i < phoneBook.length; i++) {
            if (phoneBook[i].name.indexOf(query) != -1 ||
                phoneBook[i].phone.indexOf(query.replace(telephoneRegex, '')) != -1 ||
                phoneBook[i].email.indexOf(query) != -1) {
                console.log(phoneBook[i].name +
                    ', ' + makeGoodPhone(phoneBook[i].phone) +
                    ', ' + phoneBook[i].email);
            }
        }
    }
};

module.exports.remove = function remove(query) {
    var amount = 0;
    var telephoneRegex = /\+|\s|-|\(|\)/g;
    var i = 0;
    while (phoneBook[i] != null) {
        if (phoneBook[i].name.indexOf(query) != -1 ||
            phoneBook[i].phone.indexOf(query.replace(telephoneRegex, '')) != -1 ||
            phoneBook[i].email.indexOf(query) != -1) {
            phoneBook.splice(i, 1);
            amount++;
        } else {
            i++;
        }
    }
    console.log('Records deleted: ' + amount);
};

/*
+7 (111) 777-2-222
+7 (111) 777 2 222
+7 111 777-2-222
7 111 777-2-222
111 777-2-222
71117772222
+34 111 777-2-222

71117772222
71117772222
71117772222
71117772222   11
1117772222    10
71117772222
341117772222  12

+7 (111) 777-2-222
+34 (111) 777-2-222
*/
