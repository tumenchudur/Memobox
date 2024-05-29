import dbUser from "../db/db_user.mjs";
import fetch from "node-fetch";

class UserController {
  async login(req, res) {
    try {
      const { phone } = req.body;
      const smsUrl = process.env.SMS_API_URL;
      const tenantID = process.env.TENANT_ID;
      console.log(smsUrl, tenantID);
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpire = new Date(Date.now() + 2 * 60 * 1000);

      const user = await dbUser.findUserByPhone(phone);

      if (user) {
        if (user.otp_code_expire && user.otp_code_expire > new Date()) {
          return res.status(400).send({ error: "OTP already sent" });
        }
        await dbUser.updateUser(phone, otp, otpExpire);
      } else {
        await dbUser.addUser(phone, otp, otpExpire);
      }

      const response = await fetch(smsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Tenant-ID": tenantID,
        },
        body: JSON.stringify({
          number: phone,
          text: `Memobox OTP code: ${otp}`,
        }),
      });

      if (!response.ok) {
        return res
          .status(response.status)
          .send({ error: "Failed to send OTP" });
      }

      res
        .status(200)
        .send({ message: "Нэг удаагийн код амжилттай илгээгдлээ." });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }

  async verifyOtp(req, res) {
    const { phone, otp } = req.body;

    try {
      const user = await dbUser.findUserByPhone(phone);

      if (!user) {
        return res.status(404).send({ error: "Phone number not found" });
      }

      if (new Date(user.otp_code_expire) < new Date()) {
        return res
          .status(400)
          .send({ error: "Нэг удаагийн код хүчинтэй хугацаа дууссан." });
      }

      if (user.otp_code !== otp) {
        return res.status(400).send({ error: "Нэг удаагийн код буруу байна." });
      }

      const sid = Math.random().toString(36).substring(2);
      const sessionExpire = new Date(Date.now() + 24 * 60 * 60 * 1000);

      await dbUser.createSession(user.id, sid, sessionExpire);
      res.cookie("session_token", sid, {
        httpOnly: true,
        expires: sessionExpire,
      });
      res.send({
        message: "OTP verified successfully",
        phone: user.phone,
      });
    } catch (error) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
}

const userController = new UserController();
export default userController;
