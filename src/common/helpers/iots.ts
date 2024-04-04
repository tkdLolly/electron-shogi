import { Errors } from "io-ts";

export function formatFirstError(errors: Errors): string {
  if (errors.length === 0) {
    return "Unknown error";
  }
  return (
    "Invalid property: " +
    errors[0].context
      .map(({ key }) => key)
      .filter((key) => !/^[0-9]+$/.test(key))
      .join(".")
  );
}
