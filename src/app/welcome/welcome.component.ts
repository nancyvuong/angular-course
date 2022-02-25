import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';
//import { AppComponent } from '../app.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  message = 'Some Welcome Message'
  welcomeMessageFromService: string;
  name = ''

  //ActivatedRoute
  constructor(private route:ActivatedRoute,
    private service:WelcomeDataService) {this.welcomeMessageFromService = '' }

  ngOnInit(): void {
    //console.log(this.message)
    //console.log(this.route.snapshot.params['name'])
    this.name = this.route.snapshot.params['name']
  }

  getWelcomeMessageWithParameter(){
    //console.log(this.service.executeHelloWorldBeanService());
    this.service.executeHelloWorldServiceWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );

    console.log('last line of getWelcomeMessage');
  }

  handleSuccessfulResponse(response: any){
    this.welcomeMessageFromService = response.message;
    console.log(response);
    console.log(response.message);
  }

  handleErrorResponse(error: any){
    this.welcomeMessageFromService = error.error.message;
  }

}
