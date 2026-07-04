const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMessageViaMail = require("../config/email");
const { pendingAdminModel, userModel, postModel } = require("../models/users");
const sendOtp = require("../config/otp");
const { default: mongoose } = require("mongoose");
const testController = (req, res) => {
  res.json({ message: "Connection is healthy" });
};

//* user controller✅
const userRegisterController = async (req, res) => {
  try {
    const { username, email, gender, password, course } = req.body;

    const isExists = await userModel.findOne({ email: email });

    if (isExists) {
      return res.status(409).json({ message: "You are already Registered" });
    }

    const isInPendingAdmins = await pendingAdminModel.findOne({
      email: email,
    });

    if (isInPendingAdmins) {
      return res.status(409).json({
        message:
          "You are already registered as Admin. You can't create an account as user.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await userModel.insertOne({
      username,
      email,
      gender,
      course,
      password: hashPassword,
      role: "User",
      isBlocked: false,
    });

    const messageTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Registration Successful</title>
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="600" style="background:#ffffff; border-radius:8px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#16a34a; padding:20px; text-align:center;">
              <h2 style="color:#ffffff; margin:0;">
                Registration Successful 🎉
              </h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#1f2937;">
              <p style="font-size:16px;">
                Hello <strong>${username}</strong>,
              </p>

              <p style="font-size:15px; line-height:1.6;">
                We're happy to inform you that your registration has been
                <strong>successfully completed</strong>.
              </p>

              <div style="background:#f0fdf4; border-left:4px solid #22c55e; padding:15px; margin:20px 0; font-size:14px;">
                ✅ Your account has been created and recorded in our system.
              </div>

              <p style="font-size:14px; line-height:1.6;">
                You can now proceed with the next steps as instructed by our team.
                If any additional verification is required, we’ll notify you via email.
              </p>

              <p style="font-size:14px; margin-top:25px;">
                If you did not perform this registration, please contact our support team immediately.
              </p>

              <p style="margin-top:30px; font-size:14px;">
                Best regards,<br/>
                <strong>Project_IC Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f3f4f6; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
              © 2026 Project_IC All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    sendMessageViaMail(email, "Registration successfull", messageTemplate);
    res.status(201).json({ message: "Register successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
    res.json({ message: "Internal server error!!!" });
  }
};

const userUpdateController = async (req, res) => {
  const { course, gender, username } = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token missing",
    });
  }
  const token = authHeader.split(" ")[1];

  const verifyData = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const id = verifyData.userId;

  await userModel.findByIdAndUpdate(id, {
    course: course,
    gender: gender,
    username: username,
  });

  res.json({ message: "user updated successfully", token });
};

const userDeleteController = async (req, res) => {
  const data = req.headers.authorization;

  const token = data.split(" ")[1];

  const verifyData = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const id = verifyData.userId;

  const isPresent = await userModel.findById(id);
  if (!isPresent) {
    return res.json({ message: "User not exists" });
  }

  await userModel.findByIdAndDelete(id);
  res.json({ message: "uer deleted successfully" });
};

