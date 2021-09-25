'use strict';
module.exports = {
  get: () => {
    return Promise.resolve({
      data: [
        {
            name: "Pitajayas",
            country: "Ecuador",
            cost: 3,
            instock: 10
        },
        {
            name: "Bananas",
            country: "Ecuador",
            cost: 4,
            instock: 3
        },
        {
            name: "Chocolates",
            country: "Ecuador",
            cost: 1,
            instock: 8
        }
      ]
    });
  }
};