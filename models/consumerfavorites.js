module.exports = (sequelize, DataTypes) => {
    // 消費者最愛餐廳表
    const consumerfavorites = sequelize.define("consumerfavorites", {
        // 定義各個欄位跟屬性
        consumerId: {
            // 消費者 id（PK、FK)
            type: DataTypes.INTEGER, 
            primaryKey: true,
            allowNull: false, 
            references: {
                model: 'consumers', // 表
                key: 'consumerId' // 欄位
            },
        },
        restaurantId: {
            // 餐廳 id (PK、FK)
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false, 
            references: {
                model: 'restaurants', // 表
                key: 'restaurantId' // 欄位
            },
        },

    }, {
        timestamps: false, // 禁用 createdAt 和 updatedAt 欄位

    });  

    return consumerfavorites
};