const allusersController = async (req, res) => {
  try {
    const data = req.user;

    const allusers = await userModel.find(
      {
        role: { $nin: ["Super Admin", "Admin"] },
      },
      { __v: 0 },
    );

    return res.json(allusers);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

//* admin controller
const adminRegisterController = async (req, res) => {
  try {
    const { username, email, gender, course } = req.body;

    const isExists = await userModel.findOne({ email: email });

    if (isExists) {
      return res.status(409).json({ message: "You are already Registered" });
    }

    const isInPendingAdmins = await pendingAdminModel.findOne({
      email: email,
    });

    if (isInPendingAdmins) {
      return res.status(401).json({
        message: "You are already register, wait for super admin's approval",
      });
    }

    await pendingAdminModel.insertOne({
      username,
      email,
      gender,
      course,
      role: "Admin",
    });

    const messageTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin Account Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#0f172a; padding:20px; text-align:center;">
              <h2 style="color:#ffffff; margin:0;">
                Admin Account Verification
              </h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#1f2937;">
              <p style="font-size:16px; margin-bottom:15px;">
                Hello <strong>${username}</strong>,
              </p>

              <p style="font-size:15px; line-height:1.6;">
                Thank you for requesting an <strong>Admin Account</strong>.  
                Your request has been successfully received and is currently
                <strong>under verification</strong> by our administration team.
              </p>

              <div style="background:#f9fafb; border-left:4px solid #2563eb; padding:15px; margin:20px 0; font-size:14px;">
                🔍 <strong>What happens next?</strong><br/><br/>
                • Our admins will review your request<br/>
                • Once approved, your <strong>Admin ID and Password</strong> will be sent to this email address<br/>
                • No action is required from you at this time
              </div>

              <p style="font-size:14px; line-height:1.6;">
                If your request is not approved, you will be notified with further details.
              </p>

              <p style="font-size:14px; margin-top:20px;">
                If you did not request an admin account or believe this was a mistake,
                please contact our support team immediately.
              </p>

              <p style="margin-top:30px; font-size:14px;">
                Best regards,<br/>
                <strong>Project_IC Administration Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f3f4f6; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
              © 2026 Project_IC All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    sendMessageViaMail(email, "Registration status", messageTemplate);

    const adminApprovalTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin Approval Required</title>
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="600" style="background:#ffffff; border-radius:8px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#b91c1c; padding:20px; text-align:center;">
              <h2 style="color:#ffffff; margin:0;">
                Action Required: Admin Approval
              </h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#1f2937;">
              <p style="font-size:16px;">
                Hello <strong>Super Admin</strong>,
              </p>

              <p style="font-size:15px; line-height:1.6;">
                A new <strong>Admin Registration Request</strong> has been submitted
                and requires your approval.
              </p>

              <div style="background:#fef2f2; border-left:4px solid #dc2626; padding:15px; margin:20px 0; font-size:14px;">
                ⚠️ <strong>Approval Required</strong><br/><br/>
                Please log in to the admin panel and review the registration request.
              </div>

              <p style="font-size:14px; line-height:1.6;">
                Once approved, the admin credentials will be automatically sent
                to the registered email address.
              </p>

              <p style="margin-top:30px; font-size:14px;">
                Regards,<br/>
                <strong>Project_IC </strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f3f4f6; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
              © 2026 Project_IC All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    sendMessageViaMail(
      process.env.SUPER_ADMIN_MAIL,
      "Admin Registration Approval",
      adminApprovalTemplate,
    );

    return res.status(202).json({
      message:
        "Your data is sent to the super admin. Please wait for approval.",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
    res.json({ message: "Internal server error!!!" });
  }
};

const adminUpdateController = async (req, res) => {
  const { course, gender, username } = req.body;
  const data = req.headers.authorization;
  const token = data.split(" ")[1];

  const verifyData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const id = verifyData.userId;

  await userModel.findByIdAndUpdate(id, {
    course: course,
    gender: gender,
    username: username,
  });

  res.json({ token });
};

const adminDeleteController = async (req, res) => {
  try {
    const data = req.headers.authorization;

    const token = data.split(" ")[1];

    const verifyData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const id = verifyData.userId;

    const user = await userModel.findById(id);
    if (!user) {
      return res.json({ message: "User not exists" });
    }

    await userModel.findByIdAndDelete(id);
    const accountDeletedTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Account Deleted</title>
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="600" style="background:#ffffff; border-radius:8px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#b91c1c; padding:20px; text-align:center;">
              <h2 style="color:#ffffff; margin:0;">
                Account Deleted Successfully
              </h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#1f2937;">
              <p style="font-size:16px;">
                Hello <strong>{{name}}</strong>,
              </p>

              <p style="font-size:15px; line-height:1.6;">
                This email confirms that your account has been
                <strong>successfully deleted</strong> from our system.
              </p>

              <div style="background:#fef2f2; border-left:4px solid #dc2626; padding:15px; margin:20px 0; font-size:14px;">
                🗑️ All associated data has been removed according to our data retention policy.
              </div>

              <p style="font-size:14px; line-height:1.6;">
                If you requested this action, no further steps are required.
              </p>

              <p style="font-size:14px; color:#b91c1c;">
                ⚠️ If you did <strong>not</strong> request this account deletion,
                please contact our support team immediately.
              </p>

              <p style="margin-top:30px; font-size:14px;">
                Regards,<br/>
                <strong>Your App Support Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f3f4f6; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
              © 2026 Project_IC All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    sendMessageViaMail(
      user.email,
      "Account Deleted successfully",
      accountDeletedTemplate,
    );
    res.json({ message: "user deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
//* pending admins controller✅
const pendingAdminsController = async (req, res) => {
  try {
    const admins = await pendingAdminModel.find({}, { _id: 0 });
    return res.status(200).json(admins);
  } catch (error) {
    console.log(error);
  }
};

//* pending admin status controller✅
const pendingAdminStausController = async (req, res) => {
  try {
    const { status, email } = req.body;
    if (status) {
      const admin = await pendingAdminModel.findOne({ email: email });

      const password = admin.username?.slice(0, 3) + 678281;

      const hashPassword = await bcrypt.hash(password, 10);

      const approveAdmin = {
        username: admin.username,
        email: admin.email,
        password: hashPassword,
        gender: admin.gender,
        course: admin.course,
        role: admin.role,
        isBlocked: false,
      };

      await userModel.insertOne(approveAdmin);

      const registrationApprovedTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Registration Approved</title>
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="600" style="background:#ffffff; border-radius:8px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#16a34a; padding:20px; text-align:center;">
              <h2 style="color:#ffffff; margin:0;">
                Registration Approved ✅
              </h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#1f2937;">
              <p style="font-size:16px;">
                Hello <strong>${admin.username}</strong>,
              </p>

              <p style="font-size:15px; line-height:1.6;">
                We're pleased to inform you that your registration request has been
                <strong>successfully approved</strong> by the Super Admin.
              </p>

              <div style="background:#f0fdf4; border-left:4px solid #22c55e; padding:15px; margin:20px 0; font-size:14px;">
                🔐 <strong>Your Login Credentials</strong><br/><br/>
                <strong>Email:</strong> ${email}<br/>
                <strong>Password:</strong> ${password}
              </div>

              <p style="font-size:14px; line-height:1.6;">
                You can now log in to the system using the credentials above.
              </p>

              <p style="font-size:14px; color:#b91c1c;">
                ⚠️ For security reasons, please change your password immediately after logging in.
              </p>

              <p style="margin-top:30px; font-size:14px;">
                Regards,<br/>
                <strong>Your App Administration Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f3f4f6; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
              © 2026 Your App. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

      sendMessageViaMail(
        email,
        "Registration Status",
        registrationApprovedTemplate,
      );
      await pendingAdminModel.deleteOne({ email });
      return res.status(200).json({ message: "Admin approval successfull" });
    } else {
      await pendingAdminModel.deleteOne({ email });

      const registrationDeleteTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Registration Status</title>
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="600" style="background:#ffffff; border-radius:8px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#b91c1c; padding:20px; text-align:center;">
              <h2 style="color:#ffffff; margin:0;">
                Registration Not Approved
              </h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#1f2937;">
              <p style="font-size:16px;">
              </p>

              <p style="font-size:15px; line-height:1.6;">
                Thank you for your interest in registering with us.
                After careful review, we regret to inform you that your
                <strong>registration request has not been approved</strong>.
              </p>

              <div style="background:#fef2f2; border-left:4px solid #dc2626; padding:15px; margin:20px 0; font-size:14px;">
                ❌ Your registration request has been declined by the Super Admin.
              </div>

              <p style="font-size:14px; line-height:1.6;">
                This decision may be due to incomplete information or not meeting
                our administrative requirements.
              </p>

              <p style="font-size:14px;">
                You may contact our support team if you believe this was a mistake
                or wish to reapply in the future.
              </p>

              <p style="margin-top:30px; font-size:14px;">
                Regards,<br/>
                <strong>Project_IC Administration Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f3f4f6; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
              © 2026 Project_IC All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
      sendMessageViaMail(
        email,
        "Registration Status",
        registrationDeleteTemplate,
      );
      return res.json({ message: "admin rejected " });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error please try again later" });
  }
};

//* login controller✅
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const pendingAdmin = await pendingAdminModel.findOne({ email: email });
    if (pendingAdmin) {
      return res.status(409).json({
        message:
          "Your approval has not been accepted by super admin please keep patient until super admin's approval",
      });
    }

    const user = await userModel.findOne({ email: email });

    if (!user) {
      res.status(404).json({ message: "Email not found" });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: "you are frozen." });
    }

    const match = await bcrypt.compare(String(password), user.password);

    if (!match) {
      res.status(401).json({ message: "Incorrect password" });
    }

    const jwt_token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        username: user.username,
        course: user.course,
        email: user.email,
        isBlocked: user.isBlocked,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" },
    );
    res.cookie("token", jwt_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successfully",
      role: user.role,
      username: user.username,
      email: user.email,
      _id: user._id,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Internal server error. please try again" });
  }
};

//* Verify email controller✅
const verifyEmailController = async (req, res) => {
  try {
    const { email } = req.body;

    const isUserExists = await userModel.findOne({ email: email });

    if (!isUserExists) {
      return res.status(409).json({ message: "User not exists" });
    }

    const generateOtp = () => {
      const otp = Math.floor(100000 + Math.random() * 900000);
      return otp;
    };
    const otp = generateOtp();

    const hashedOtp = await bcrypt.hash(String(otp), 10);

    // update on database
    await userModel.updateOne(
      { email: email },
      {
        $set: { OTP: hashedOtp },
      },
    );
    // send OTP to mail
    const otpTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="600" style="background:#ffffff; border-radius:8px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#2563eb; padding:20px; text-align:center;">
              <h2 style="color:#ffffff; margin:0;">
                OTP Verification
              </h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#1f2937;">
              <p style="font-size:16px;">
                Hello,
              </p>

              <p style="font-size:15px; line-height:1.6;">
                Use the One-Time Password (OTP) below to complete your verification.
              </p>

              <div style="
                margin:25px 0;
                padding:15px;
                background:#eff6ff;
                border:1px dashed #2563eb;
                text-align:center;
                font-size:24px;
                font-weight:bold;
                letter-spacing:4px;
                color:#1e40af;
              ">
                ${otp}
              </div>

              <p style="font-size:14px; line-height:1.6;">
                ⏱️ This OTP is valid for <strong>5 minutes</strong>.
              </p>

              <p style="font-size:14px; color:#b91c1c;">
                ⚠️ Do not share this OTP with anyone. Our team will never ask for it.
              </p>

              <p style="font-size:14px; margin-top:25px;">
                If you did not request this OTP, please ignore this email or contact support immediately.
              </p>

              <p style="margin-top:30px; font-size:14px;">
                Regards,<br/>
                <strong>Project_IC Security Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f3f4f6; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
              © 2026 Project_IC All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    sendOtp(email, "OTP verification", otpTemplate);

    res.status(200).json({ message: "Otp sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. please try again" });
  }
};

//* Verify OTP controller✅
const verifyOtpController = async (req, res) => {
  try {
    const { email, OTP } = req.body;

    const user = await userModel.findOne({ email: email });

    const hashedOtp = await bcrypt.compare(String(OTP), user.OTP);

    if (hashedOtp) {
      await userModel.updateOne(
        { email },
        {
          $unset: {
            OTP,
          },
        },
      );
      res.status(200).json({ message: "OTP verify successfully" });
    } else {
      res.status(401).json({ message: "wrong OTP entered" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. please try again" });
  }
};

//* Reset password controller✅
const resetpasswordController = async (req, res) => {
  try {
    const { email, password, rePassword } = req.body;

    if (password != rePassword) {
      return res.status(401).json({ msg: "Password mismatched" });
    }

    const user = await userModel.findOne({ email: email });

    const hashPassword = await bcrypt.hash(password, 10);

    await userModel.updateOne(
      { email: email },
      { $set: { password: hashPassword } },
    );
    const passwordUpdatedTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Updated</title>
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="600" style="background:#ffffff; border-radius:8px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#16a34a; padding:20px; text-align:center;">
              <h2 style="color:#ffffff; margin:0;">
                Password Updated Successfully
              </h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#1f2937;">
              <p style="font-size:16px;">
                Hello,${user.username}
              </p>

              <p style="font-size:15px; line-height:1.6;">
                This email confirms that your account password has been
                <strong>successfully updated</strong>.
              </p>

              <div style="background:#f0fdf4; border-left:4px solid #22c55e; padding:15px; margin:20px 0; font-size:14px;">
                ✅ Your new password is now active.
              </div>

              <p style="font-size:14px; line-height:1.6;">
                If you made this change, no further action is required.
              </p>

              <p style="font-size:14px; color:#b91c1c;">
                ⚠️ If you did <strong>not</strong> update your password, please reset it immediately
                or contact our support team.
              </p>

              <p style="margin-top:30px; font-size:14px;">
                Regards,<br/>
                <strong>Project_IC Security Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f3f4f6; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
              © 2026 Project_IC All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    sendMessageViaMail(email, "Update Password", passwordUpdatedTemplate);
    res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. please try again" });
  }
};

//* create question
const createQuestionController = async (req, res) => {
  try {
    const { question, answer, questionType, subject } = req.body;

    if (!question || !answer || !questionType || !subject) {
      return res.json({ msg: "Fill all the fields" });
    }
    const data = req.user;
    await postModel.insertOne({
      question,
      answer,
      questionType,
      subject,
      course: data.course,
      writtenBy: new mongoose.Types.ObjectId(data.userId),
    });
    res.json({ message: "Question set successfully" });
  } catch (error) {
    console.log(error);
  }
};

//*
const allusersByCourseController = async (req, res) => {
  try {
    const data = req.user;
    const users = await userModel.find(
      { $and: [{ course: data.course }, { role: "User" }] },
      { _id: 0, password: 0, role: 0, updatedAt: 0, __v: 0 },
    );
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

const allQuestionsController = async (req, res) => {
  const { course } = req.user;

  const questions = await postModel.aggregate([
    {
      $match: {
        course: course,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "writtenBy",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        question: 1,
        answer: 1,
        questionType: 1,
        subject: 1,
        course: 1,
        role: 1,
        "user.email": 1,
        "user.username": 1,
      },
    },
  ]);

  res.json(questions);
};

const allAdminsController = async (req, res) => {
  try {
    const data = req.user;
    const admins = await userModel.find({ role: "Admin" });
    res.json(admins);
  } catch (error) {
    console.log(error);
  }
};

const freezeController = async (req, res) => {
  try {
    const { email, isBlocked } = req.body;

    const admin = await userModel.updateOne(
      { email: email },
      {
        $set: { isBlocked: isBlocked },
      },
    );

    //     const freezeAccountTemplate = `<!DOCTYPE html>
    // <html lang="en">
    //   <head>
    //     <meta charset="UTF-8" />
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    //     <title>Account Frozen</title>
    //   </head>
    //   <body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: Arial, Helvetica, sans-serif;">
    //     <table width="100%" cellpadding="0" cellspacing="0">
    //       <tr>
    //         <td align="center" style="padding: 40px 0;">
    //           <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">

    //             <!-- Header -->
    //             <tr>
    //               <td style="background-color: #ffc107; padding: 20px; text-align: center;">
    //                 <h1 style="color: #000000; margin: 0; font-size: 24px;">
    //                   Account Frozen
    //                 </h1>
    //               </td>
    //             </tr>

    //             <!-- Body -->
    //             <tr>
    //               <td style="padding: 30px; color: #333333;">
    //                 <p style="font-size: 16px; margin-bottom: 16px;">
    //                   Hello,
    //                 </p>

    //                 <p style="font-size: 16px; margin-bottom: 16px;">
    //                   This is to inform you that <strong>your account has been temporarily frozen</strong> by a <strong>Super Admin</strong>.
    //                 </p>

    //                 <p style="font-size: 16px; margin-bottom: 16px;">
    //                   While your account is frozen, you will not be able to access the system or perform any actions.
    //                 </p>

    //                 <p style="font-size: 16px; margin-bottom: 16px;">
    //                   If you believe this action was taken in error or you would like more information regarding this decision, please contact the system administrator for assistance.
    //                 </p>

    //                 <p style="font-size: 16px;">
    //                   We appreciate your cooperation and understanding.
    //                 </p>

    //                 <p style="font-size: 16px; margin-top: 30px;">
    //                   Regards,<br />
    //                   <strong>Admin Team</strong>
    //                 </p>
    //               </td>
    //             </tr>

    //             <!-- Footer -->
    //             <tr>
    //               <td style="background-color: #f4f6f8; padding: 15px; text-align: center; font-size: 12px; color: #777777;">
    //                 © 2026 Your Company Name. All rights reserved.
    //               </td>
    //             </tr>

    //           </table>
    //         </td>
    //       </tr>
    //     </table>
    //   </body>
    // </html>
    // `;
    // sendMessageViaMail(email, "⚠️ Account Freeze", freezeAccountTemplate);
    return res.status(403).json({ message: "Account has been freeze" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteController = async (req, res) => {
  try {
    const { email } = req.body;

    await userModel.deleteOne({ email: email });

    const deleteAdminTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Account Deleted</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 40px 0;">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background-color: #dc3545; padding: 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">
                  Account Deleted
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 30px; color: #333333;">
                <p style="font-size: 16px; margin-bottom: 16px;">
                  Hello,
                </p>

                <p style="font-size: 16px; margin-bottom: 16px;">
                  We want to inform you that <strong>your account has been deleted</strong> by a <strong>Super Admin</strong>.
                </p>

                <p style="font-size: 16px; margin-bottom: 16px;">
                  As a result, you will no longer have access to the system or its associated features.
                </p>

                <p style="font-size: 16px; margin-bottom: 16px;">
                  If you believe this action was taken in error or you need further clarification, please contact the system administrator.
                </p>

                <p style="font-size: 16px;">
                  Thank you for your understanding.
                </p>

                <p style="font-size: 16px; margin-top: 30px;">
                  Regards,<br />
                  <strong>Admin Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #f4f6f8; padding: 15px; text-align: center; font-size: 12px; color: #777777;">
                © 2026 Project_IC All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
    sendMessageViaMail(email, "Account Delete", deleteAdminTemplate);
    res
      .status(200)
      .json({ message: "User deleted successfully", email: email });
  } catch (error) {
    console.log(error);
  }
};

const filterQuestions = async (req, res) => {
  try {
    const { course, subject, questionType, companyType } = req.body;
    console.log(course, subject, questionType, companyType);
    const data = await postModel.aggregate([
      {
        $match: {
          course: course,
          subject: subject,
          questionType: questionType,
          companyType: companyType,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "writtenBy",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          question: 1,
          answer: 1,
          questionType: 1,
          subject: 1,
          course: 1,
          role: 1,
          companyType: 1,
          "user.email": 1,
          "user.username": 1,
        },
      },
    ]);
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const filterQuestionsByTypeController = async (req, res) => {
  try {
    const { course } = req.user;
    const { questionType } = req.body;
    if (
      questionType == null ||
      questionType == undefined ||
      questionType == ""
    ) {
      const data = await postModel.find({ course: course });
      return res.json(data);
    }
    const data = await postModel.find({
      $and: [{ course: course }, { questionType: questionType }],
    });
    res.json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const getQuestionController = async (req, res) => {
  try {
    const { _id } = req.body;
    const data = await postModel.findById(_id);
    res.json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const updateQuestionController = async (req, res) => {
  try {
    const data = req.body;
    const updateData = await postModel.findByIdAndUpdate(data._id, { ...data });
    res.json(updateData);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteQuestionController = async (req, res) => {
  try {
    const { id } = req.body;
    await postModel.findByIdAndDelete(id);
    res.json({ message: "Succesfully deleted " });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  testController,
  userRegisterController,
  pendingAdminsController,
  pendingAdminStausController,
  loginController,
  verifyEmailController,
  verifyOtpController,
  resetpasswordController,
  adminRegisterController,
  adminUpdateController,
  adminDeleteController,
  allusersController,
  userUpdateController,
  userDeleteController,
  createQuestionController,
  allusersByCourseController,
  allQuestionsController,
  allAdminsController,
  freezeController,
  deleteController,
  filterQuestions,
  filterQuestionsByTypeController,
  getQuestionController,
  updateQuestionController,
  deleteQuestionController,
};
