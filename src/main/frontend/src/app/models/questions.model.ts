import {QuestionDificultyEnum} from "./questionDificulty.enum";
import {QuestionsAnswerModel} from "./questionsAnswer.model";


export class QuestionsModel {

    id:number;
    question: string;
    correctAnswer:string;
    questionAnswers:QuestionsAnswerModel[];
    questionDificulty:QuestionDificultyEnum;
    categoryId:number;

  constructor(init?: Partial<QuestionsModel>) {
    Object.assign(this, init);
  }


}
