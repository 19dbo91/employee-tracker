class Question {
    constructor(typeString, nameString, msgString){
        this.type = typeString;
        this.name = nameString;
        this.message = msgString;
    }
}
class MultiChoice extends Question {
    constructor(nameString, msgString, choicesArr){
        super("list", nameString, msgString);
        this.choices = choicesArr;
    }
}
class ShortAnswer extends Question {
    constructor(nameString, msgString){
        super("input", nameString, msgString);
    }
}


module.exports = {Question, MultiChoice, ShortAnswer}