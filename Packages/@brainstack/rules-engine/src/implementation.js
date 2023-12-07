var RulesEngine = /** @class */ (function () {
    function RulesEngine(rules) {
        this.rules = rules;
    }
    RulesEngine.prototype.evaluate = function (data) {
        var triggeredRules = this.rules.filter(function (rule) { return rule.evaluate(data); });
        return triggeredRules.map(function (rule) { return rule.name; });
    };
    return RulesEngine;
}());
