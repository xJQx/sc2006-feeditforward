/**
 * Searches for and filters out items with matching `query` from an `array`.
 * The `searchKeys` are used to find the items that contain the `query`.
 * @param array Array to search in.
 * @param query A search query to be used.
 * @param searchKeys A list of keys (in an object) to be used to find items that contain the `query`.
 *
 * @returns An array of filtered objects. Array may be empty.
 */
export const simpleSearch = (
  array: any[],
  query: string,
  searchKeys: string[]
): any[] => {
  let filteredArray = array;

  filteredArray = filteredArray.filter(item =>
    searchKeys.some(
      searchKey =>
        item[searchKey] &&
        typeof item[searchKey] === "string" &&
        item[searchKey].toLowerCase().includes(query.toLowerCase())
    )
  );

  return filteredArray;
};
