const cybersourceRestApi = require("cybersource-rest-client");
const path = require("path");
const filePath = path.resolve("data/config.js");
const configuration = require(filePath);

const create_instrument_identifier_card = () => {
  return new Promise((resolve, reject) => {
    try {
      const configObject = new configuration();
      const apiClient = new cybersourceRestApi.ApiClient();
      const requestObj =
        new cybersourceRestApi.PostInstrumentIdentifierRequest();

      const card =
        new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentEmbeddedInstrumentIdentifierCard();
      card.number = "4111111111111111";
      requestObj.card = card;

      const opts = [];

      const instance = new cybersourceRestApi.InstrumentIdentifierApi(
        configObject,
        apiClient
      );

      instance.postInstrumentIdentifier(
        requestObj,
        opts,
        (error, data, response) => {
          if (error) {
            console.log("\nError : " + JSON.stringify(error));
            reject(error);
          } else if (data) {
            resolve({ error, data, response });
          }

          console.log(
            "\nResponse Code of Create an Instrument Identifier : " +
              JSON.stringify(response["status"])
          );

          resolve({ error, data, response });
        }
      );
    } catch (error) {
      console.log("\nException on calling the API : " + error);
      reject(error);
    }
  });
};

const create_payment_instrument_card = (instrumentidentifier) => {
  return new Promise((resolve, reject) => {
    const profileid = "93B32398-AD51-4CC2-A682-EA3E93614EB1";

    try {
      const configObject = new configuration();
      const apiClient = new cybersourceRestApi.ApiClient();
      const requestObj = new cybersourceRestApi.PostPaymentInstrumentRequest();

      const card =
        new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentCard();
      card.expirationMonth = "12";
      card.expirationYear = "2031";
      card.type = "visa";
      requestObj.card = card;

      const billTo =
        new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentBillTo();
      billTo.firstName = "John";
      billTo.lastName = "Doe";
      billTo.company = "CyberSource";
      billTo.address1 = "1 Market St";
      billTo.locality = "San Francisco";
      billTo.administrativeArea = "CA";
      billTo.postalCode = "94105";
      billTo.country = "US";
      billTo.email = "test@cybs.com";
      billTo.phoneNumber = "4158880000";
      requestObj.billTo = billTo;

      const instrumentIdentifier =
        new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentInstrumentIdentifier();
      instrumentIdentifier.id = instrumentidentifier;
      requestObj.instrumentIdentifier = instrumentIdentifier;

      const opts = {};
      if (profileid != null) opts["profile-id"] = profileid;

      const instance = new cybersourceRestApi.PaymentInstrumentApi(
        configObject,
        apiClient
      );

      instance.postPaymentInstrument(
        requestObj,
        opts,
        (error, data, response) => {
          if (error) {
            console.log("\nError : " + JSON.stringify(error));
            reject(error);
          } else if (data) {
            resolve({ error, data, response });
          }

          resolve({ error, data, response });
        }
      );
    } catch (error) {
      console.log("\nException on calling the API : " + error);
      reject(error);
    }
  });
};

const setup_completion_with_card_number = (customerId) => {
  return new Promise((resolve, reject) => {
    try {
      const configObject = new configuration();
      const apiClient = new cybersourceRestApi.ApiClient();
      const requestObj = new cybersourceRestApi.PayerAuthSetupRequest();

      const clientReferenceInformation =
        new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
      clientReferenceInformation.code = "TC50171_3";
      const clientReferenceInformationPartner =
        new cybersourceRestApi.Riskv1decisionsClientReferenceInformationPartner();

      clientReferenceInformation.partner = clientReferenceInformationPartner;

      requestObj.clientReferenceInformation = clientReferenceInformation;

      const paymentInformation =
        new cybersourceRestApi.Riskv1authenticationsetupsPaymentInformation();

      const paymentInformationCustomer =
        new cybersourceRestApi.Riskv1authenticationsetupsPaymentInformationCustomer();
      paymentInformationCustomer.customerId = customerId;
      paymentInformation.customer = paymentInformationCustomer;

      requestObj.paymentInformation = paymentInformation;

      const instance = new cybersourceRestApi.PayerAuthenticationApi(
        configObject,
        apiClient
      );

      instance.payerAuthSetup(requestObj, (error, data, response) => {
        if (error) {
          console.log("\nError : " + JSON.stringify(error));
          reject(error);
        } else if (data) {
          resolve({ error, data, response });
        }

        console.log(
          "\nResponse Code of Setup Payer Auth : " +
            JSON.stringify(response["status"])
        );
        resolve({ error, data, response });
      });
    } catch (error) {
      console.log("\nException on calling the API : " + error);
      reject(error);
    }
  });
};

