import * as React from 'react';
import type { IReizTechPrjProps } from './IReizTechPrjProps';

import { IReactPartialStateUpdateState } from './IReactPartialStateUpdateState';
require('./Styles/customCSS.css');
import {timeProxyCall,timeProxyCallWithBody,currentDateFunction} from '../common/common';
import { proxlURL, TimeIO_URL,YEAR_DAY_COUNT,DATE_TO_DAY,TIME_CONVERSION_DATA } from '../common/constant';


import {sp} from "@pnp/sp"

export default class ReizTechPrj extends React.Component<IReizTechPrjProps, IReactPartialStateUpdateState> {

  public constructor(props: IReizTechPrjProps, state: IReactPartialStateUpdateState) {
    super(props);

    this.state = {
      currentDate: new Date(),
      randomNumber: 0,

      correctAnswers: 0,
      wrongAnswers: 0,
      showWelcome: true,
      showQuiz: false,
      showEnd: false,
      currentTime: "",
      selectedDayDayYearChange: 'Monday',
      selectedAmsterdamLosAngles: '00:00',
      selectedAfterBd:  currentDateFunction(),
      selectedBeforeBd: currentDateFunction(),
      beforeBirthdays: 0,
      afterBirthdays: 0,
      userResponses: '',
      userName: '',
      userPhone: '',
      userEmail: '',
      expectedResponse:'',
      showSubmit:false
    };


    this.createListItem=this.createListItem.bind(this);

  }

