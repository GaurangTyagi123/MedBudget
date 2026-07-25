export const parseData = (medicineData: string, numCols: number) => {
  const data = JSON.parse(medicineData)
  const parsedData: Record<string, string>[] = []
  let iter = 0
  let temp: Record<string, string> = {}
  for (const field in data) {
    temp[field] = data[field]
    if (iter != 0 && (iter + 1) % numCols == 0) {
      parsedData.push(temp)
      temp = {}
    }
    ++iter
  }
  return parsedData
}
export const formatCurrency = (currency: number) => {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'INR',
  }).format(currency)
}

export const calculateTotal = (
  medicines: Array<Record<string, string>>,
  order: Record<string, number>,
  days: number,
): Array<{
  Name: string
  needed: number
  Price: number
}> => {
  const totalArray = medicines.map((medicine, index) => {
    const perDay = !index
      ? medicine.quantityPerDose
      : medicine[`quantityPerDose-${index}`]
    const perPack = !index
      ? medicine.quantityPerPack
      : medicine[`quantityPerPack-${index}`]
    const Price = !index
      ? medicine.medicinePrice
      : medicine[`medicinePrice-${index}`]
    const name = !index
      ? medicine.medicineName
      : medicine[`medicineName-${index}`]

    const left = Math.round(days - Number(order[name] / Number(perDay)))
    let needed = left * Number(perDay)
    needed = Math.ceil(needed / Number(perPack))
    return { Name: name, needed, Price: needed * Number(Price) }
  })
  return totalArray
}

export const createHash = async (str: string): Promise<string> => {
  const utf8 = new TextEncoder().encode(str)
  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  return hashArray.map((bytes) => bytes.toString(16).padStart(2, '0')).join('')
}
