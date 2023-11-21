module.exports = (sequelize, DataTypes) => {
    // 類別表
    const categories = sequelize.define("categories", {
        // 定義各個欄位跟屬性
        categoryId: {
            // 類別 id
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, 
        },
        categoryName: { 
            // 類別名稱
            type: DataTypes.STRING, 
            unique: true,
            allowNull: false, 
        },

    }, {
        timestamps: false, // 禁用 createdAt 和 updatedAt 欄位

    });  
     
    categories.associate = (models) => {
        // 類別表跟餐廳表: 多對多
        categories.belongsToMany(models.restaurants, {
            through: 'restaurantcategories',
            foreignKey: 'categoryId',
            onDelete: "cascade",
            onUpdate: "cascade",
        });
    };  

    return categories
};