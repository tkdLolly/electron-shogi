import { Errors } from "io-ts";
import { not } from "fp-ts/Predicate";
import { isEmpty } from "fp-ts/string";

export function formatErrors(errors: Errors) {
  return errors.map((e) =>
    e.context
      .map(({ key }) => key)
      .filter(not(isEmpty))
      .join("."),
  );
}
