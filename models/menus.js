module.exports = (sequelize, DataTypes) => {
    // 菜單表
    const menus = sequelize.define("menus", {
        // 定義各個欄位跟屬性
        menuId: {
            // 菜單 id
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, 
        },
        restaurantId: {
            // 餐廳 id (FK)
            type: DataTypes.INTEGER,
            references: {
                model: 'restaurants', // 表名
                key: 'restaurantId'   // 列名
            },
            allowNull: true,
        },
        menuName: { 
            // 菜單名稱
            type: DataTypes.STRING, 
            allowNull: false, 
        },
        menuTime: {
            // 菜單提供時段
            type: DataTypes.ENUM('午段', '晚段', '全日'), 
            allowNull: false, 
        },
        menuType: {
            // 菜單類型，輪動櫃為預購，其他為即時供應
            type: DataTypes.ENUM('預購', '非預購'), 
            allowNull: true, 
        },
        
    },{
        timestamps: false, // 禁用 createdAt 和 updatedAt 欄位

    });

    menus.associate = (models) => {
        // 菜單表跟餐廳表: 多對一
        menus.belongsTo(models.restaurants, {
            foreignKey: 'restaurantId',
            onDelete: "cascade",
            onUpdate: "cascade"
        });
        // 菜單跟菜單類別表: 一對多
        menus.hasMany(models.menucategories, {
            foreignKey: 'menuId',
            onDelete: "cascade",
            onUpdate: "cascade",
        });
        // 菜單與菜單品項: 一對多
        menus.hasMany(models.menuitems, {
            foreignKey: 'menuId',
            onDelete: "cascade",
            onUpdate: "cascade"
        });
    };

    return menus
};