'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // queryInterface.renameColumn 方法是用於重命名一個指定表中的一個指定列。
    await queryInterface.renameColumn('menus', 'menuid', 'menuId');
    await queryInterface.renameColumn('menus', 'menuname', 'menuName');
    await queryInterface.renameColumn('menus', 'menutype', 'menuType');

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.renameColumn('menus', 'menuId', 'menuid');
    await queryInterface.renameColumn('menus', 'menuName', 'menuname');
    await queryInterface.renameColumn('menus', 'menuType', 'menutype');
  }
};
