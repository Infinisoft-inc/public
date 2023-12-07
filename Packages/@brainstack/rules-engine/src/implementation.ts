type RuleFunction = (data: any) => boolean;

interface IRule {
  name: string;
  evaluate: RuleFunction;
}

class RulesEngine {
  private rules: IRule[];

  constructor(rules: IRule[]) {
    this.rules = rules;
  }

  evaluate(data: any): string[] {
    const triggeredRules = this.rules.filter(rule => rule.evaluate(data));
    return triggeredRules.map(rule => rule.name);
  }
}

