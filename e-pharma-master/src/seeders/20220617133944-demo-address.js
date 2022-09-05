module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Addresses',
    [
      {
        id: '35a96123-36c9-41f6-9aca-c7adad29563d',
        userId: '970f5be9-89b4-4322-b31c-7e0d9122957c',
        address: '13, andheri',
        area: 'andheri area',
        city: 'mumbai',
        pincode: '310310',
        isArchived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '7bb28eba-7f5a-4a85-b84c-5c248c2f0874',
        userId: '035ad90c-6cb9-4640-9f9a-45bea13c3625',
        address: '15, virar',
        area: 'virar area',
        city: 'mumbai',
        pincode: '311311',
        isArchived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Addresses', null, {}),
};
