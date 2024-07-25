let currency = new Intl.NumberFormat();
function convertFromCurrency(val) {
  const number = Number(val.replace(/[^0-9.-]+/g, ""));
  return number;
}
function convertToCurrency(val) {
  return `Rp${currency.format(val)}.00`;
}

function checkBahanAndMesin(toko, bahan, mesin) {
  let untung = 0;
  if (bahan?.sum < toko?.sum) {
    return 0;
  } else {
    const saleTotal = toko?.sum * convertFromCurrency(toko?.price);
    const modal = toko?.sum * convertFromCurrency(bahan?.price);
    mesin.forEach((valMesin) => {
      let maintenance = 0;
      if (valMesin?.sum <= toko?.sum) {
        maintenance =
          Math.floor(toko?.sum / valMesin?.sum) *
          convertFromCurrency(valMesin.price) *
          10;
      }

      const productCost = toko?.sum * convertFromCurrency(valMesin.price);

      const total = saleTotal - modal - productCost - maintenance;
      untung = untung < total ? total : untung;
    });
  }
  return untung > 0 ? untung : 0;
}

function checkBenefit() {
  let toko = [
    { sum: 10, price: "Rp20,000.00" },
    { sum: 5, price: "Rp50,000.00" },
    { sum: 6, price: "Rp15,000.00" },
  ];

  let bahan = [
    { sum: 10, price: "Rp10,000.00" },
    { sum: 25, price: "Rp12,500.00" },
  ];

  const mesin = [
    { sum: 5, price: "Rp1,500.00" },
    { sum: 15, price: "Rp3,000.00" },
  ];
  let benefit = 0;
  //   toko = toko.sort(
  //     (a, b) =>
  //       convertFromCurrency(b.price) * b.sum -
  //       convertFromCurrency(a.price) * a.sum
  //   );
  //   console.log(toko);
  toko.forEach((valToko) => {
    let temp = [];
    bahan.forEach((valBahan, idx) => {
      //   console.log(valBahan);
      const res = checkBahanAndMesin(valToko, valBahan, mesin);
      temp.push(res);
    });
    var indexOfMaxValue = temp.reduce(
      (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
      0
    );
    // console.log(bahan);
    bahan[indexOfMaxValue].sum = bahan[indexOfMaxValue].sum - valToko.sum;
    benefit = benefit + temp[indexOfMaxValue];
  });
  return benefit;
}

console.log(
  `Keuntungan terbesar yang bisa didapat adalah: ${convertToCurrency(
    checkBenefit()
  )}`
);
