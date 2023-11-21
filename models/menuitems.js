module.exports = (sequelize, DataTypes) => {
    // 菜單品項表
    const menuitems = sequelize.define("menuitems", {
        // 定義各個欄位跟屬性
        itemId: {
            // 菜單品項 id
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, 
        },
        menuId: {
            // 菜單 id (FK)
            type: DataTypes.INTEGER,
            references: {
                model: 'menus', // 表名
                key: 'menuId'   // 列名
            },
            allowNull: false,
        },
        itemName: { 
            // 品項名稱
            type: DataTypes.STRING, 
            allowNull: false, 
        },
        itemImage: {
            // 品項圖片
            type: DataTypes.BLOB('long'), 
            allowNull: false, 
        },
        descriptionText: {
            // 品項描述
            type: DataTypes.STRING, 
            allowNull: true, 
        },
        calories: {
            // 品項熱量
            type: DataTypes.INTEGER, 
            allowNull: false, 
        },
        prepareTime: {
            // 品項準備時間
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            // 品項價格
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isAvailable: {
            // 是否可售
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        availableQuantity: {
            // 可售數量
            type: DataTypes.INTEGER,
            allowNull: false,
        }

        
    },{
        timestamps: false, // 禁用 createdAt 和 updatedAt 欄位

    });
     
    menuitems.associate = (models) => {
        // 菜單品項與菜單: 多對一關聯
        menuitems.belongsTo(models.menus, {
            foreignKey: 'menuId',
            onDelete: "cascade",
            onUpdate: "cascade"
        });
        // 菜單品項與菜單類別: 多對多關聯
        menuitems.belongsToMany(models.menucategories, {
            through: 'itemmenucategories',
            foreignKey: 'itemId',
            onDelete: "cascade",
            onUpdate: "cascade",
        }); 
        // 菜單品項與品項標籤: 多對多
        menuitems.belongsToMany(models.tags, {
            through: 'itemtags',
            foreignKey: 'itemId',
            onDelete: "cascade",
            onUpdate: "cascade",
        }); 
        // 菜單品項與購物車: 多對多
        menuitems.belongsToMany(models.shoppingcarts, {
            through: 'cartitems',
            foreignKey: 'itemId',
            onDelete: "cascade",
            onUpdate: "cascade",
        });
        // 菜單品項與訂單: 多對多
        menuitems.belongsToMany(models.orders, {
            through: 'orderitems',
            foreignKey: 'itemId',
            onDelete: "cascade",
            onUpdate: "cascade",
        }); 
    }; 


    return menuitems
};