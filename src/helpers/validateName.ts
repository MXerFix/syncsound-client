export const validateName = (name: string) => {
  const name_array = name.split(' ')
  return (name_array.length === 3 && name_array[0].length > 1 && name_array[1].length > 1 && name_array[2].length > 3)
}