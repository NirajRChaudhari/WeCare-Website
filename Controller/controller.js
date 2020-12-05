const { response } = require("express");
let { users, coaches, bookings } = require("../Model/schema");

let send_msg = async (res, status, message) => {
  res.status(status).send({
    message: message,
  });
};

//      POST Methods
exports.post_users_login = async (req, res) => {
  let id = req.body.id;
  let password = req.body.password;

  let user_exists = await users.findOne({ UserId: id, Password: password });
  if (user_exists == null) {
    send_msg(res, 400, "Incorrect user id or password");
  } else {
    res.status(200).send(true);
  }
};

exports.post_users = async (req, res) => {
  let name = req.body.name;
  let password = req.body.password;
  let dateOfBirth = req.body.dateOfBirth;
  let gender = req.body.gender;
  let mobileNumber = req.body.mobileNumber;
  let email = req.body.email;
  let pincode = req.body.pincode;
  let city = req.body.city;
  let state = req.body.state;
  let country = req.body.country;

  //Just Check if valid date
  let temp = Date.parse(dateOfBirth);
  if (isNaN(temp)) {
    send_msg(res, 400, "Date should be any upcoming 7 days");
    return;
  }
  let age = (new Date() - new Date(dateOfBirth)) / (1000 * 3600 * 24 * 365.5);

  //Validate all values
  function validate() {
    //Validate Name
    if (name.length < 3 || name.length > 50) {
      send_msg(
        res,
        400,
        "Name should have minimum 3 and maximum 50 characters"
      );
      return false;
    } else {
      //Validate Password
      if (
        password != undefined &&
        (password.length < 5 || password.length > 10)
      ) {
        send_msg(
          res,
          400,
          "Password should have minimum 5 and maximum 10 characters"
        );
        return false;
      } else {
        //Validate Age
        if (age != undefined && (age < 20 || age > 100)) {
          send_msg(res, 400, "Age should be greater than 20 and less than 100");
          return false;
        } else {
          //Validate Gender
          if (gender != undefined && gender != "F" && gender != "M") {
            send_msg(res, 400, "Gender should be either M or F");
            return false;
          } else {
            //Validate MobileNumber
            if (
              mobileNumber != undefined &&
              String(mobileNumber).length != 10
            ) {
              send_msg(res, 400, "Mobile Number should have 10 digits");
              return false;
            } else {
              //Validate Email
              let regular_exp = /^([a-zA-Z0-9\.-]+)@([a-z0-9]+)\.([a-z]+)(\.[a-z]+)?$/;
              if (email != undefined && !email.match(regular_exp)) {
                send_msg(res, 400, "Email should be a valid one");
                return false;
              } else {
                //Validate Pincode
                if (pincode != undefined && String(pincode).length != 6) {
                  send_msg(res, 400, "Pincode should have 6 digits");
                  return false;
                } else {
                  //Validate City
                  if (
                    city != undefined &&
                    (city.length < 3 || city.length > 20)
                  ) {
                    send_msg(
                      res,
                      400,
                      "City should have minimum 3 and maximum 20 characters"
                    );
                    return false;
                  } else {
                    //Validate State
                    if (
                      state != undefined &&
                      (state.length < 3 || state.length > 20)
                    ) {
                      send_msg(
                        res,
                        400,
                        "State should have minimum 3 and maximum 20 characters"
                      );
                      return false;
                    } else {
                      //Validate Country
                      if (
                        country != undefined &&
                        (country.length < 3 || country.length > 20)
                      ) {
                        send_msg(
                          res,
                          400,
                          "Country should have minimum 3 and maximum 20 characters"
                        );
                        return false;
                      } else {
                        //Successfull Validation
                        return true;
                      } //else Country
                    } //else State
                  } //else City
                } //else Pincode
              } //else Email
            } //else MobileNumber
          } //else Gender
        } //else Age
      } //else Password
    } //else Name
  }

  //Do Validation
  if (validate()) {
    //Check if email already exists
    let email_exists = await users.findOne({ Email: email });
    if (email_exists != null) {
      send_msg(res, 400, "User exists with this email id");
    } else {
      //Assign new User's ID
      const count = await users.countDocuments();
      let id = "UI-" + String(count + 1).padStart(4, "0");

      let obj = {
        UserId: id,
        Name: name,
        Password: password,
        DateOfBirth: dateOfBirth,
        Gender: gender,
        MobileNumber: mobileNumber,
        Email: email,
        Pincode: pincode,
        City: city,
        State: state,
        Country: country,
      };

      await users.create(obj, function (err, result) {
        if (err) {
          send_msg(res, 400, "Creation of User Record Failed");
        } else {
          send_msg(res, 201, id);
        }
      });
    }
  }
};

