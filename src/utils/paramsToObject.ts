/* eslint-disable @typescript-eslint/no-explicit-any */
// Utility function to convert URLSearchParams to an object
export const paramsToObject = (
  paramStr: URLSearchParams
): Record<string, any> => {
  const result: Record<string, any> = {};
  for (const [key, value] of paramStr.entries()) {
    result[key] = value;
  }
  return result;
};
