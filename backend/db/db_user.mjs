import { sql } from "./postgresql.mjs";

class DbUser {
  async addUser(phone, otpCode, otpCodeExpire) {
    try {
      const userId = await sql`
        INSERT INTO users (phone, otp_code, otp_code_expire)
        VALUES (${phone}, ${otpCode}, ${otpCodeExpire})
        RETURNING id;
      `;
      return userId;
    } catch (error) {
      console.error("Error adding user:", error);
      return { id: -1 };
    }
  }

  async findUserByPhone(phone) {
    try {
      const user = await sql`
        SELECT * FROM users WHERE phone = ${phone};
      `;
      return user[0];
    } catch (error) {
      console.error("Error finding user by phone:", error);
      return null;
    }
  }

  async updateUser(phone, otpCode, otpCodeExpire) {
    try {
      await sql`
        UPDATE users
        SET otp_code = ${otpCode}, otp_code_expire = ${otpCodeExpire}
        WHERE phone = ${phone};
      `;
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }
}

const dbUser = new DbUser();
export default dbUser;
