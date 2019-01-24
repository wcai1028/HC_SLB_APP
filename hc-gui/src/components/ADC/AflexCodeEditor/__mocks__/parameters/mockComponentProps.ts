
export default (onAFlexChange: any, hasDiff: boolean = false, isBeforeStyle: boolean = false) => {
  if (hasDiff) {
    return {
      onAFlexChange,
      value: 'test-value',
      options: {
        readOnly: true,
      },
      diff: [
        ['replace', 1, 3, 5, 7],
        ['insert', 1, 3, 5, 7],
        ['delete', 1, 3, 5, 7],
        ['others', 1, 3, 5, 7],
      ],
      version: isBeforeStyle ? 'before' : 'after',
      id: '123456',
    }
  } else {
    return {
      onAFlexChange,
      value: 'test-value',
      options: {
        readOnly: true,
      },
      diff: null,
      version: 'unit_test',
      id: '123456',
    }
  }

}
