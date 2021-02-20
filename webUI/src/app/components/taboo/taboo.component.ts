import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TabooModel } from 'src/app/models/taboo';
import { Subscription, timer } from 'rxjs';
import Taboo from '../../../assets/Taboo.json';
import { Message } from 'src/app/models/message';
import { SocketService } from 'src/app/services/socket/socket.service';
import { TabooService } from 'src/app/services/taboo/taboo.service';

@Component({
  selector: 'app-taboo',
  templateUrl: './taboo.component.html',
  styleUrls: ['./taboo.component.scss']
})
export class TabooComponent implements OnInit, OnDestroy {

  @Input() userList: string[];

  private tabooWordset: Array<TabooModel>;
  public currentWord: TabooModel;

  public messageLog: Message[] = [];
  public message: Message;

  public _messageSub: Subscription;

  isRunning: boolean = false;
  time: number = 30;

  constructor(private socketService: SocketService,
    private tabooService: TabooService) {
      this.tabooWordset = Taboo;
    }

  ngOnInit(): void {
    this.chooseCard();
    this.message = new Message(this.socketService.username, "");
    this._messageSub = this.tabooService.message.subscribe((message: Message) => {
      this.messageLog.push(message);

      if(message.isCorrect) {
        this.goToNextCard();
      }
    });

    timer(0, 1000).subscribe(x => {
      if(this.isRunning) {
        this.time--;
      }
    });
  }

  ngOnDestroy(): void {
    this._messageSub.unsubscribe();
  }

  toggleTimer() {
    this.isRunning = !this.isRunning;
  }

  onSubmit() {
    if(this.message.text == this.tabooWordset[0].word) {
      this.tabooService.sendMessage(this.socketService.roomId, this.message);
    } else {
      this.tabooService.sendMessage(this.socketService.roomId, this.message);
    }

    this.message.text = "";
  }

  private chooseCard() {
    let tempCard = Math.floor(Math.random() * Math.floor(this.tabooWordset.length));
    
    this.tabooWordset[tempCard]
  }

  private goToNextCard() {

  }

}