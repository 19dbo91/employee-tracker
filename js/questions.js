class Question {
    constructor(nameString, typeString, msgString){
        this.name = nameString;
        this.type = typeString;
        this.message = msgString;
    }
}
class MultiChoice extends Question {
    constructor(nameString, msgString, choicesArr){
        super(nameString, "list", msgString);
        this.choices = choicesArr;
    }
}
class ShortAnswer extends Question {
    constructor(nameString, msgString){
        super(nameString, "input", msgString);
    }
}


module.exports = {Question, MultiChoice, ShortAnswer}