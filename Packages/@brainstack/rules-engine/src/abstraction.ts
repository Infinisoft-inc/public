/**
 * Type definition for a function that evaluates a rule.
 * 
 * @param data - The data to be evaluated by the rule function. 
 *               This can be of any type, allowing flexibility in what the rule function can process.
 * @returns A boolean indicating whether the rule is triggered (true) or not (false).
 */
export type RuleFunction = (data: any) => boolean;

/**
 * Interface representing a rule.
 */
export interface IRule {
  /**
   * The name of the rule. This should be a unique identifier that describes the rule.
   */
  name: string;

  /**
   * The function used to evaluate the rule. 
   * This function should take any type of data and return a boolean indicating the outcome of the evaluation.
   */
  evaluate: RuleFunction;
}
