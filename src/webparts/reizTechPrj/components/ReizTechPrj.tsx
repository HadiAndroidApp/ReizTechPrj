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

      correct_answers: 0,
      wrong_answers: 0,
      showWelcome: true,
      showQuiz: false,
      showEnd: false,
      currentTime: "",
      selectedDay_DayYearChange: 'Monday',
      selected_AmsterdamLosAngles: '00:00',
      selected_after_bd:  currentDateFunction(),
      selected_before_bd: currentDateFunction(),
      before_birthdays: 0,
      after_birthdays: 0,
      user_responses: '',
      user_name: '',
      user_phone: '',
      user_email: '',
      expected_response:'',
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
                <input type="text" id="name" className="blank-style" name="name" pattern="[A-Za-z\s]{1,}" value={this.state.user_name} onChange={this.setName} required />
                <br /> <br />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" className="blank-style" name="email" value = {this.state.user_email} onChange={this.setEmail} required />
                <br /> <br />
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="tel" id="phoneNumber" className="blank-style" name="phoneNumber" value={this.state.user_phone} pattern="\+?[0-9]{1,14}" onChange={this.setPhoneNumber} required />
                <br /> <br />
              </div>
              <h2>Part 1</h2>
              <div className="container2">
                <h3>Please choose a correct answer from the given options:</h3>
                <ol>
                  <li>
                    <label>If 2021-03-14 is on Sunday what will be the day of the month considering same date, month but year 2025, i.e. the day on 2025-03-14?</label>
                    <br />
                    <select id="DayYearChange" value={this.state.selectedDay_DayYearChange} onChange={this.handleSelectionChange_DayYearChange}>
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
                    <input type="date" id="before_birthdate" onChange={this.handleBeforeBdDate} value={this.state.selected_before_bd} className="blank-style" placeholder="Birthdate" name="birthdate" required />
                    <br /> <br />
                    <input type="number" onChange={this.handleBeforeBdDays} value={this.state.before_birthdays} className="blank-style" id="Days" placeholder="Enter your Answer" name="Days" required />
                    <br /> <br />
                  </li>
                  {/* <!-- Additional list items for more questions --> */}

                  <li><label>How many days are left in a year after your birthday ? Provided your birthday is  </label>
                    <input type="date" onChange={this.handleAfterBdDate} value={this.state.selected_after_bd} className="blank-style" id="after_birthdate" placeholder="Birthdate" name="birthdate" required /></li><br /><br />
                  <input type="number" onChange={this.handleAfterBdDays} value={this.state.after_birthdays} className="blank-style" placeholder="Enter your Answer Day " id="Day for Birth" name="Day for Birth" required /><br /><br />



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
          <p>Your total correct answers are :{this.state.correct_answers} </p>
          <p>Your wrong attempts are :{this.state.wrong_answers}</p>


          <a onClick={() => this.moveToHome()} className="button">Return to Home </a>
        </div>}

      </section>
    );

  }

 
  // Event handler for the number input
  handleBeforeBdDate = (event: any) => {
    this.setState({ selected_before_bd: event.target.value },()=>{
      this.checkItemDataEntered();
    });
  }
  handleAfterBdDate = (event: any) => {
    this.setState({ selected_after_bd: event.target.value },()=>{
      this.checkItemDataEntered();
    });
  }
  handleBeforeBdDays = (event: any) => {
    this.setState({ before_birthdays: event.target.value },()=>{
      this.checkItemDataEntered();
    });
  }
  handleAfterBdDays = (event: any) => {
    this.setState({ after_birthdays: event.target.value },()=>{
      this.checkItemDataEntered();
    });
  }
  handleSelectionChange_DayYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedDay_DayYearChange: event.target.value }, () => {
      this.checkItemDataEntered();
    });
  }

  setEmail = (event: { target: { value: any; }; }) => {
    this.setState({user_email:event.target.value}, () => {
      this.checkItemDataEntered();
    });
  }

  setName = (event: { target: { value: any; }; }) => {
    this.setState({user_name:event.target.value}, () => {
this.checkItemDataEntered();
    });
  }


  setPhoneNumber = (event: { target: { value: any; }; }) => {
    this.setState({user_phone:event.target.value}, () => {
      this.checkItemDataEntered();
    });
  }

  checkItemDataEntered=()=>{

    if(this.state.user_name.toString().length > 0 && 
                this.state.user_email.toString().length > 0 &&
                this.state.user_phone.toString().length > 0 &&
                this.state.selectedDay_DayYearChange.toString().length> 0 &&
                this.state.selected_AmsterdamLosAngles.toString().length>0 &&
                this.state.selected_before_bd.toString().length>0 &&
                this.state.selected_after_bd.toString().length>0 &&
                this.state.before_birthdays.toString().length>0 &&
                this.state.after_birthdays.toString().length>0)

                {
                  this.setState({showSubmit:true})
                }

                else{
                    this.setState({showSubmit:false})
                }

  }


  handleTimeZoneConversion = (event: any) => {
    this.setState({ selected_AmsterdamLosAngles: event.target.value }, () => {
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
      user_responses: '',
      user_name: '',
      user_phone: '',
      user_email: '',
      correct_answers: 0,
      wrong_answers: 0,
      expected_response:''
    });

  }


  //Sending Results to SharePoint

 


  async moveToEnd() {
    console.log("moveToEnd");
    this.setState({
      showWelcome: false,
      showQuiz: false,
      showEnd: true
    });
    await this.fetchDayOnDate(this.state.selectedDay_DayYearChange);
    await this.convertTimeZone(this.state.selected_AmsterdamLosAngles);
    await this.countDaysBeforeBirthday(this.state.selected_before_bd, this.state.before_birthdays);
    await this.countDaysAfterBirthday(this.state.selected_after_bd, this.state.after_birthdays);
    await this.createListItem();
    console.log("total ",this.state.correct_answers,this.state.wrong_answers)
  }

  moveToHome(): void {
    console.log("Go to Home");
    this.setState({
      showWelcome: true,
      showQuiz: false,
      showEnd: false,
      selectedDay_DayYearChange: 'Monday',
      selected_AmsterdamLosAngles: '00:00',
      selected_after_bd:currentDateFunction(),
      selected_before_bd: currentDateFunction(),
      before_birthdays: 0,
      after_birthdays: 0,
      user_responses: '',
      user_name: '',
      user_phone: '',
      user_email: '',
      correct_answers: 0,
      wrong_answers: 0,
      expected_response:''
    });
  }

  
  private  convertTimeZone=async(selectedDay:string)=> {
    const apiUrl = `${TimeIO_URL}/Conversion/ConvertTimeZone`;
    const fullUrl = `${proxlURL}${apiUrl}`;
    try {
      const responseData= await timeProxyCallWithBody(fullUrl,TIME_CONVERSION_DATA)
      if (responseData.time == selectedDay) {   
        this.setState({ correct_answers: this.state.correct_answers + 1})
        this.setState({user_responses:`${this.state.user_responses} Q1: ${selectedDay}` })
        this.setState({expected_response:`${this.state.expected_response} A1: ${responseData.time} `})
      } else {
        this.setState({ wrong_answers: this.state.wrong_answers + 1})
        this.setState({user_responses:`${this.state.user_responses} Q1: ${selectedDay}`})
        this.setState({expected_response:`${this.state.expected_response} A1: ${responseData.time}`  })
      }
    } catch (error) {
      console.error('Error fetching time:', error);
    }
  };
     


