function classBySales(salesDollars) {
  if(salesDollars < 2000000){
    return "lowSales";
  } else if(salesDollars < 10000000) {
    return "avgSales";
  } else {
    return "highSales";
  }
}

/*
  demographics -> array
  sales -> array
  keys -> array
*/
function sumSales(demographics, sales, keys) {
  // take the demographics strings in demographics and figure out what index in sales
  // contains the corresponding demographics data
  var salesIndicesArr = demographics.map(function(val){
    return keys.indexOf(val);
  });

  // sum the sales value corresponding to each index in salesIndices
  return salesIndicesArr.reduce(function(prev, current){
    return prev + sales[current];
  }, 0);
}

export function getD3ClassFunction(demographics){
  return function getSalesClass(d) {

    // return the sales class style based on total sales of the demographic categories selected
    var salesDollars = sumSales(demographics, d.sales, d.saleKeys);
    return classBySales(salesDollars);
  }
}
