module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Users',
    [
      {
        id: '970f5be9-89b4-4322-b31c-7e0d9122957c',
        firstName: 'john',
        lastName: 'william',
        email: 'johnwilliam@gmail.com',
        password: '$2b$10$WSJcPzH.OtTU6n6QdXzRw.MYhB1D2aaPQ9ywOQ3BLaCYq2wizY4Wi', // password in fname@123 formate
        isArchived: false,
        contactNo: '9876785987',
        isAdmin: false,
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '035ad90c-6cb9-4640-9f9a-45bea13c3625',
        firstName: 'sara',
        lastName: 'william',
        email: 'sarawilliam@gmail.com',
        password: '$2b$10$WSJcPzH.OtTU6n6QdXzRw.MYhB1D2aaPQ9ywOQ3BLaCYq2wizY4Wi', // password in fname@123 formate
        isArchived: false,
        contactNo: '9876785980',
        isAdmin: false,
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3e7c293e-74db-45f0-8a5f-1e48b0f240fe',
        firstName: 'Apexa',
        lastName: 'Patel',
        email: 'pharmly.bacancy@gmail.com',
        password: '$2b$10$b6dtMIQNJKbeU69IY.WJFOxQ7DJrvfuU0yGVY2RTqCEjIEmaDP1MK', // pharmly@123
        isArchived: false,
        contactNo: '7265056317',
        isAdmin: true,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
