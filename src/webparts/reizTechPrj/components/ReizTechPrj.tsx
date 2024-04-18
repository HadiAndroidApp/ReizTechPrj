import * as React from 'react';
import type { IReizTechPrjProps } from './IReizTechPrjProps';

import { IReactPartialStateUpdateState } from './IReactPartialStateUpdateState';
require('./Styles/customCSS.css');
import {timeProxyCall,timeProxyCallWithBody,currentDateFunction} from '../common/common';
import { proxlURL, TimeIO_URL,YEAR_DAY_COUNT,DATE_TO_DAY,TIME_CONVERSION_DATA } from '../common/constant';

// import { ISPHttpClientOptions, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

// import { SPHttpClient } from '@microsoft/sp-http';


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
      expected_response:''
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
            <li>There will not be any negative marking, so attempt all questions</li>
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
                {/* <!-- Text Input --> */}
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" className="blank-style" name="name" pattern="[A-Za-z\s]{1,}" required />
                <br /> <br />
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" className="blank-style" name="email"  pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+" required />
                <br /> <br />
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="text" id="phoneNumber" className="blank-style" name="phoneNumber"  pattern="\+?[0-9]{1,14}" required />
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
              <input type="submit" className="button" onClick={() => this.moveToEnd()} value="Submit" />
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
    this.setState({ selected_before_bd: event.target.value });
  }
  handleAfterBdDate = (event: any) => {
    this.setState({ selected_after_bd: event.target.value });
  }
  handleBeforeBdDays = (event: any) => {
    this.setState({ before_birthdays: event.target.value });
  }
  handleAfterBdDays = (event: any) => {
    this.setState({ after_birthdays: event.target.value });
  }
  handleSelectionChange_DayYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedDay_DayYearChange: event.target.value }, () => {

    });
  }
  handleTimeZoneConversion = (event: any) => {
    this.setState({ selected_AmsterdamLosAngles: event.target.value }, () => {

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
    console.log("total ")
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
        this.setState({ correct_answers: this.state.correct_answers + 1 });
      } else {
        this.setState({ wrong_answers: this.state.wrong_answers + 1 });
      }
    } catch (error) {
      console.error('Error fetching time:', error);
    }
  };
     
  

/*
  private createListItem=async() => {
    const listName = "ReizTechTimeQuiz"; 
    const webUrl = this.props.context.pageContext.web.absoluteUrl; 
    console.log("ffff",webUrl)
    const apiUrl = `${webUrl}/_api/web/lists/getbytitle('${listName}')/items`;
  console.log("rlkrlklrkrlkrl",apiUrl)
    const itemBody: any = {
      Title: "New Item Title",
      Name:this.props.context.pageContext.user.displayName,
      UserResponse:this.state.user_responses,
      ExpectedResponse:this.state.expected_response,
      PhoneNumber:this.state.user_phone,
      Email:this.state.user_email
    };
    console.log("Sent List Item",itemBody);
  
    const spHttpClientOptions: ISPHttpClientOptions = {
      body: JSON.stringify(itemBody),
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'Content-type': 'application/json;odata=verbose',
        'odata-version': ''
      }
    };
  
    await this.props.context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, spHttpClientOptions)
      .then((response: SPHttpClientResponse) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Failed to create list item.");
        }
      })
      .then((item: any) => {
        console.log("Item successfully created:", item);
      })
      .catch((error) => {
        console.error("Item not created:", error);
      });
  }

*/


private createListItem = async () => {
  console.log("Inside the createListItem");

   sp.web.lists.getByTitle("ReizTechTimeQuiz").items.add({
    Title: "Hello"
  }).then(() => {
    console.log("Item Added Successfully");
  }).catch(error => {
    console.error("Error adding item: ", error);
  });
}

/*
private createListItem(): void {
  const listName: string = "ReizTechTimeQuiz";  // Update 'YourListName' with your actual list name
  const webUrl: string = this.props.context.pageContext.web.absoluteUrl;
  const apiUrl: string = `${webUrl}/_api/web/lists/getByTitle('${listName}')/items`;
  const itemBody: any = {
    __metadata: { 'type': `SP.Data.ReizTechTimeQuizListItem` },  // Update ListItem entity type if necessary
    Title: "New Item Title"  // Example field, update with actual data fields
  };

  const spHttpClientOptions: SPHttpClientConfiguration = {
    headers: {
      'Accept': 'application/json;odata=nometadata',
      'Content-type': 'application/json;odata=verbose',
      'odata-version': '',
      'IF-MATCH': '*',
      'X-HTTP-Method': 'POST'
    },
    body: JSON.stringify(itemBody)
  };

  this.props.context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, spHttpClientOptions)
    .then((response: SPHttpClientResponse) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Network response was not ok.");
      }
    })
    .then((item: any) => {
      console.log(`Item '${item.Title}' (ID: ${item.Id}) successfully created`);
    })
    .catch((error) => {
      console.error("Error creating item:", error);
    });
}*/