exports.post_coaches_login = async (req, res) => {
  let id = req.body.id;
  let password = req.body.password;

  let coach_exists = await coaches.findOne({ CoachId: id, Password: password });
  if (coach_exists == null) {
    send_msg(res, 400, "Incorrect coach id or password");
  } else {
    res.status(200).send(true);
  }
};

exports.post_coaches = async (req, res) => {
  let name = req.body.name;
  let password = req.body.password;
  let dateOfBirth = req.body.dateOfBirth;
  let gender = req.body.gender;
  let mobileNumber = req.body.mobileNumber;
  let speciality = req.body.speciality;

  //Just Check if valid date
  let temp = Date.parse(dateOfBirth);
  if (isNaN(temp)) {
    send_msg(res, 400, "Date should be any upcoming 7 days");
    return;
  }
  let age = (new Date() - new Date(dateOfBirth)) / (1000 * 3600 * 24 * 365.5);

  //Validate all values
  function validate() {
    //Validate Name
    if (name.length < 3 || name.length > 50) {
      send_msg(
        res,
        400,
        "Name should have minimum 3 and maximum 50 characters"
      );
      return false;
    } else {
      //Validate Password
      if (
        password != undefined &&
        (password.length < 5 || password.length > 10)
      ) {
        send_msg(
          res,
          400,
          "Password should have minimum 5 and maximum 10 characters"
        );
        return false;
      } else {
        //Validate Age
        if (age != undefined && (age < 20 || age > 100)) {
          send_msg(res, 400, "Age should be greater than 20 and less than 100");
          return false;
        } else {
          //Validate Gender
          if (gender != undefined && gender != "F" && gender != "M") {
            send_msg(res, 400, "Gender should be either M or F");
            return false;
          } else {
            //Validate MobileNumber
            // For coaches mobileNumber is Number format not String unlike users so convert it to String to find length
            if (
              mobileNumber != undefined &&
              String(mobileNumber).length != 10
            ) {
              send_msg(res, 400, "Mobile Number should have 10 digits");
              return false;
            } else {
              //Validate Speciality
              if (
                speciality != undefined &&
                (speciality.length < 10 || speciality.length > 50)
              ) {
                send_msg(res, 400, "Specialty should have 10 to 50 characters");
                return false;
              } else {
                return true;
              } //else Speciality
            } //else MobileNumber
          } //else Gender
        } //else Age/ DateOfBirth
      } //else Password
    } //else Name
  }

  //Do Validation
  if (validate()) {
    //Check if email already exists
    let name_exists = await coaches.findOne({ Name: name });
    if (name_exists != null) {
      send_msg(res, 400, "Coach exists with this name");
    } else {
      //Assign new User's ID
      const count = await coaches.countDocuments();
      let id = "CI-" + String(count + 1).padStart(4, "0");

      let obj = {
        CoachId: id,
        Name: name,
        Password: password,
        DateOfBirth: dateOfBirth,
        Gender: gender,
        MobileNumber: mobileNumber,
        Speciality: speciality,
      };

      await coaches.create(obj, function (err, result) {
        if (err) {
          send_msg(res, 400, "Creation of Coach Record Failed");
        } else {
          send_msg(res, 201, id);
        }
      });
    }
  }
};

exports.post_users_booking_userID_coachID = async (req, res) => {
  let userID = req.params.userID;
  let coachID = req.params.coachID;

  let slot = req.body.Slot;
  let dateOfAppointment = req.body.DateOfAppointment;
  //Just Check if valid date
  let temp = Date.parse(dateOfAppointment);
  if (isNaN(temp)) {
    send_msg(res, 400, "Date should be any upcoming 7 days");
    return;
  }

  //Check if UserId exists
  let user_exists = await users.findOne({ UserId: userID });
  if (user_exists == null) {
    send_msg(res, 400, "User Id does not exist");
    return;
  } else {
    //Check if CoachId exists
    let coach_exists = await coaches.findOne({ CoachId: coachID });

    if (coach_exists == null) {
      send_msg(res, 400, "Coach Id does not exist");
      return;
    } else {
      //Check if slot is valid
      let slot_pattern = /[0-1]?[0-9]+\s(AM|PM)\sto\s[0-1]?[0-9]+\s(AM|PM)/;
      if (slot != undefined && !slot.match(slot_pattern)) {
        send_msg(res, 400, "Slot should be a valid one");
        return;
      } else {
        //Check if Date is in upcoming 7 days
        let today_date = new Date();
        let date_difference =
          (new Date(dateOfAppointment) - today_date) / (1000 * 3600 * 24);
        //if Date is not in next 7 days
        if (date_difference < 0 || date_difference > 7) {
          send_msg(res, 400, "Date should be any upcoming 7 days");
          return;
        } else {
          //Check if appointment on same day and time
          let already_appointment = await bookings.findOne({
            Slot: slot,
            AppointmentDate: dateOfAppointment,
          });
          if (already_appointment != null) {
            send_msg(res, 400, "There is an appointment in this slot already");
            return;
          } else {
            //Insert appointment in booking database
            const count = await bookings.countDocuments();
            let id = "B-" + String(count + 1).padStart(4, "0");
            let obj = {
              BookingId: id,
              UserId: userID,
              CoachId: coachID,
              AppointmentDate: dateOfAppointment,
              Slot: slot,
            };

            await bookings.create(obj, function (err, result) {
              if (err) {
                send_msg(res, 400, "Creation of Bookings Record Failed");
              } else {
                res.status(200).send(true);
              }
            });
          }
        } //else date valid (in upcoming 7 days)
      } //else slot valid
    } //else coach_exists
  } //else user_exists
};

