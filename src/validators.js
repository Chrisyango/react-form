export const required = value => {
  if (!value) {
    return 'Tracking Number is required';
  }
  return undefined;
}

export const nonEmpty = value => {
  if (value.trim() === '') {
    return 'Tracking Number cannot be empty';
  }
  return undefined;
}

export const valueLength = value => {
  if (value.length !== 5) {
    return 'Tracking Number has to be 5 numbers long'
  }
  return undefined;
}

export const valueNumber = value => {
  const number = isNaN(value);
  if (number) {
    return 'Tracking number is not a number';
  }
  return undefined;
}