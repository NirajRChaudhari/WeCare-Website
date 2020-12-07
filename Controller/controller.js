const { response } = require("express");
const users = require("../Model/users_schema");
const coaches = require("../Model/coaches_schema");
const bookings = require("../Model/bookings_schema");
const validators = require("../Utilities/validators");

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

  if (validators.validateName(res, name)) {
    if (validators.validatePassword(res, password)) {
      if (validators.validateAge(res, dateOfBirth)) {
        if (validators.validateGender(res, gender)) {
          if (validators.validateMobileNumber(res, mobileNumber)) {
            if (validators.validateEmail(res, email)) {
              if (validators.validatePincode(res, pincode)) {
                if (validators.validateCity(res, city)) {
                  if (validators.validateState(res, state)) {
                    if (validators.validateCountry(res, country)) {
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
                            send_msg(
                              res,
                              400,
                              "Creation of User Record Failed"
                            );
                          } else {
                            send_msg(res, 201, id);
                          }
                        });
                      }
                    } //country
                  } //state
                } //city
              } //pincode
            } //email
          } //mobile
        } //gender
      } //age
    } //pass
  } //name
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

  if (validators.validateName(res, name)) {
    if (validators.validatePassword(res, password)) {
      if (validators.validateAge(res, dateOfBirth)) {
        if (validators.validateGender(res, gender)) {
          if (validators.validateMobileNumber(res, mobileNumber)) {
            if (validators.validateSpeciality(res, speciality)) {
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
            } //speciality
          } //mobile
        } //gender
      } //dateOfBirth
    } //password
  } //name
};

exports.post_users_booking_userID_coachID = async (req, res) => {
  let userID = req.params.userID;
  let coachID = req.params.coachID;

  let slot = req.body.Slot;
  let dateOfAppointment = req.body.DateOfAppointment;

  //Imp:- write await here as await mongo operations are performed in the called function
  let result = await validators.booking_validations(
    res,
    userID,
    coachID,
    slot,
    dateOfAppointment
  );

  if (result) {
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

  //Check if slot is valid
  if (!validators.validateSlot(res, slot)) {
    return;
  } else {
    if (!validators.validateDateIn7Days(res, dateOfAppointment)) {
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
        await bookings.findOneAndUpdate(
          { BookingId: bookingId },
          { $set: { Slot: slot, AppointmentDate: dateOfAppointment } }
        ); //use $set here
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
