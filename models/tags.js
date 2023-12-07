module.exports = (sequelize, DataTypes) => {
    // 品項標籤表
    const tags = sequelize.define("tags", {
        // 定義各個欄位跟屬性
        tagId: {
            // 品項標籤 id
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, 
        },
        tagName: { 
            // 標籤名稱
            type: DataTypes.STRING, 
            unique: true,
            allowNull: false, 
        },

    }, {
        timestamps: false, // 禁用 createdAt 和 updatedAt 欄位

    }); 
    
     tags.associate = (models) => {
         // 品項標籤表跟品項表: 多對多
        tags.belongsToMany(models.menuitems, {
            through: 'itemtags',
            foreignKey: 'tagId',
            onDelete: "cascade",
            onUpdate: "cascade",
        });
    }; 

    return tags
};