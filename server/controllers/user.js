import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";

export const signin = async (req, res) => {
  const { email, signInPass } = req.body;

  try {
    const existingUser = await user.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User does not exist" });

    const isPasswordCorrect = await bcrypt.compare(
      signInPass,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Password is incorrect" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, name } = req.body;
  try {
    const existingUser = await user.findOne({ email });
    if (existingUser)
      return res.status(400).send({ message: "Email already in use." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await user.create({
      email,
      password: hashedPassword,
      name,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
