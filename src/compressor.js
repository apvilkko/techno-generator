import {connect} from './util';

export const createCompressor = ({context, destination}) => {
  const node = context.createDynamicsCompressor();
  node.threshold.value = -10;
  node.knee.value = 6;
  node.ratio.value = 4;
  //node.reduction.value = -10;
  node.attack.value = 0.002;
  node.release.value = 0.2;
  if (destination) {
    connect(node, destination);
  }
  return node;
};
