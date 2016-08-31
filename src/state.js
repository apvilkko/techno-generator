export const commit = (state, path, value) => {
  let obj = state;
  let i;
  const parts = typeof path === 'string' ? path.split('.') : path;
  for (i = 0; i < (parts.length - 1); ++i) {
    obj = obj[parts[i]];
  }
  obj[parts[i]] = value;
};
