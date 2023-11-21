module.exports = (sequelize, DataTypes) => {
    // 購物車品項表
    const cartitems = sequelize.define("cartitems", {
        // 定義各個欄位跟屬性
        cartItemId: {
            // 購物車品項 id
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
        cartId: {
            // 購物車 id (FK)
            type: DataTypes.INTEGER,
            references: {
                model: 'shoppingcarts', // 表名
                key: 'cartId'   // 列名
            },
            allowNull: false,
        },
        cartQuantity: {
            // 數量
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cartItemNote: {
            // 餐點備註
            type: DataTypes.STRING,
            allowNull: true,
        }, 
        
    },{
        timestamps: false, // 禁用 createdAt 和 updatedAt 欄位

    });
     
    return cartitems
};