export const convertVolume = volume => {
  const max = 0
  const min = -50
  const diff = Math.abs(max - min)
  const percentage = (volume * 10) / 100

  return percentage * diff + min
}
