export const commit = (state, path, value) => {
  let obj = state;
  let i;
  const parts = path.split('.');
  for (i = 0; i < (parts.length - 1); ++i) {
    obj = obj[parts[i]];
  }
  obj[parts[i]] = value;
};
