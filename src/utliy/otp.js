
const sendOTP = (req, res, next) => {
  try {
      const accountSid = process.env.OTPSEND_ACCOUNTSID;
      const authToken =  process.env.SENDOTP_AUTHTOKEN;
      const client = require('twilio')(accountSid, authToken);

      const otp = Math.floor(100000 + Math.random() * 900000);

      req.session.otp = otp

      client.messages
          .create({
              body: otp,
              from: '+12513103691',
              to: '+919913001249'
          })
          .then(message => next())

  } catch (error) {
      console.log("sendOTP error:", error);
      
  }
}

const verifyOTP = (req, res, next) => {
  try {
      console.log("verifyOTP", req.session.otp)

      if (req.session.otp == req.body.otp) {
          next()
      }

      res.status(400).json({
          success: false,
          message: "OTP invalid..!"
      })

  } catch (error) {
      console.log("verifyOTP error:", error);
  }
}

module.exports = {
  sendOTP,
  verifyOTP
}



// const { session } = require('passport');
// const { trace } = require('../routes/api/v1/users.routes');

// const varification = async (req, res, next) => {
//   console.log("aaaa");
  
//   try {
//     const accountSid = 'ACfa2a11a80b338e915ee3b12158d7151f';
//     const authToken = '54a2ab0b8e4b0a587c972efdf179705c';

//     const client = require('twilio')(accountSid, authToken);
//     const otp = Math.floor(1000 + Math.random() * 9000);
//     client.messages
//     req.session.otp=otp
//       .create({
//         body: otp,
//         to: '+919913001249', // Text your number
//         from: '+12513103691', // From a valid Twilio number

//       })
//       .then(message => next());

//   } catch (error) {
//     console.log(error);

//   }
// }
// const varificationotp = async (req, res, next) => {
//   console.log("");

// }
// module.exports = { varification, varificationotp }




// DX56R6D61CAYHCVDYLH7YAJX

// KALBH511FVMV9HXB4H81RDQP

// # /categories/categories-list:
// #   get:
// #    parameters:
// #       - in: query
// #         name: page
// #         schema:
// #           type: integer
// #         description: The number of items to skip before starting to collect the result set
// #       - in: query
// #         name: pageSize
// #         schema:
// #           type: integer
// #         description: The numbers of items to return
// #     summary: Returns a list of users.
// #     description: Optional extended description in CommonMark or HTML.
// #     summary: Creates a user.
// #     tags:
// #     - categories   

// #     responses:
// #       '200':    # status code
// #         description: A JSON array of user names
// #         content:
// #           application/json:
// #             schema: 
// #               type: array
// #               items: 
// #                 type: string

                
                