import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('textArea', {static: false}) textArea: ElementRef;

  private _nowDate = moment().format("DD/MM/YYYY hh");
  private _launchDate = moment('20/05/2020 00:00', "DD/MM/YYYY hh");

  public links = {
    youtubeLink:  'https://www.youtube.com/user/guipintto',
    instagramLink: 'https://www.instagram.com/guipintto/',
    twitterLink: 'https://twitter.com/guipintto',
    facebookLink: 'https://www.facebook.com/guipinttto/',
    bookOneLink: 'https://www.amazon.com.br/%C3%B3bvio-tamb%C3%A9m-precisa-ser-dito/dp/8542216369/ref=pd_lpo_14_t_0/138-6324468-6727742?_encoding=UTF8&pd_rd_i=8542216369&pd_rd_r=ef9defb1-205c-4861-9906-ec111033d752&pd_rd_w=o9fuw&pd_rd_wg=coT4J&pf_rd_p=e7e26e7d-6256-4aae-92f9-7ffa337ed626&pf_rd_r=3DM6S92R1EW1GS0HTQ8X&psc=1&refRID=3DM6S92R1EW1GS0HTQ8X',
    bookTwoLink: 'https://www.amazon.com.br/Seja-amor-vida-Guilherme-Pintto/dp/8542212991',
  };

  public hideConfirmationMsgCountdown: boolean = true;
  public personInfo = {
    name: '',
    email: '',
    whatsapp: ''
  };

  public hideConfirmationMsgContact: boolean = true;
  public showContactPopup: boolean = false;
  public contactMessage = {
    name: '',
    content: ''
  }

  constructor() { }

  ngOnInit() {
  }

  public countdownTimer(value: string): string {
    const timeDifference = moment(this._launchDate, "DD/MM/YYYY hh").diff(moment( this._nowDate, "DD/MM/YYYY hh"));

    switch (value) {
      case 'months':
        return (moment.utc(timeDifference).month() > 0) ? moment.utc(timeDifference).month().toString() : '00';
      case 'days':
        return moment.utc(timeDifference).format("DD");
      case 'hours':
        return moment.utc(timeDifference).format("hh");
    };
  }

  public onSubmit(): void {
    console.log('-->: ', this.personInfo);
    this.hideConfirmationMsgCountdown = false;
    this.personInfo.name = '';
    this.personInfo.email = '';
    this.personInfo.whatsapp = '';
  }

  public openContactForm(): void {
    this.showContactPopup = true;
  }

  public closeContactPopup(): void {
    this.hideConfirmationMsgContact = true;
    this.showContactPopup = false;
  }

  public sendContactMessage(): void {
    this.contactMessage.content = this.textArea.nativeElement.value; // technical adjustment :X
    this.hideConfirmationMsgContact = false;
    console.log('-->: ', this.contactMessage);

  }
}
