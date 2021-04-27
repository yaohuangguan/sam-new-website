/**
 * redux action划分
 * @param {*} actionType 
 */
export const apiActionSplit = actionType => (
  ['INIT', 'START', 'SUCCESS', 'FAIL']
    .reduce((prev, next) =>
      (prev[next] = actionType + '.' + next) && prev, {})
)