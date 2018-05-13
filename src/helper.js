export function RomanToArabic(number) {
    if (!number) {
        return '۰';
    }

    let arabicNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    let numbers;
    if (!isNaN(Math.floor(number))) {
        numbers = Math.floor(number).toString().split('');
    } else {
        numbers = number.split('');
    }

    for (var i = 0; i < numbers.length; i++) {
        if (/\d/.test(numbers[i])) {
            numbers[i] = arabicNumbers[numbers[i]];
        }
    }

    return numbers.join('');
}