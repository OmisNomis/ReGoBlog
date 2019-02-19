
const splitArrayToChunks = (arr, size) => {
  var myArray = []
  for (var i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i + size))
  }
  return myArray
}

const uppercaseFirstLetter = word => word[0].toUpperCase() + word.slice(1)

module.exports = {
  splitArrayToChunks,
  uppercaseFirstLetter
}