const enroll_with_pending_authentication = () => {
  return new Promise((resolve, reject) => {
    try {
      const configObject = new configuration();
      const apiClient = new cybersourceRestApi.ApiClient();
      const requestObj =
        new cybersourceRestApi.CheckPayerAuthEnrollmentRequest();

      const clientReferenceInformation =
        new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
      clientReferenceInformation.code = "cybs_test";
      requestObj.clientReferenceInformation = clientReferenceInformation;

      const orderInformation =
        new cybersourceRestApi.Riskv1authenticationsOrderInformation();
      const orderInformationAmountDetails =
        new cybersourceRestApi.Riskv1authenticationsOrderInformationAmountDetails();
      orderInformationAmountDetails.currency = "USD";
      orderInformationAmountDetails.totalAmount = "10.99";
      orderInformation.amountDetails = orderInformationAmountDetails;

      const orderInformationBillTo =
        new cybersourceRestApi.Riskv1authenticationsOrderInformationBillTo();
      orderInformationBillTo.address1 = "1 Market St";
      orderInformationBillTo.address2 = "Address 2";
      orderInformationBillTo.administrativeArea = "CA";
      orderInformationBillTo.country = "US";
      orderInformationBillTo.locality = "san francisco";
      orderInformationBillTo.firstName = "John";
      orderInformationBillTo.lastName = "Doe";
      orderInformationBillTo.phoneNumber = "4158880000";
      orderInformationBillTo.email = "test@cybs.com";
      orderInformationBillTo.postalCode = "94105";
      orderInformation.billTo = orderInformationBillTo;

      requestObj.orderInformation = orderInformation;

      const paymentInformation =
        new cybersourceRestApi.Riskv1authenticationsPaymentInformation();
      const paymentInformationCard =
        new cybersourceRestApi.Riskv1authenticationsPaymentInformationCard();
      paymentInformationCard.type = "001";
      paymentInformationCard.expirationMonth = "12";
      paymentInformationCard.expirationYear = "2025";
      paymentInformationCard.number = "4000000000000101";
      paymentInformation.card = paymentInformationCard;

      requestObj.paymentInformation = paymentInformation;

      const buyerInformation =
        new cybersourceRestApi.Riskv1authenticationsBuyerInformation();
      buyerInformation.mobilePhone = 1245789632;
      requestObj.buyerInformation = buyerInformation;

      const consumerAuthenticationInformation =
        new cybersourceRestApi.Riskv1decisionsConsumerAuthenticationInformation();
      consumerAuthenticationInformation.transactionMode = "MOTO";
      requestObj.consumerAuthenticationInformation =
        consumerAuthenticationInformation;

      const instance = new cybersourceRestApi.PayerAuthenticationApi(
        configObject,
        apiClient
      );

      instance.checkPayerAuthEnrollment(requestObj, (error, data, response) => {
        if (error) {
          console.log("\nError : " + JSON.stringify(error));
          reject(error);
        } else if (data) {
          resolve({ error, data, response });
        }

        console.log(
          "\nResponse Code of Check Payer Auth Enrollment : " +
            JSON.stringify(response["status"])
        );
        resolve({ error, data, response });
      });
    } catch (error) {
      console.log("\nException on calling the API : " + error);
      reject(error);
    }
  });
};

module.exports = {
  create_instrument_identifier_card,
  create_payment_instrument_card,
  setup_completion_with_card_number,
  enroll_with_pending_authentication,
};
