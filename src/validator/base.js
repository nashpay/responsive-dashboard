class Validator {
  constructor(ruleset) {
    this.ruleset = ruleset;
  }

  inlineCheck(inputData, inputRef) {
    return this;
  }

  preCheck(inputVal) {
    return this;
  }
}

export default Validator;
