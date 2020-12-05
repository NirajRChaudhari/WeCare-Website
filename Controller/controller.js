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
  let age = req.body.age;
  let gender = req.body.gender;
  let mobileNumber = req.body.mobileNumber;
  let email = req.body.email;
  let pincode = req.body.pincode;
  let city = req.body.city;
  let state = req.body.state;
  let country = req.body.country;

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
            if (mobileNumber != undefined && mobileNumber.length != 10) {
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
                if (pincode != undefined && pincode.length != 6) {
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

      let usr = await users.create(obj, function (err, result) {
        if (err) {
          send_msg(res, 400, "Creation of Record Failed");
        } else {
          send_msg(res, 201, id);
        }
      });
    }
  }
};

exports.post_coaches_login = async (req, res) => {
  res.send("<h1>Post Coaches Login</h1>");
};

exports.post_coaches = async (req, res) => {
  let name = req.body.name;
  let password = req.body.password;
  let dateOfBirth = req.body.dateOfBirth;
  let gender = req.body.gender;
  let mobileNumber = req.body.mobileNumber;
  let speciality = req.body.speciality;

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
        //Validate Gender
        if (gender != undefined && gender != "F" && gender != "M") {
          send_msg(res, 400, "Gender should be either M or F");
          return false;
        } else {
          //Validate MobileNumber
          if (mobileNumber != undefined && mobileNumber.length != 10) {
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
      } //else Password
    } //else Name
  }
};

exports.post_users_booking_userID_coachID = async (req, res) => {
  res.send("<h1>Post users booking userID coachID</h1>");
};

//      PUT Methods
exports.put_booking_bookingID = async (req, res) => {
  res.send("<h1>Put booking bookingID</h1>");
};

//      DELETE Methods
exports.delete_booking_bookingID = async (req, res) => {
  res.send("<h1>Delete booking bookingID</h1>");
};

//      GET Methods
exports.get_coaches_all = async (req, res) => {
  res.send("<h1>Get coaches all</h1>");
};

exports.get_coaches_booking_coachID = async (req, res) => {
  res.send("<h1>Get coaches booking coachID</h1>");
};

exports.get_coaches_coachID = async (req, res) => {
  res.send("<h1>Get coaches coachID</h1>");
};

exports.get_users_booking_userID = async (req, res) => {
  res.send("<h1>Get users booking userID</h1>");
};

exports.get_users_userID = async (req, res) => {
  res.send("<h1>Get users userID</h1>");
};

exports.default_invalid_path = async (req, res) => {
  res.send("<h1>Welcome to WeCare's Website</h1>");
};