private createListItem = async () => {
  console.log("Inside the createListItem");

   sp.web.lists.getByTitle("ReizTechTimeQuiz").items.add({
    Title: "Sample",
    Name:this.state.user_name,
    Email:this.state.user_email,
    PhoneNumber:this.state.user_phone,
    UserResponse:this.state.user_responses,
    ExpectedResponse:this.state.expected_response

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

        this.setState({ correct_answers: this.state.correct_answers + 1})
        this.setState({user_responses:`${this.state.user_responses} Q1: ${selectedDay}` })
        this.setState({expected_response:`${this.state.expected_response} A1: ${data.dayOfWeek} `})
      } else {
        this.setState({ wrong_answers: this.state.wrong_answers + 1})
        this.setState({user_responses:`${this.state.user_responses} Q1: ${selectedDay}`})
        this.setState({expected_response:`${this.state.expected_response} A1: ${data.dayOfWeek}`  })
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
        this.setState({ correct_answers: this.state.correct_answers + 1})
        this.setState({user_responses:`${this.state.user_responses} Q3: ${selectedDay} with SelectedDate ${birthday}`})
        this.setState({expected_response:`${this.state.expected_response} A3: ${parseInt(data.day)} with selectedDate ${birthday}`  });
      } else {
        this.setState({ wrong_answers: this.state.wrong_answers + 1})
        this.setState({user_responses:`${this.state.user_responses} Q3: ${selectedDay} with SelectedDate ${birthday}`})
        this.setState({expected_response:`${this.state.expected_response} A3: ${parseInt(data.day)} with selectedDate ${birthday}` });
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
        this.setState({ correct_answers: this.state.correct_answers + 1})
        this.setState({user_responses:`${this.state.user_responses} Q4: ${selectedDay} with SelectedDate ${birthday}`})
        this.setState({expected_response:`${this.state.expected_response} A4: ${parseInt(data.day)} with selectedDate ${birthday}`  });
      } else {
        this.setState({ wrong_answers: this.state.wrong_answers + 1})
        this.setState({user_responses:`${this.state.user_responses} Q4: ${selectedDay} with SelectedDate ${birthday}`})
        this.setState({expected_response:`${this.state.expected_response} A4: ${parseInt(data.day)} with selectedDate ${birthday}`  });
      }
    }
    catch (error: any) {
      console.error('Error fetching time:3', error);
    };
  }

}
