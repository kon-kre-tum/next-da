// discrimated union type for API response
// type can be one of two possible shapes success or error with different properties.
type ActionResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string | ZodIssue[] };
