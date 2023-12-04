module.exports = (sequelize, DataTypes) => {
    // 訂單表
    const orders = sequelize.define("orders", {
        // 定義各個欄位跟屬性
        orderId: {
            // 訂單 id
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, 
        },
        cartId: {
            // 購物車 id（FK）
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'shoppingcarts', // 表名
                key: 'cartId'   // 列名
            },
        },
        consumerId: {
            // 消費者 id（FK）
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'consumers', // 表名
                key: 'consumerId'   // 列名
            },
        },
        restaurantId: {
            // 餐廳 id（FK）
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'restaurants', // 表名
                key: 'restaurantId'   // 列名
            },
        },
        totalQuantity: {
            // 訂單品項總數量
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        totalPrice: { 
            // 訂單總金額
            type: DataTypes.INTEGER, 
            allowNull: false, 
            defaultValue: 0
        },
        orderTime: { 
            // 訂購時間（使用者按下訂單送出的時間）
            type: DataTypes.DATE, 
            allowNull: false, 
        },
        reservationTime: {
            // 使用者預定取餐的時間
            type: DataTypes.DATE,
            allowNull: false
        },
        orderNote: {
            // 整筆訂單備註，消費者預設備註可放這
            type: DataTypes.STRING,
            allowNull: true,
        },
        expectedFinishedTime: { 
            // 預估製作完畢時間
            type: DataTypes.DATE, 
            allowNull: true, 
        },
        expectedPickupTime: { 
            // 預估取餐時間（目前假設輪動櫃的預購訂單才會用到這個欄位）
            type: DataTypes.DATE, 
            allowNull: true, 
        },
        receivedTime: { 
            // 訂單接收時間
            type: DataTypes.DATE, 
            allowNull: true, 
        },
        finishTime: { 
            // 訂單製作完畢時間
            type: DataTypes.DATE, 
            allowNull: true, 
        },
        completeTime: { 
            // 訂單已取餐時間
            type: DataTypes.DATE, 
            allowNull: true, 
        },
        status: { 
            // 訂單狀態
            type: DataTypes.ENUM('incoming', 'progressing', 'waiting', 'completed', 'rejected'), 
            allowNull: false, 
        },
        paymentMethod: {
            // 付款方式，如信用卡、現金等
            type: DataTypes.STRING(16), 
            allowNull: true, 
        },
        pickupMethod: { 
            // 取餐方式
            type: DataTypes.ENUM('外帶', '內用', '外帶內用'), 
            allowNull: true, 
        },
        orderRating: {
            // 評價
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        timestamps: false, // 禁用 createdAt 和 updatedAt 欄位

    }); 

    orders.associate = (models) => {
        // 訂單跟購物車表: 一對一
        orders.belongsTo(models.shoppingcarts, {
            foreignKey: 'cartId', 
            onDelete: "cascade",
            onUpdate: "cascade",
        });
        // 訂單跟消費者表: 多對一
        orders.belongsTo(models.consumers, {
            foreignKey: 'consumerId', 
            onDelete: "cascade",
            onUpdate: "cascade",
        });
        // 訂單跟餐廳表: 多對一
        orders.belongsTo(models.restaurants, {
            foreignKey: 'restaurantId',
            onDelete: "cascade",
            onUpdate: "cascade",
        });
        // 訂單與菜單品項表: 多對多
        orders.belongsToMany(models.menuitems, {
            through: 'orderitems',
            foreignKey: 'orderId',
            onDelete: "cascade",
            onUpdate: "cascade",
        });
    };
    return orders
};