  public render(): React.ReactElement<IReizTechPrjProps> {


    return (
      <section>
        {/* Code for Home Page */}
        {this.state.showWelcome === true && <div className="container-homepage">
          <h1>Welcome to Time Puzzle!</h1>
          <p>Thank you for visiting our website. Please read the instruction carefully and  follow the instructions as mentioned below:</p>
          <ul>
            <li>Attempt all questions</li>
            <li>You will be able to get your result after submitting your response</li>
            <li>After clicking continue , you will not be able to come back to this screen</li>
            <li>There will be no negative marking, so attempt all questions</li>
          </ul>
          <h3>Note: </h3>
          <p>We hope you have a pleasant experience and in case of any query feel free to call Hadi Mahmood</p>
          <a className="button" onClick={() => this.moveToQuiz()}>Continue</a>
        </div>}

        {/* Code for Quiz */}

        {this.state.showQuiz === true && <section>
          <div className="container3">
            <h2>Time Lapse Quiz</h2>
            <form action="#" method="post">
              <div className="container-quiz">
                {/* <!-- User Informarion --> */}
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" className="blank-style" name="name" pattern="[A-Za-z\s]{1,}" value={this.state.userName} onChange={this.setName} required />
                <br /> <br />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" className="blank-style" name="email" value = {this.state.userEmail} onChange={this.setEmail} required />
                <br /> <br />
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="tel" id="phoneNumber" className="blank-style" name="phoneNumber" value={this.state.userPhone} pattern="\+?[0-9]{1,14}" onChange={this.setPhoneNumber} required />
                <br /> <br />
              </div>
              <h2>Part 1</h2>
              <div className="container2">
                <h3>Please choose a correct answer from the given options:</h3>
                <ol>
                  <li>
                    <label>If 2021-03-14 is on Sunday what will be the day of the month considering same date, month but year 2025, i.e. the day on 2025-03-14?</label>
                    <br />
                    <select id="DayYearChange" value={this.state.selectedDay_DayYearChange} onChange={this.handleSelectionChangeDayYearChange}>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>

                    <br /> <br />
                  </li>
                  {/* <!-- Add additional questions as required with proper ID and NAME attributes to avoid conflicts. --> */}
                  <li><label>If Amsterdam time zone is 16 hours ahead from LosAngles timezone.Calculate time at Amsterdam when it is 06:30:00 am  in LosAngeles</label></li><br />

                  <select id="AmsterdamLosAngles" value={this.state.selected_AmsterdamLosAngles} onChange={this.handleTimeZoneConversion}>
                    <option value="21:30">21:30</option>
                    <option value="21:00">21:00</option>
                    <option value="22:00">22:00</option>
                    <option value="22:30">22:30</option>

                  </select>
                  <br /><br />
                </ol>
              </div>
              <h2>Part 2</h2>
              <div className="container2">
                <h3>Please fill the blank with correct answer</h3>
                <ol>
                  <li>
                    <label>How many days have passed before your birthday in a year? Provided your birthday is</label>
                    <input type="date" id="beforeBirthdate" onChange={this.handleBeforeBdDate} value={this.state.selected_before_bd} className="blank-style" placeholder="Birthdate" name="birthdate" required />
                    <br /> <br />
                    <input type="number" onChange={this.handleBeforeBdDays} value={this.state.before_birthdays} className="blank-style" id="Days" placeholder="Enter your Answer" name="Days" required />
                    <br /> <br />
                  </li>
                  {/* <!-- Additional list items for more questions --> */}

                  <li><label>How many days are left in a year after your birthday ? Provided your birthday is  </label>
                    <input type="date" onChange={this.handleAfterBdDate} value={this.state.selected_after_bd} className="blank-style" id="afterBirthdate" placeholder="Birthdate" name="birthdate" required /></li><br /><br />
                  <input type="number" onChange={this.handleAfterBdDays} value={this.state.after_birthdays} className="blank-style" placeholder="Enter your Answer Day " id="DayForBirth" name="Day for Birth" required /><br /><br />



                </ol>
              </div>
              {/* <!-- Submit Button --> */}
              <b>Enter All Values to see the Submit Button</b><br/>
              {this.state.showSubmit && <input type="submit" className="button" onClick={() => this.moveToEnd()} value="Submit" />}
            </form>
          </div>
        </section>}


        {this.state.showEnd === true && <div className="container-end">
          <h1>Quiz Completed!</h1>
          <p>Thank you for completing the quiz.</p>
          <p>Your total correct answers are :{this.state.correctAnswers} </p>
          <p>Your wrong attempts are :{this.state.wrongAnswers}</p>


          <a onClick={() => this.moveToHome()} className="button">Return to Home </a>
        </div>}

      </section>
    );

  }

 
  // Event handler for the number input
  handleBeforeBdDate = (event: any) => {
    this.setState({ selectedBeforeBd: event.target.value },()=>{
      this.checkItemDataEntered();
    });
  }
  handleAfterBdDate = (event: any) => {
    this.setState({ selectedAfterBd: event.target.value },()=>{
      this.checkItemDataEntered();
    });
  }
  handleBeforeBdDays = (event: any) => {
    this.setState({ beforeBirthdays: event.target.value },()=>{
      this.checkItemDataEntered();
    });
  }
  handleAfterBdDays = (event: any) => {
    this.setState({ afterBirthdays: event.target.value },()=>{
      this.checkItemDataEntered();
    });
  }
  handleSelectionChange_DayYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedDayDayYearChange: event.target.value }, () => {
      this.checkItemDataEntered();
    });
  }

  setEmail = (event: { target: { value: any; }; }) => {
    this.setState({userEmail:event.target.value}, () => {
      this.checkItemDataEntered();
    });
  }

  setName = (event: { target: { value: any; }; }) => {
    this.setState({userName:event.target.value}, () => {
this.checkItemDataEntered();
    });
  }


  setPhoneNumber = (event: { target: { value: any; }; }) => {
    this.setState({userPhone:event.target.value}, () => {
      this.checkItemDataEntered();
    });
  }

  checkItemDataEntered=()=>{

    if(this.state.user_name.toString().length > 0 && 
                this.state.userEmail.toString().length > 0 &&
                this.state.userPhone.toString().length > 0 &&
                this.state.selectedDayDayYearChange.toString().length> 0 &&
                this.state.selectedAmsterdamLosAngles.toString().length>0 &&
                this.state.selectedBeforeBd.toString().length>0 &&
                this.state.selectedAfterBd.toString().length>0 &&
                this.state.beforeBirthdays.toString().length>0 &&
                this.state.afterBirthdays.toString().length>0)

                {
                  this.setState({showSubmit:true})
                }

                else{
                    this.setState({showSubmit:false})
                }

  }


  handleTimeZoneConversion = (event: any) => {
    this.setState({ selectedAmsterdamLosAngles: event.target.value }, () => {
      this.checkItemDataEntered();
    });
  }
  moveToQuiz(): void {
    this.setState({
      showWelcome: false,
      showQuiz: true,
      showEnd: false,
      selectedDay_DayYearChange: 'Monday',
      selected_AmsterdamLosAngles: '00:00',
      selected_after_bd: currentDateFunction(),
      selected_before_bd: currentDateFunction(),
      before_birthdays: 0,
      after_birthdays: 0,
      userResponses: '',
      user_name: '',
      user_phone: '',
      user_email: '',
      correctAnswers: 0,
      wrongAnswers: 0,
      expectedResponse:''
    });

  }


  //Sending Results to SharePoint

 


  async moveToEnd() {

    this.setState({
      showWelcome: false,
      showQuiz: false,
      showEnd: true
    });
    await this.fetchDayOnDate(this.state.selectedDayDayYearChange);
    await this.convertTimeZone(this.state.selectedAmsterdamLosAngles);
    await this.countDaysBeforeBirthday(this.state.selectedBeforeBd, this.state.beforeBirthdays);
    await this.countDaysAfterBirthday(this.state.selectedAfterBd, this.state.afterBirthdays);
    await this.createListItem();
  
  }

  moveToHome(): void {
    this.setState({
      showWelcome: true,
      showQuiz: false,
      showEnd: false,
      selectedDayDayYearChange: 'Monday',
      selectedAmsterdamLosAngles: '00:00',
      selectedAfterBd:currentDateFunction(),
      selectedBeforeBd: currentDateFunction(),
      beforeBirthdays: 0,
      afterbirthdays: 0,
      userResponses: '',
      userName: '',
      userPhone: '',
      userEmail: '',
      correctAnswers: 0,
      wrongAnswers: 0,
      expectedResponse:''
    });
  }

  
  private  convertTimeZone=async(selectedDay:string)=> {
    const apiUrl = `${TimeIO_URL}/Conversion/ConvertTimeZone`;
    const fullUrl = `${proxlURL}${apiUrl}`;
    try {
      const responseData= await timeProxyCallWithBody(fullUrl,TIME_CONVERSION_DATA)
      if (responseData.time == selectedDay) {   
        this.setState({ correctAnswers: this.state.correctAnswers + 1})
        this.setState({userResponses:`${this.state.userResponses} Q1: ${selectedDay}` })
        this.setState({expectedResponse:`${this.state.expectedResponse} A1: ${responseData.time} `})
      } else {
        this.setState({ wrongAnswers: this.state.wrongAnswers + 1})
        this.setState({userResponses:`${this.state.userResponses} Q1: ${selectedDay}`})
        this.setState({expectedResponse:`${this.state.expectedResponse} A1: ${responseData.time}`  })
      }
    } catch (error) {
      console.error('Error fetching time:', error);
    }
  };
     


