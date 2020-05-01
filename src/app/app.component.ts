import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private _nowDate = moment().format("DD/MM/YYYY hh");
  private _launchDate = moment('20/05/2020 00:00', "DD/MM/YYYY hh");

  constructor() { }

  ngOnInit() {
  }

  public countdownTimer(value: string): string {
    const timeDifference = moment(this._launchDate, "DD/MM/YYYY hh").diff(moment( this._nowDate, "DD/MM/YYYY hh"));

    switch (value) {
      case 'months':
        return moment.utc(timeDifference).format("MM");
      case 'days':
        return moment.utc(timeDifference).format("DD");
      case 'hours':
        return moment.utc(timeDifference).format("hh");
    };
  }

  onSubmit(form: NgForm) {
    console.log('-->: ', form.form.value);
  }
}
