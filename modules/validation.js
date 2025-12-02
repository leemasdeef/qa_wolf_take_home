function isSortedByAge(array) {
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

  for (let i = 0; i < array.length - 1; i++) {
    const isIsoString = iso8601Regex.test(array[i].age);
    let log = "";
    // handle missing/broken string
    if (!isIsoString) {
      console.warn(
        `There is a problem with the date on element with id: ${array[i].id}`
      );
      continue;
    }
    if (array[i].age < array[i + 1].age) {
      return false;
    }
  }
  return true;
}

//

module.exports = { isSortedByAge };
