module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Diseases',
    [
      {
        id: '6ccba2c8-1cdd-4e35-b61b-d00117086bec',
        categoryId: 'a19b6c7e-5006-41d4-9d9f-8ac82a4a6175',
        diseaseName: 'Allergies',
        diseaseDescription: 'A food allergy, Hay fever, An insect sting allergy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'e098110a-36ac-4258-be8b-86ea20d492b2',
        categoryId: 'a19b6c7e-5006-41d4-9d9f-8ac82a4a6175',
        diseaseName: 'Anxiety',
        diseaseDescription: 'Impaired control, social problems, making excuses',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Categories', null, {}),
};
