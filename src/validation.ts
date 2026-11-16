import * as Yup from "yup";

const REQUIRED = "This field is required";

// One or more letters (accents, apostrophes, hyphens and periods allowed), e.g. "O'Neil", "Jean-Luc"
const NAME_WORD = /^[\p{L}][\p{L}'’.-]*$/u;
// name@domain.suffix, e.g. vanessa@lorem.com, vanessa@mail.lorem.it
const EMAIL = /^[^\s@]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i;
// +<country code> <area code> <3 digits> <4 digits>, e.g. +1 438 507 7799
const PHONE = /^\+\d{1,3} \d{3} \d{3} \d{4}$/;

const words = (value = "") => value.trim().split(/\s+/).filter(Boolean);

export const personalInfoSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required(REQUIRED)
    .test("letters", "Use letters only", (value) =>
      words(value).every((w) => NAME_WORD.test(w)),
    )
    .test("word-count", "Enter 2 to 5 words", (value) => {
      const count = words(value).length;
      return count >= 2 && count < 6;
    }),
  email: Yup.string()
    .trim()
    .required(REQUIRED)
    .matches(EMAIL, "Enter a valid email"),
  phone: Yup.string()
    .trim()
    .required(REQUIRED)
    .matches(PHONE, "Use format +1 234 567 8901"),
});

const MAX_DIGITS = 13; // up to 3 country code digits + 10 digit number

/**
 * Formats phone input as "+<country> <area> <xxx> <xxxx>" while the user types.
 *
 * The last 10 digits are always area code + number, so once more than 10 digits are
 * entered the country code is whatever comes before them. Until then, the country
 * code is the first group the user separated with a space (defaulting to 1 digit).
 */
export function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, MAX_DIGITS);
  if (!digits) return raw.trim().startsWith("+") ? "+" : "";

  const typedCountryCode = raw.match(/^\s*\+?\s*(\d{1,3})\s/)?.[1];
  let countryCodeLength = typedCountryCode?.length ?? 1;
  if (digits.length > countryCodeLength + 10) {
    countryCodeLength = digits.length - 10;
  }

  const countryCode = digits.slice(0, countryCodeLength);
  const rest = digits.slice(countryCodeLength);
  const groups = [rest.slice(0, 3), rest.slice(3, 6), rest.slice(6, 10)].filter(
    Boolean,
  );

  return ["+" + countryCode, ...groups].join(" ");
}
