module.exports = (sequelize, DataTypes) => {
    // 訂單品項表
    const orderitems = sequelize.define("orderitems", {
        // 定義各個欄位跟屬性
        orderItemId: {
            // 訂單品項 id
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, 
        },
        itemId: {
            // 品項 id（FK）
            type: DataTypes.INTEGER, 
            references: {
                model: 'menuitems', // 表名
                key: 'itemId'   // 列名
            },
            allowNull: false,
        },
        orderId: {
            // 訂單 id (FK)
            type: DataTypes.INTEGER,
            references: {
                model: 'orders', // 表名
                key: 'orderId'   // 列名
            },
            allowNull: false,
        },
        orderQuantity: {
            // 數量
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        orderItemNote: {
            // 餐點備註
            type: DataTypes.STRING,
            allowNull: true,
        }, 
        
    },{
        timestamps: false, // 禁用 createdAt 和 updatedAt 欄位

    });
     
    return orderitems
};