const {add, promiseTest, arr} = require('../index');
const {app} = require('../dummyAPI');
const supertest = require('supertest');

test('toBe', () => {
  expect(add(1,2)).toBe(3)
})

test('toBeNull', () => {
  expect(add(1,2)).not.toBeNull()
})

test('toBeGreaterThan', () => {
  expect(add(1,2)).toBeGreaterThan(1)
})

test('toBeLessThanOrEqual', () => {
  expect(add(1,2)).toBeLessThanOrEqual(3)
})

test('toMatch', () =>{
  expect(add('vinayak', 'chavan')).toMatch(/nayak/)
})

test('promiseTest', () =>{
  promiseTest(1,2)
  .then(data => {
    expect(data).toBe('positive')
  })
  .catch(err => {
    expect(err).toBe('negative')
  })
})

test('array toConatin', () => {
	expect(arr()).toContain('bat');
})
