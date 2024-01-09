import { IRule } from "./abstraction";

/**
 * A rules engine class that evaluates a set of rules against provided data.
 */
export class RulesEngine {
  private rules: IRule[];

  /**
   * Constructs a new instance of the RulesEngine.
   * 
   * @param rules - An array of `IRule` objects that the engine will use for evaluation.
   */
  constructor(rules: IRule[]) {
    this.rules = rules;
  }

  /**
   * Evaluates the set of rules against the provided data.
   * 
   * @param data - The data to evaluate against the rules. This can be any type of data structure.
   * @returns A string array containing the names of the rules returning true during evaluation.
   */
  evaluate(data: any): string[] {
    const triggeredRules = this.rules.filter(rule => rule.evaluate(data));
    return triggeredRules.map(rule => rule.name);
  }
}
