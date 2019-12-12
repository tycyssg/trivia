import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../../services/question.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-play-top',
  templateUrl: './play-top.component.html',
  styleUrls: ['./play-top.component.css']
})
export class PlayTopComponent implements OnInit {

  constructor(private questionService:QuestionService) { }
  topPlayers:UserModel[] = [];

  ngOnInit() {
    this.questionService.getTopThreePlayers().subscribe(resp => this.topPlayers = resp);
  }

}
