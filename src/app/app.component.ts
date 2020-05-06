import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as moment from 'moment';

import { EmailFormat } from './email.interface';

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
    email: '',
    phone: '',
    content: ''
  }

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  private _sendMail(emailbody: EmailFormat): void {
    const url ='https://us-central1-site-guilherme-pintto-63073.cloudfunctions.net/emailSender';
    this.http.post(url, emailbody).subscribe(
      data => {
        console.info('success-->: ', data);
      },
      error => {
        console.error('error-->: ', error);
      }
    );
  }

  private _cleanPersonInfo(): void {
    this.personInfo.name = '';
    this.personInfo.email = '';
    this.personInfo.whatsapp = '';
  }

  private _showConfirmationMsgPreSale(): void {
    this.hideConfirmationMsgCountdown = false;
  }

  private _showConfirmationMsgContact(): void {
    this.hideConfirmationMsgContact = false;
  }

  private _emailBodyFactory(subject: string, html: string): EmailFormat {
    const emailBody: EmailFormat = {
      from: 'Site Guilherme Pintto',
      to: ['ettore.rossatto@ciadaconsulta.com.br'],
      subject: subject,
      html: html
    }
    return emailBody;
  }

  public submitPreSale(): void {
    const emailSubject = 'Cadastro pré-venda';
    const emailHtml = `
      <div><b>Enviado por: </b>"${this.personInfo.name}"</div>
      <div><b>Email: </b>"${this.personInfo.email}"</div>
      <div><b>Whatsapp: </b>"${this.personInfo.whatsapp}"</div>
    `;
    const emailBody = this._emailBodyFactory(emailSubject, emailHtml);
    this._sendMail(emailBody);
    this._cleanPersonInfo();
    this._showConfirmationMsgPreSale();
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

  public openContactForm(): void {
    this.showContactPopup = true;
  }

  public closeContactPopup(): void {
    this.hideConfirmationMsgContact = true;
    this.showContactPopup = false;

    this.contactMessage.name = '';
    this.contactMessage.email = '';
    this.contactMessage.phone = '';
  }

  public submitContactMessage(): void {
    this.contactMessage.content = this.textArea.nativeElement.value;

    const emailSubject = 'Contato';
    const emailHtml = `
      <div><b>Enviado por: </b>"${this.contactMessage.name}"</div>
      <div><b>Email: </b>"${this.contactMessage.email}"</div>
      <div><b>Telefone: </b>"${this.contactMessage.phone}"</div>
      <div><b>Mensagem: </b><br>"${this.contactMessage.content}"</div>
    `;
    const emailBody = this._emailBodyFactory(emailSubject, emailHtml);

    this._sendMail(emailBody);
    this._showConfirmationMsgContact()
  }
}
