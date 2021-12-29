export function validateName(name) {
  if (name === "") {
    return { valid: false, error: "Can't be null" };
  }
  if (name.length < 3) {
    return { valid: false, error: "Must be higher then 3 characters" };
  }
  if (!/^[a-zA-Z- 0-9]+$/.test(name)) {
    return { valid: false, error: "Can't contain special characters" };
  }
  return { valid: true };
}

export function temp() {
  const x = 3;
  return x;
}
