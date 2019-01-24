export const occurArray = (
  currentList: string[] = [],
  oldList: string[] = [],
) => {
  const removeList = new Array()
  const newList = new Array()
  currentList.map((name: string) => {
    if (name && oldList.indexOf(name) === -1 && newList.indexOf(name) === -1) {
      newList.push(name)
    }
  })

  oldList.map((name: string) => {
    if (
      name &&
      currentList.indexOf(name) === -1 &&
      removeList.indexOf(name) === -1
    ) {
      removeList.push(name)
    }
  })
  return { currentList, removeList, newList }
}
