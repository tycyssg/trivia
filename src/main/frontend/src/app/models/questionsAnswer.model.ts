export class QuestionsAnswerModel {

    id:number;
    answerValue: string;
    questionId: number;


  constructor(init?: Partial<QuestionsAnswerModel>) {
    Object.assign(this, init);
  }


}
