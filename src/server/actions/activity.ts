'use server'

export const addActivity = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  console.log(data)
  return data
}
