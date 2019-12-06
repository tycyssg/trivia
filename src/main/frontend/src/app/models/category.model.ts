
import {UserModel} from "./user.model";
import {QuestionsModel} from "./questions.model";



export class CategoryModel {

    id:number;
    categoryName: string;
    questions:QuestionsModel[];

  constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }


}
