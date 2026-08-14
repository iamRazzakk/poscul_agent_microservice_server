import { User } from "../app/modules/user/user.model";
import { emailQueue } from "../config/bullMQ.config";

const sendEmailToAllUsers = async () => {
  const users = await User.find({ verified: true }).select("email");
  const jobs = users.map((user) => ({
    name: "send-email",
    data: {
      to: user.email,
      subject: "New Product Launched 🚀",
      html: `
        <h2>Hello ${user?.name}</h2>
        <p>We have launched a brand new product. Check it out now!</p>
      `,
    },
    // opts: {
    //   jobId: `email_${user.email}`,
    // },
  }));
  await emailQueue.addBulk(jobs);
  return {
    totalUsers: users.length,
    message: "All emails added to queue successfully",
  };
};

export const EmailService = {
  sendEmailToAllUsers,
};
