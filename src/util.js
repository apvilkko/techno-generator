export const connect = (from, to) => {
  console.log(
    'connect',
    Object.prototype.toString.call(from),
    'to',
    Object.prototype.toString.call(to)
  );
  from.connect(to);
};

export const disconnect = (node, from) => {
  if (from) {
    console.log(
      'disconnect',
      Object.prototype.toString.call(node),
      'from',
      Object.prototype.toString.call(from)
    );
    node.disconnect(from);
    return;
  }
  console.log(
    'disconnect',
    Object.prototype.toString.call(node)
  );
  node.disconnect();
};

export const randRange = (min, max) =>
  min + Math.floor(Math.random() * (max - min + 1));

export const rand = value => Math.random() < (value / 100.0);
