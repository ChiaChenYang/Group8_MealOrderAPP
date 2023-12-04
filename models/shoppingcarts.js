module.exports = (sequelize, DataTypes) => {
    // 購物車表
    const shoppingcarts = sequelize.define("shoppingcarts", {
        // 定義各個欄位跟屬性
        cartId: {
            // 購物車 id
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, 
        },
        consumerId: {
            // 消費者 id（FK）
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'consumers', // 表名
                key: 'consumerId'   // 列名
            },
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
        cartNote: {
            // 整筆訂單備註，消費者預設備註可放這
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            // 總價錢
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        quantity: {
            // 總數量
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        /*totalPrepareTime: { 
            // 預估製作完畢時間，可透過品項的準備時間推算
            type: DataTypes.INTEGER, 
            allowNull: false,
            defaultValue: 0
        },*/
        reservationTime: {
            type: DataTypes.DATE,
            allowNull: true
        },
        checkout: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        } 
    }, {
        timestamps: false, // 禁用 createdAt 和 updatedAt 欄位

    }); 
    
    shoppingcarts.associate = (models) => {
        // 購物車跟消費者表: 多對一
        shoppingcarts.belongsTo(models.consumers, {
            foreignKey: 'consumerId', 
            onDelete: "cascade",
            onUpdate: "cascade",
        });
        // 購物車跟餐廳表: 多對一
        shoppingcarts.belongsTo(models.restaurants, {
            foreignKey: 'restaurantId',
            onDelete: "cascade",
            onUpdate: "cascade",
        });
        // 購物車與菜單品項: 多對多
        shoppingcarts.belongsToMany(models.menuitems, {
            through: 'cartitems',
            foreignKey: 'cartId',
            onDelete: "cascade",
            onUpdate: "cascade",
        }); 
        // 購物車與訂單表: 一對一
        shoppingcarts.hasOne(models.orders, {
            foreignKey: 'cartId',
            onDelete: "cascade",
            onUpdate: "cascade",
        });
    };
    
    return shoppingcarts
};