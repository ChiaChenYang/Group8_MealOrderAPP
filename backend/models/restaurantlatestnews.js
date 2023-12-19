module.exports = (sequelize, DataTypes) => {
    // 餐廳最新消息表
    const restaurantlatestnews = sequelize.define("restaurantlatestnews", {
        // 定義各個欄位跟屬性
        newsId: {
            // 消息 id
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, 
        },
        restaurantId: { 
            // 餐廳 id（FK）
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'restaurants', // 表名
                key: 'restaurantId'   // 列名
            },
        },
        newsContent: { 
            // 最新消息內容
            type: DataTypes.STRING, 
            allowNull: false, 
        },
        releaseTime: { 
            // 發布時間
            type: DataTypes.DATE, 
            allowNull: false, 
        },

    }, {
        timestamps: false, // 禁用 createdAt 和 updatedAt 欄位

    });  

    restaurantlatestnews.associate = (models) => {
        // 餐廳最新消息表跟餐廳表: 多對一
        restaurantlatestnews.belongsTo(models.restaurants, {
            foreignKey: 'restaurantId',
            onDelete: "cascade",
            onUpdate: "cascade",
        });
    };  

    return restaurantlatestnews
};