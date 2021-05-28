import { convertVolume } from '../../actions/convert-volume'

test('should set volume to 0', () => {
  expect(convertVolume(10)).toBe(0)
})

test('should set volume to -25', () => {
  expect(convertVolume(5)).toBe(-25)
})

test('should set volume to -50', () => {
  expect(convertVolume(0)).toBe(-50)
})
