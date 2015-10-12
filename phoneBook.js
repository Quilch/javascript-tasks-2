'use strict';

var phoneBook = [];

module.exports.add = function add(name, phone, email) {
    if (validPhone(phone) && validMail(email)) {
        var tmp = {
            name: name,
            phone: phone,
            email: email
        };
    }
    phoneBook.push(tmp);
};

function validPhone(phone) {
    var phoneRegex = /^(\+?\d{1,2})?\s?(\(\d{3}\)|(\d{3}))\s?(\d{3})(\s|-)?(\d{1})(\s|-)?(\d{3})$/;
    return phoneRegex.test(phone);
}

function validMail(email) {
    var mailRegex = /^(\w)+@[A-Za-zА-Яа-я0-9_-]+\.[A-Za-zА-Яа-я0-9_]+(\.([A-Za-zА-Яа-я0-9_])+)?/;
    return mailRegex.test(email);
}

module.exports.find = function find(query) {
    if (query == null) {
        for (var i = 0; i < phoneBook.length; i++) {
            console.log(phoneBook[i].name + ', ' + phoneBook[i].phone + ', ' + phoneBook[i].email);
        }
    } else {
        var telephoneRegex = /\+|\s|-|\(|\)/g;
        for (var i = 0; i < phoneBook.length; i++) {
            if (phoneBook[i].name.indexOf(query) != -1 ||
                phoneBook[i].phone.replace(telephoneRegex, '').indexOf(query) != -1 ||
                phoneBook[i].email.indexOf(query) != -1) {
                console.log(phoneBook[i].name +
                    ', ' + phoneBook[i].phone +
                    ', ' + phoneBook[i].email);
            }
        }
    }
};

module.exports.remove = function remove(query) {
    var amount = 0;
    var oldBook = phoneBook;
    phoneBook = [];
    var telephoneRegex = /\+|\s|-|\(|\)/g;
    for (var i = 0; oldBook[0] != null; i++) {
        console.log(oldBook[0]);
        if (oldBook[0].name.indexOf(query) != -1 ||
            oldBook[0].phone.replace(telephoneRegex, '').indexOf(query) != -1 ||
            oldBook[0].email.indexOf(query) != -1) {
            oldBook.shift();
            amount++;
        } else {
            if (oldBook[0] != null) {
                phoneBook[i - amount] = oldBook.shift();
            }
        }
    }
    console.log('Recods deleted: ' + amount);
};
