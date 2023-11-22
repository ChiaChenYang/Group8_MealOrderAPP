module.exports = (sequelize, DataTypes) => {
    // 品項對應品項標籤表
    const itemtags = sequelize.define("itemtags", {
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
        tagId: {
            // 品項標籤 id (PK、FK)
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false, 
            references: {
                model: 'tags', // 表
                key: 'tagId' // 欄位
            },
        },

    }, {
        timestamps: false, // 禁用 createdAt 和 updatedAt 欄位

    });  

    return itemtags
};