private createListItem = async () => {


   sp.web.lists.getByTitle("ReizTechTimeQuiz").items.add({
    Title: "Sample",
    Name:this.state.userName,
    Email:this.state.userEmail,
    PhoneNumber:this.state.userPhone,
    UserResponse:this.state.userResponses,
    ExpectedResponse:this.state.expectedResponse

  }).then(() => {
    console.log("Item Added Successfully");
  }).catch(error => {
    console.error("Error adding item: ", error);
  });
}




  private fetchDayOnDate = async (selectedDay: any) => {

    const apiUrl = `${TimeIO_URL}Conversion/DayOfTheWeek/${DATE_TO_DAY}`;
    const fullUrl = `${proxlURL}${apiUrl}`;

    try {
      const data = await timeProxyCall(this.props.context,fullUrl);
      if (data.dayOfWeek == selectedDay) {

        this.setState({ correctAnswers: this.state.correctAnswers + 1})
        this.setState({userResponses:`${this.state.userResponses} Q1: ${selectedDay}` })
        this.setState({expectedResponse:`${this.state.expectedResponse} A1: ${data.dayOfWeek} `})
      } else {
        this.setState({ wrongAnswers: this.state.wrongAnswers + 1})
        this.setState({userResponses:`${this.state.userResponses} Q1: ${selectedDay}`})
        this.setState({expectedResponse:`${this.state.expectedResponse} A1: ${data.dayOfWeek}`  })
      }

    }
    catch (error: any) {
      console.error('Error fetching time:1', error);
    };
  }




  private countDaysBeforeBirthday = async (birthday: any, selectedDay: any) => {
    const apiUrl = `${TimeIO_URL}Conversion/DayOfTheYear/${birthday}`;
    const fullUrl = `${proxlURL}${apiUrl}`;
    try {
      const data = await timeProxyCall(this.props.context,fullUrl);
      if (parseInt(data.day) === parseInt(selectedDay)) {
        this.setState({ correctAnswers: this.state.correctAnswers + 1})
        this.setState({userResponses:`${this.state.userResponses} Q3: ${selectedDay} with SelectedDate ${birthday}`})
        this.setState({expectedResponse:`${this.state.expectedResponse} A3: ${parseInt(data.day)} with selectedDate ${birthday}`  });
      } else {
        this.setState({ wrongAnswers: this.state.wrongAnswers + 1})
        this.setState({userResponses:`${this.state.userResponses} Q3: ${selectedDay} with SelectedDate ${birthday}`})
        this.setState({expectedResponse:`${this.state.expectedResponse} A3: ${parseInt(data.day)} with selectedDate ${birthday}` });
      }
    } catch (error) {
      console.error('Error fetching time:2', error);
    }
  }



  private countDaysAfterBirthday = async (birthday: any, selectedDay: any) => {


    const apiUrl = `${TimeIO_URL}Conversion/DayOfTheYear/${birthday}`;

    const fullUrl = `${proxlURL}${apiUrl}`;
    try {
      const data = await timeProxyCall(this.props.context,fullUrl);

      if ((YEAR_DAY_COUNT - parseInt(data.day)) == parseInt(selectedDay)) {
        this.setState({ correctAnswers: this.state.correctAnswers + 1})
        this.setState({userResponses:`${this.state.userResponses} Q4: ${selectedDay} with SelectedDate ${birthday}`})
        this.setState({expectedResponse:`${this.state.expectedResponse} A4: ${parseInt(data.day)} with selectedDate ${birthday}`  });
      } else {
        this.setState({ wrongAnswers: this.state.wrongAnswers + 1})
        this.setState({userResponses:`${this.state.userResponses} Q4: ${selectedDay} with SelectedDate ${birthday}`})
        this.setState({expectedResponse:`${this.state.expectedResponse} A4: ${parseInt(data.day)} with selectedDate ${birthday}`  });
      }
    }
    catch (error: any) {
      console.error('Error fetching time:3', error);
    };
  }

}
