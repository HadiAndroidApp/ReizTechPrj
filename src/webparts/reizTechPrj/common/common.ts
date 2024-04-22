import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export const timeProxyCall = async (
  context: WebPartContext,
  fullUrl: string
) => {
  try {
    const response = await context.spHttpClient.get(
      fullUrl,
      SPHttpClient.configurations.v1,
      {
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error making HTTP request:", error, fullUrl);
    throw new Error(`Unable to complete Time IO API call request: ${error}`);
  }
};

export const timeProxyCallWithBody = async (fullUrl: string, bodyData: any) => {
  try {
    bodyData = JSON.stringify({
      fromTimeZone: "Europe/Amsterdam",
      dateTime: "2021-03-14 06:30:00",
      toTimeZone: "America/Los_Angeles",
      dstAmbiguity: "",
    });
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: bodyData,
    });

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error making HTTP request:", error);
    throw new Error(`Unable to complete Time IO API call request: ${error}`);
  }
};
export const currentDateFunction = () => {
  const today = new Date();
  let updatedDay = "";
  let updatedMonth = "";
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Gets the month (0-11) so add 1
  const day = today.getDate();
  if (month < 10) {
    updatedMonth = `0${month}`;
  } else {
    updatedMonth = `${month}`;
  }
  if (day < 10) {
    updatedDay = `0${day}`;
  } else {
    updatedDay = `${day}`;
  }
  return `${year}-${updatedMonth}-${updatedDay}`;
};
