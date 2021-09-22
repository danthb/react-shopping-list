//axios


'use strict';
module.exports = {
  get: () => {
    return Promise.resolve({
      data: [
        {
            id: 1,
            name: "Pitajayas",
            country: "Ecuador",
            cost: 3,
            instock: 10
        },
        {
            id: 2,
            name: "Bananas",
            country: "Ecuador",
            cost: 4,
            instock: 3
        },
        {
            id: 4,
            name: "Chocolates",
            country: "Ecuador",
            cost: 1,
            instock: 8
        }
      ]
    });
  }
};