// private createListItem = async () => {
// console.log("Inside the createListITem");
//   await sp.web.lists.getByTitle("ReizTechTimeQuiz").items.add({
//     Title:"Hello"

//   }).then(()=>{
//     console.log("Item Added Successfully")
//   });
// }


//   const listName = "ReizTechTimeQuiz";
//   const webUrl = this.props.context.pageContext.web.absoluteUrl;
//   const apiUrl = `${webUrl}/_api/web/lists/getbytitle('${listName}')/items`;

//   // Fetch ListItemEntityTypeFullName for the list
//   const listItemEntityTypeFullName = await this.fetchListItemEntityTypeFullName(listName);

//   const itemBody = {
//     __metadata: { type: listItemEntityTypeFullName }, // Use the fetched ListItemEntityTypeFullName
//     Title: "New Item Title",
//     Name: this.props.context.pageContext.user.displayName,
//     UserResponse: this.state.user_responses,
//     ExpectedResponse: this.state.expected_response,
//     PhoneNumber: this.state.user_phone,
//     Email: this.state.user_email
//   };

//   const spHttpClientOptions = {
//     body: JSON.stringify(itemBody),
//     headers: {
//       'Accept': 'application/json;odata=verbose',  // Consistent with Content-type
//       'Content-type': 'application/json;odata=verbose',
//     }
//   };

//   try {
//     const response = await this.props.context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, spHttpClientOptions);
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.error ? data.error.message.value : 'Failed to create list item');
//     }
//     console.log("Item successfully created:", data);
//   } catch (error) {
//     console.error("Item not created:", error);
//   }
// };

// private fetchListItemEntityTypeFullName = async (listName: string) => {
//   const webUrl = this.props.context.pageContext.web.absoluteUrl;
//   const apiUrl = `${webUrl}/_api/web/lists/getbytitle('${listName}')?$select=ListItemEntityTypeFullName`;

//   const response = await this.props.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1, {
//     headers: { 'Accept': 'application/json;odata=verbose' }
//   });

//   const data = await response.json();
//   if (!response.ok) {
//     throw new Error(data.error ? data.error.message.value : 'Failed to fetch ListItemEntityTypeFullName');
//   }

//   return data.d.ListItemEntityTypeFullName;
// }




  private fetchDayOnDate = async (selectedDay: any) => {

    const apiUrl = `${TimeIO_URL}Conversion/DayOfTheWeek/${DATE_TO_DAY}`;
    const fullUrl = `${proxlURL}${apiUrl}`;

    try {
      const data = await timeProxyCall(this.props.context,fullUrl);
      if (data.dayOfWeek == selectedDay) {

        this.setState({ correct_answers: this.state.correct_answers + 1,user_responses:`${this.state.user_responses} Q1: ${selectedDay}` ,expected_response:`${this.state.expected_response} A1: ${data.dayOfWeek} `})
      } else {
        this.setState({ wrong_answers: this.state.wrong_answers + 1,user_responses:`${this.state.user_responses} Q1: ${selectedDay}` ,expected_response:`${this.state.expected_response} A1: ${data.dayOfWeek}`  })
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
        this.setState({ correct_answers: this.state.correct_answers + 1,user_responses:`${this.state.user_responses} Q3: ${selectedDay} with SelectedDate ${birthday}`,expected_response:`${this.state.expected_response} A3: ${parseInt(data.day)} with selectedDate ${birthday}`  });
      } else {
        this.setState({ wrong_answers: this.state.wrong_answers + 1,user_responses:`${this.state.user_responses} Q3: ${selectedDay} with SelectedDate ${birthday}` ,expected_response:`${this.state.expected_response} A3: ${parseInt(data.day)} with selectedDate ${birthday}` });
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
        this.setState({ correct_answers: this.state.correct_answers + 1,user_responses:`${this.state.user_responses} Q4: ${selectedDay} with SelectedDate ${birthday}`,expected_response:`${this.state.expected_response} A4: ${parseInt(data.day)} with selectedDate ${birthday}`  });
      } else {
        this.setState({ wrong_answers: this.state.wrong_answers + 1,user_responses:`${this.state.user_responses} Q4: ${selectedDay} with SelectedDate ${birthday}`,expected_response:`${this.state.expected_response} A4: ${parseInt(data.day)} with selectedDate ${birthday}`  });
      }
    }
    catch (error: any) {
      console.error('Error fetching time:3', error);
    };
  }

}