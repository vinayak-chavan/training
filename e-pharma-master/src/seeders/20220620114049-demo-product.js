module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Products',
    [
      {
        id: 'ed1d34c3-002e-44ea-8f4d-a7701b66123c',
        categoryId: 'a19b6c7e-5006-41d4-9d9f-8ac82a4a6175',
        diseaseId: 'e098110a-36ac-4258-be8b-86ea20d492b2',
        title: 'clonazepam',
        companyName: 'Zydus',
        price: 499,
        productImage: 'https://pharmly.s3.amazonaws.com/4ed8d39d-6b80-4023-809b-74d2111b4edb',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '571ec855-0409-422b-9453-fcc85a7db13b',
        categoryId: '970f5be9-89b4-4322-b31c-7e0d9122957c',
        title: 'Azithromycin',
        companyName: 'Bharat Agro',
        price: 199,
        productImage: 'https://pharmly.s3.amazonaws.com/4ed8d39d-6b80-4023-809b-74d2111b4edb',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f2a44ca2-4443-4f13-9376-3240877696a0',
        categoryId: '035ad90c-6cb9-4640-9f9a-45bea13c3625',
        title: 'Ikkai By Lotus Herbals C The Glow Face Wash',
        companyName: 'Nykaa',
        price: 799,
        productImage: 'https://pharmly.s3.amazonaws.com/4ed8d39d-6b80-4023-809b-74d2111b4edb',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Products', null, {}),
};
