export const setNumberPagination = (val: number) => {
  return {
    type: "CURRENT_PAGE",
    payload: val,
  };
};
