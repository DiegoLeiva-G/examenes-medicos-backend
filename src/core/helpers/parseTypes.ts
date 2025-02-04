export const parseStringBoolean = (value: string | undefined): boolean | undefined => {
  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  return undefined;
};

export const parseStringNumber = (value: string | undefined): number | undefined => {
  const parsedValue = Number(value);

  return isNaN(parsedValue) ? undefined : parsedValue;
};

export const parseStringToBigInt = (input: string | null | undefined): bigint | undefined => {
  if (!input) {
    return undefined;
  }

  try {
    return BigInt(input);
  } catch (error) {
    return undefined;
  }
};

export const parseStringToStringArray = (input: string | null | undefined): string[] | undefined => {
  if (!input) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(input);

    if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
      return parsed;
    }
  } catch (error) {}

  return undefined;
};

export const parseStringToNumberArray = (input: string | null | undefined): number[] | undefined => {
  if (!input) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(input);

    if (Array.isArray(parsed) && parsed.every(item => typeof item === 'number')) {
      return parsed;
    }
  } catch (error) {}

  return undefined;
};

export const parseISOStringToDate = (input: string | null | undefined): Date | undefined => {
  if (!input) {
    return undefined;
  }

  const date = new Date(input);

  if (!isNaN(date.getTime()) && input === date.toISOString()) {
    return date;
  }

  return undefined;
};
