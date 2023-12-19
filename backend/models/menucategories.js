module.exports = (sequelize, DataTypes) => {
    // 菜單類別表
    const menucategories = sequelize.define("menucategories", {
        // 定義各個欄位跟屬性
        menuCategoryId: {
            // 菜單類別 id
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
        menuCategoryName: { 
            // 菜單類別名稱
            type: DataTypes.STRING, 
            allowNull: false, 
        },

    }, {
        timestamps: false, // 禁用 createdAt 和 updatedAt 欄位

    });  
    
   
    menucategories.associate = (models) => {
        // 菜單類別表跟菜單表: 多對一
        menucategories.belongsTo(models.menus, {
            foreignKey: 'menuId',
            onDelete: "cascade",
            onUpdate: "cascade",
        });
        // 菜單類別表跟品項表: 多對多
        menucategories.belongsToMany(models.menuitems, {
            through: 'itemmenucategories',
            foreignKey: 'menuCategoryId',
            onDelete: "cascade",
            onUpdate: "cascade",
        });
    };  

    return menucategories
};