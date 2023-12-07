// // updateDatabase.js

// const { countries, capitals } = require('../models');

// const updateDatabase = async () => {
//   try {

//     // 新增多筆資料
//     const newCapitalsData = [
//     //   { capitalName: 'London' },
//     //   { capitalName: 'Madrid' },
//     //   { capitalName: 'Paris' },
//     //   { capitalName: 'Berlin' },
//       { capitalName: 'Washington, D.C.'},
//       // ... 其他資料
//     ];

//     const newCountriesData = [
//     //   { countryName: 'Spain' },
//     //   { countryName: 'France' },
//     //   { countryName: 'Germany' },
//     //   { countryName: 'England' },
//       { countryName: 'USA'},
//       // ... 其他資料
//     ];

//     // await capitals.bulkCreate(newCapitalsData);
//     // await countries.bulkCreate(newCountriesData);

//     // 更新單筆資料
//     // const capitalData = await capitals.findOne({ where: { capitalName: 'Madrid' } });
//     // const capital = capitalData;
//     // const countryData = await countries.findOne({ where: { countryName: 'Spain' } });
//     // const country = countryData;
//     // 在資料庫找該筆資料是否已經存在
//     const existingCountry = await countries.findOne({
//         where: { countryName: 'Taiwan' }
//     });

//     if (existingCountry) {
//         // 如果已存在，可以使用 existingCountry
//         console.log('Country already exists:', existingCountry.toJSON());
//     } else {
//         // 否則創建新的國家紀錄
//         const countryData = await countries.create({
//             countryName: 'Taiwan'
//         });

//         const country = countryData;
//         console.log('New country created:', country.toJSON());
//     }

    
//     const existingCapital = await capitals.findOne({
//         where: { capitalName: 'Taipei', countryId: existingCountry.countryId }
//     });
    
//     if (existingCapital) {
//         // 如果已存在相同 capitalName 和 countryId，可以使用 existingCapital
//         console.log('Capital already exists:', existingCapital.toJSON());
//     } else {
//         // 否則，創建新的首都紀錄
//         const capitalData = await capitals.create({
//             capitalName: 'Taipei',
//             countryId: countries.countryId
//         });
    
//         const capital = capitalData;
//         console.log('New capital created:', capital.toJSON());
//     }
    
    
//     console.log(capitalData.toJSON());
//     // capital.setCountry(country);

//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports = updateDatabase;
