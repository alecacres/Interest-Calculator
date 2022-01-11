var print = console.log;

function compute() {
    var result = document.getElementById('result');
    
    var principal = parseInt(document.getElementById('principal').value);
    var rate = parseInt(document.getElementById('rate').value);
    var years = parseInt(document.getElementById('years').value);
    var interest = principal * (Math.pow(1 + rate / 100, years) - 1);
    var year = new Date().getFullYear() + parseInt(years);

    principal = addCommas(principal);
    interest = addCommas(interest);

    var elements = [principal, rate, interest, year].map(highlight);
    [ principal, rate, interest, year ] = elements;

    var output = `If you deposit $${principal} at an interest rate of ${rate}%, you will receive an amount of $${interest} in the year ${year}.`;

    result.innerHTML = output;
}

function padZeroes(input, n) {
    var decimals = input.split('');
    if (n > decimals.length) {
        decimals.fill(0, n - decimals.length);
    } else if (n <= input.length) {
        decimals.splice(n)
    }

    var output = decimals.join('');

    if (output == '00') {
        return ''
    } else {
        return '.' + output;
    }
}

function addCommas(n) {
    var [ integer, decimal ] = n.toString().split('.');
    decimal = decimal ? padZeroes(decimal, 2) : '';
    return integer.split('')
                  .reverse()
                  .map((el, i, array) => (i % 3 === 0 && i > 0 && (i < array.length) ? el + ',' : el))
                  .reverse()
                  .join('') + decimal;
}

function highlight(text) {
    var span = '<span class="highlight">' + text + "</span>";
    return span;
}

function show(el, value) {
    el.innerText = value;
}

function main() {
    var computeButton = document.getElementById('compute');
    var rateResult = document.getElementById('rate_result');
    var rate = document.getElementById('rate');

    computeButton.addEventListener('click', compute);
    rate.addEventListener('change', (event) => {
        value = event.target.value;
        show(rateResult, value)
    });
}

main()
