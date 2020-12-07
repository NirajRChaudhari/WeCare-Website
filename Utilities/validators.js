const users = require("../Model/users_schema");
const coaches = require("../Model/coaches_schema");
const bookings = require("../Model/bookings_schema");

function send_msg(res, status, message) {
  res.status(status).send({
    message: message,
  });
}

exports.validateName = function (res, name) {
  if (name.length < 3 || name.length > 50) {
    send_msg(res, 400, "Name should have minimum 3 and maximum 50 characters");
    return false;
  } else {
    return true;
  }
};

exports.validatePassword = function (res, password) {
  if (password != undefined && (password.length < 5 || password.length > 10)) {
    send_msg(
      res,
      400,
      "Password should have minimum 5 and maximum 10 characters"
    );
    return false;
  } else {
    return true;
  }
};

exports.validateAge = function (res, dateOfBirth) {
  //Just Check if valid date
  let temp = Date.parse(dateOfBirth);
  if (isNaN(temp)) {
    send_msg(res, 400, "Birth date should be valid");
    return false;
  }
  let age = (new Date() - new Date(dateOfBirth)) / (1000 * 3600 * 24 * 365.5);

  if (age != undefined && (age < 20 || age > 100)) {
    send_msg(res, 400, "Age should be greater than 20 and less than 100");
    return false;
  } else {
    return true;
  }
};

exports.validateGender = function (res, gender) {
  if (gender != undefined && gender != "F" && gender != "M") {
    send_msg(res, 400, "Gender should be either M or F");
    return false;
  } else {
    return true;
  }
};

exports.validateMobileNumber = function (res, mobileNumber) {
  if (mobileNumber != undefined && String(mobileNumber).length != 10) {
    send_msg(res, 400, "Mobile Number should have 10 digits");
    return false;
  } else {
    return true;
  }
};

exports.validateEmail = function (res, email) {
  let regular_exp = /^([a-zA-Z0-9\.-]+)@([a-z0-9]+)\.([a-z]+)(\.[a-z]+)?$/;
  if (email != undefined && !email.match(regular_exp)) {
    send_msg(res, 400, "Email should be a valid one");
    return false;
  } else {
    return true;
  }
};

exports.validatePincode = function (res, pincode) {
  if (pincode != undefined && String(pincode).length != 6) {
    send_msg(res, 400, "Pincode should have 6 digits");
    return false;
  } else {
    return true;
  }
};

exports.validateCity = function (res, city) {
  if (city != undefined && (city.length < 3 || city.length > 20)) {
    send_msg(res, 400, "City should have minimum 3 and maximum 20 characters");
    return false;
  } else {
    return true;
  }
};

exports.validateState = function (res, state) {
  if (state != undefined && (state.length < 3 || state.length > 20)) {
    send_msg(res, 400, "State should have minimum 3 and maximum 20 characters");
    return false;
  } else {
    return true;
  }
};

exports.validateCountry = function (res, country) {
  if (country != undefined && (country.length < 3 || country.length > 20)) {
    send_msg(
      res,
      400,
      "Country should have minimum 3 and maximum 20 characters"
    );
    return false;
  } else {
    return true;
  }
};

exports.validateSpeciality = function (res, speciality) {
  if (
    speciality != undefined &&
    (speciality.length < 10 || speciality.length > 50)
  ) {
    send_msg(res, 400, "Specialty should have 10 to 50 characters");
    return false;
  } else {
    return true;
  } //else Speciality
};

exports.validateSlot = function (res, slot) {
  let slot_pattern = /[0-1]?[0-9]+\s(AM|PM)\sto\s[0-1]?[0-9]+\s(AM|PM)/;
  if (slot != undefined && !slot.match(slot_pattern)) {
    send_msg(res, 400, "Slot should be a valid one");
    return false;
  } else {
    return true;
  }
};

exports.validateDateIn7Days = function (res, dateOfAppointment) {
  //Just Check if valid date
  let temp = Date.parse(dateOfAppointment);
  if (isNaN(temp)) {
    send_msg(res, 400, "Date should be any upcoming 7 days");
    return false;
  }

  //Check if Date is in upcoming 7 days
  let today_date = new Date();
  let date_difference =
    (new Date(dateOfAppointment) - today_date) / (1000 * 3600 * 24);
  //if Date is not in next 7 days
  if (date_difference < 0 || date_difference > 7) {
    send_msg(res, 400, "Date should be any upcoming 7 days");
    return false;
  } else {
    return true;
  }
};

exports.booking_validations = async (
  res,
  userID,
  coachID,
  slot,
  dateOfAppointment
) => {
  //Check if UserId exists
  let user_exists = await users.findOne({ UserId: userID });
  if (user_exists == null) {
    send_msg(res, 400, "User Id does not exist");
    return false;
  } else {
    //Check if CoachId exists
    let coach_exists = await coaches.findOne({ CoachId: coachID });

    if (coach_exists == null) {
      send_msg(res, 400, "Coach Id does not exist");
      return false;
    } else {
      //Check if slot is valid
      if (!this.validateSlot(res, slot)) {
        return false; //Invalid slot
      } else {
        if (!this.validateDateIn7Days(res, dateOfAppointment)) {
          return false; //Not in next 7 days
        } else {
          //Check if appointment on same day and time
          let already_appointment = await bookings.findOne({
            Slot: slot,
            AppointmentDate: dateOfAppointment,
          });
          if (already_appointment != null) {
            send_msg(res, 400, "There is an appointment in this slot already");
            return false;
          } else {
            return true;
          } //else already appointment
        } //else date valid (in upcoming 7 days)
      } //else slot valid
    } //else coach_exists
  } //else user_exists
};
