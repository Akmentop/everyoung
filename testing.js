
const NAME_LIST = [
    ['David Smith', '大卫斯密斯'],
    ['Yueling Zhang', '月林张'],
    ['Huawen Wu', '华文吴'],
    ['Annie Lee', '安妮李'],
]

function isEnglishName(name) {
    return /^[a-zA-Z ]*$/.test(name);
    }


function checkEnglishName(input) {
    let first_part = input.substring(0, input.indexOf(' '));
    let second_part = input.substring(input.indexOf(' ') + 1);

    let res = '';

    for (let nlist of NAME_LIST) {
        let t1 = first_part.concat(' ', second_part);
        
        if (t1.toLocaleLowerCase() === nlist[0].toLowerCase()) {
            res = nlist[0].concat('|', nlist[1]);
            break;
        } else {
            let t2 = second_part.concat(' ', first_part);
            if (t2.toLocaleLowerCase() === nlist[0].toLowerCase()) {
                res = nlist[0].concat('|', nlist[1]);
                break;
            }
        } 
    }

    return res;
}


function checkChineseName(input) {
    let first_part, second_part, res;

    if (input.includes(' ')) {
        first_part = input.substring(0, input.indexOf(' '));
        second_part = input.substring(input.indexOf(' ') + 1);
    } else {
        first_part = input[0];
        second_part = input.slice(1, input.length);
    }

    for (let nlist of NAME_LIST) {
        let t1 = first_part.concat('', second_part);
        
        if (t1 === nlist[1]) {
            res = nlist[0].concat('|', nlist[1]);
            break;
        } else {
            let t2 = second_part.concat('', first_part);
            if (t2 === nlist[1]) {
                res = nlist[0].concat('|', nlist[1]);
                break;
            }
        } 
    }

    return res;
}


function searchForName(input) {
    let res = '';

    if (isEnglishName(input)) {
        res = checkEnglishName(input);
    }
    else {
        res = checkChineseName(input);
    }

    if (res) {
        console.log(res)
    } else {
        console.log('no name found')
    }
}
