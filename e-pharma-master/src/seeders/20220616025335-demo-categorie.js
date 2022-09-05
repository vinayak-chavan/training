module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Categories',
    [
      {
        id: '970f5be9-89b4-4322-b31c-7e0d9122957c',
        categoryName: 'Elderly Care',
        categoryImage: 'https://pharmly.s3.amazonaws.com/694057e8-1b81-4786-b886-397c3dd26b23',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '035ad90c-6cb9-4640-9f9a-45bea13c3625',
        categoryName: 'Beauty',
        categoryImage: 'https://pharmly.s3.amazonaws.com/694057e8-1b81-4786-b886-397c3dd26b23',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a19b6c7e-5006-41d4-9d9f-8ac82a4a6175',
        categoryName: 'Diseases',
        categoryImage: 'https://pharmly.s3.amazonaws.com/694057e8-1b81-4786-b886-397c3dd26b23',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Categories', null, {}),
};
