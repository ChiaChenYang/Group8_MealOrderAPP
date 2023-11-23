module.exports = (sequelize, DataTypes) => {
    // 品項對應菜單類別表
    const itemmenucategories = sequelize.define("itemmenucategories", {
        // 定義各個欄位跟屬性
        itemId: {
            // 品項 id（PK、FK)
            type: DataTypes.INTEGER, 
            primaryKey: true,
            allowNull: false, 
            references: {
                model: 'menuitems', // 表
                key: 'itemId' // 欄位
            },
        },
        menuCategoryId: {
            // 菜單類別 id (PK、FK)
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false, 
            references: {
                model: 'menucategories', // 表
                key: 'menuCategoryId' // 欄位
            },
        },

    }, {
        timestamps: false, // 禁用 createdAt 和 updatedAt 欄位

    });  
    

    return itemmenucategories
};