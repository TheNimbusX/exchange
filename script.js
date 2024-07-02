const rates = {};

const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementCNY = document.querySelector('[data-value="CNY"]');

const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');
const select_right = document.querySelector('#select_right');

getCurrencies();
async function getCurrencies() {
  const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  const data = await response.json();
  const result = await data;

  rates.USD = result.Valute.USD;
  rates.EUR = result.Valute.EUR;
  rates.CNY = result.Valute.CNY;

  console.log(rates);

  elementUSD.textContent = rates.USD.Value.toFixed(2);
  elementEUR.textContent = rates.EUR.Value.toFixed(2);
  elementCNY.textContent = rates.CNY.Value.toFixed(2);

  if (rates.USD.Value < rates.USD.Previous) {
    elementUSD.classList.add('top');
  } else {
    elementUSD.classList.add('bottom');
  }

  if (rates.EUR.Value < rates.EUR.Previous) {
    elementEUR.classList.add('top');
  } else {
    elementEUR.classList.add('bottom');
  }

  if (rates.CNY.Value < rates.CNY.Previous) {
    elementCNY.classList.add('top');
  } else {
    elementCNY.classList.add('bottom');
  }
}

window.onload = function () {
  $.getJSON('https://www.cbr-xml-daily.ru/daily_json.js', function (data) {
    let s1 = data.Valute.USD.Value;
    let s2 = data.Valute.EUR.Value;
    let s3 = data.Valute.CNY.Value;
    let c = { USD: s1, EUR: s2, CNY: s3, RUB: '1' };

    let val = document.getElementById('val');
    let currency1 = document.getElementById('cur1');
    let currency2 = document.getElementById('cur2');
    let result = document.getElementById('result');
    function summ() {
      let z = 0;
      if (currency1.value === currency2.value) {
        result.value = val.value;
      } else {
        if (currency1.value != 'RUB') {
          z = val.value * c[currency1.value];
          result.value = Math.ceil((z / c[currency2.value]) * 100) / 100;
        } else {
          result.value =
            Math.ceil((val.value / c[currency2.value]) * 100) / 100;
        }
      }
    }

    function summ2() {
      let z = 0;
      if (currency1.value === currency2.value) {
        val.value = result.value;
      } else {
        if (currency1.value != 'RUB') {
          z = result.value * c[currency1.value];
          val.value = Math.ceil((z / c[currency2.value]) * 100) / 100;
        } else {
          val.value = Math.ceil(result.value * c[currency2.value] * 100) / 100;
        }
      }
    }

    val.oninput = function () {
      summ();
    };
    currency1.onchange = function () {
      summ();
    };
    currency2.onchange = function () {
      summ();
    };
    result.oninput = function () {
      summ2();
    };
  });
};
