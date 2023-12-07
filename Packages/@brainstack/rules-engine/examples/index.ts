// Exemple de règles
const rule1: IRule = {
  name: "Rule1",
  evaluate: (data) => data.someValue > 10
};

const rule2: IRule = {
  name: "Rule2",
  evaluate: (data) => data.anotherValue === "specificValue"
};

// Création de l'instance de RulesEngine avec les règles
const engine = new RulesEngine([rule1, rule2]);

// Données pour évaluer les règles
const dataToEvaluate = { someValue: 15, anotherValue: "specificValue" };

// Évaluation des règles
const triggeredRules = engine.evaluate(dataToEvaluate);

console.log(triggeredRules); // Affiche les noms des règles déclenchées
