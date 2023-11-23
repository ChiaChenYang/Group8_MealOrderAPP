module.exports = (sequelize, DataTypes) => {
    // 餐廳類別表
    const restaurantcategories = sequelize.define("restaurantcategories", {
        // 定義各個欄位跟屬性
        restaurantId: {
            // 餐廳 id
            type: DataTypes.INTEGER, 
            primaryKey: true,
            allowNull: false, 
            references: {
                model: 'restaurants', // 表
                key: 'restaurantId' // 欄位
            },
        },
        categoryId: { 
            // 類別 id
            type: DataTypes.INTEGER, 
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'categories', // 表
                key: 'categoryId' // 欄位
            }, 
        },

    }, {
        timestamps: false, // 禁用 createdAt 和 updatedAt 欄位

    });  
  

    return restaurantcategories
};