//      PUT Methods
exports.put_booking_bookingID = async (req, res) => {
  let bookingId = req.params.bookingID;

  //Check if booking id is correct
  let booking = await bookings.findOne({ BookingId: bookingId });
  if (booking == null) {
    send_msg(res, 400, "Booking Id does not exist");
    return;
  }

  //Validate Slot and Date
  let slot = req.body.Slot;
  let dateOfAppointment = req.body.DateOfAppointment;
  //Just Check if valid date
  let temp = Date.parse(dateOfAppointment);
  if (isNaN(temp)) {
    send_msg(res, 400, "Date should be any upcoming 7 days");
    return;
  }

  //Check if slot is valid
  let slot_pattern = /[0-1]?[0-9]+\s(AM|PM)\sto\s[0-1]?[0-9]+\s(AM|PM)/;
  if (slot != undefined && !slot.match(slot_pattern)) {
    send_msg(res, 400, "Slot should be a valid one");
    return;
  } else {
    //Check if Date is in upcoming 7 days
    let today_date = new Date();
    let date_difference =
      (new Date(dateOfAppointment) - today_date) / (1000 * 3600 * 24);
    //if Date is not in next 7 days
    if (date_difference < 0 || date_difference > 7) {
      send_msg(res, 400, "Date should be any upcoming 7 days");
      return;
    } else {
      //Check if any appointment on same day and time
      let already_appointment = await bookings.findOne({
        Slot: slot,
        AppointmentDate: dateOfAppointment,
      });
      if (already_appointment != null) {
        send_msg(res, 400, "There is an appointment in this slot already");
        return;
      } else {
        //Update Record
        let obj = {
          Slot: slot,
          AppointmentDate: dateOfAppointment,
        };
        await bookings.findOneAndUpdate({ BookingId: bookingId }, obj);
        res.status(200).send(true);
      }
    } //else date valid (in upcoming 7 days)
  } //else slot valid
};

//      DELETE Methods
exports.delete_booking_bookingID = async (req, res) => {
  let bookingId = req.params.bookingID;

  //Check if booking id is correct
  let booking = await bookings.findOne({ BookingId: bookingId });
  if (booking == null) {
    send_msg(res, 400, "Could not delete this appointment");
  } else {
    await bookings.deleteOne({ BookingId: bookingId });
    res.status(200).send(true);
  }
};

//      GET Methods
exports.get_coaches_all = async (req, res) => {
  let all_coaches = await coaches.find({});
  res.status(200).send(all_coaches);
};

exports.get_coaches_booking_coachID = async (req, res) => {
  let coachID = req.params.coachID;
  let coach_bookings = await bookings.find({ CoachId: coachID });

  //find used insted of findOne so check length instead of checking null value
  if (coach_bookings.length == 0) {
    send_msg(res, 400, "Could not find any bookings");
  } else {
    res.status(201).send(coach_bookings);
  }
};

exports.get_coaches_coachID = async (req, res) => {
  let coachID = req.params.coachID;
  let coach = await coaches.findOne({ CoachId: coachID });

  if (coach == null) {
    send_msg(res, 400, "Coach Id does not exist");
  } else {
    res.status(201).send(coach);
  }
};

exports.get_users_booking_userID = async (req, res) => {
  let userID = req.params.userID;
  let user_bookings = await bookings.find({ UserId: userID });

  if (user_bookings.length == 0) {
    send_msg(res, 400, "Could not find any appointment details");
  } else {
    res.status(200).send(user_bookings);
  }
};

exports.get_users_userID = async (req, res) => {
  let userID = req.params.userID;
  let user = await users.findOne({ UserId: userID });

  if (user == null) {
    send_msg(res, 400, "User Id does not exist");
  } else {
    res.status(200).send(user);
  }
};

exports.default_invalid_path = async (req, res) => {
  send_msg(res, 404, "Invalid path");
};
