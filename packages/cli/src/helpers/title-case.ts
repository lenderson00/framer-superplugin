export function capitalizeFirstLetter(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function capitalizeFirstLetterWithLocale(value: string): string {
  return value.charAt(0).toLocaleUpperCase() + value.slice(1)
}

const groupsRegex =
  /\p{Uppercase_Letter}{2,}|\p{Uppercase_Letter}\p{Lowercase_Letter}+|\p{Lowercase_Letter}+|\p{Uppercase_Letter}|\d+/gu

export function titleCase(value: string): string {
  const groups = value.match(groupsRegex)

  return groups?.map(group => capitalizeFirstLetter(group)).join(" ") ?? value
}
