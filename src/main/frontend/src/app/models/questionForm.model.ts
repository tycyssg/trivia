
import {UserModel} from "./user.model";
import {QuestionDifficultyEnum} from "./questionDifficulty.enum";

export class QuestionFormModel {

  categoryId: number;
  questionId: number;
  questionDifficulty: QuestionDifficultyEnum;
  question: string;
  answer: string;
  optionOne: string;
  optionTwo: string;
  optionThree: string;

  constructor(init?: Partial<QuestionFormModel>) {
    Object.assign(this, init);
  }


}
