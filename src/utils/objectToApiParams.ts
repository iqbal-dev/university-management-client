/* eslint-disable @typescript-eslint/no-explicit-any */

export const objectToApiParams = (queryParams: Record<string, any>) => {
  return Object.entries(queryParams).map(([name, value]) => ({ name, value }));
};
