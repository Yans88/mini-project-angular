import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {MySessionService} from "../../auth/my-session.service";
import {Injectable} from "@angular/core";
import {MessageService} from "primeng/api";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class WebSocketAPI {
  webSocketEndPoint: string = 'http://localhost:8080/mini-project/cek-hp';
  topic: string = "/topic/transaksi";
  stompClient: any;

  countMsg: number = 0;

  private notification$ = new BehaviorSubject<number>(0);
  notificationCounter = this.notification$.asObservable();

  constructor(private sessionService: MySessionService, private messageService: MessageService) {
  }

  connectWS(): void {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame: any) {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
        _this.onMessageReceived(sdkEvent);
      });
      _this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
    this.addUser();
  };

  disConnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }


  errorCallBack(error: any) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this.connectWS();
    }, 5000);
  }

  addUser() {
    const email = this.sessionService.getSession().email;
    this.stompClient.send("/app/addUser", {}, JSON.stringify({sender: email, type: 'JOIN'}));
  }

  sendMessagge(message: any) {
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/hello", {}, JSON.stringify(message));
  }

  onMessageReceived(payload: any) {
    const message = JSON.parse(payload.body);
    if (message.type === "NewTransaksi") {
      this.countMsg = this.countMsg + 1;
      this.notification$.next(this.countMsg);
      this.messageService.add({
        key: "newTransaksi",
        severity: 'warn',
        summary: 'New Transaksi',
        detail: 'New Transaksi #' + message.content.id_transaksi,
        life: 5000,
      });
    }
  }

  clearCounter() {
    console.log('reset');
    this.countMsg = 0;
    this.notification$.next(this.countMsg);
    console.log(this.notification$.getValue());
  }

  clearMessage():void{
    this.messageService.clear();
  }
}

