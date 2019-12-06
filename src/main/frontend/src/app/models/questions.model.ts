import {QuestionDifficultyEnum} from "./questionDifficulty.enum";
import {QuestionsAnswerModel} from "./questionsAnswer.model";


export class QuestionsModel {

    id:number;
    question: string;
    correctAnswer:string;
    questionAnswers:QuestionsAnswerModel[];
    questionDifficulty:QuestionDifficultyEnum;
    categoryId:number;

  constructor(init?: Partial<QuestionsModel>) {
    Object.assign(this, init);
  }


}
