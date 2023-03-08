export const removeItemFromArray = <T>(array: T[], item: T) => {
  const indexOfItem = array.findIndex((items) => items === item);
  array.splice(indexOfItem, 1);
};
