/**
 * Add more function definitions here, and append references to them
 * to the `functions` list in the `runChecks` function.
 *
 * All of the functions in the list are going to be evaluated when
 * checking for the API health status.
 */

/**
 * Example check function.
 * @returns Always true.
 */
const example = (): boolean => (
  true
);

/**
 * Run each check in the 'functions' list and return the overall result.
 * @returns True if all checks succeeded, false if any failed.
 */
async function runChecks(): Promise<boolean> {
  const functions = [
    example,
  ];
  return functions.every((x) => x());
}

export { runChecks };
