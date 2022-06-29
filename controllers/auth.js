import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

export const Register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    throw new BadRequestError("Email already in use");
  }

  const user = await User.create({ name, email, password });

  const token = user.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({
      user: {
        name: user.name,
        email: user.email,
        lastname: user.lastname,
        location: user.location,
      },
      token,
      location: user.location,
    });
};

export const Login = async (req, res) => {
  const {email , password} = req.body;

  if(!email || !password){
    throw new BadRequestError('Please provide all values');
  }

  const user = await User.findOne({email}).select("+password");

  if(!user){
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if(!isPasswordCorrect){
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  const token = user.createJWT();

  user.password = undefined;

  res.status(StatusCodes.OK).json({user, token, location: user.location});
};

export const updateUser = async (req, res) => {
  const {name, email, location, lastname, image} = req.body;

  if(!name || !email){
    throw new BadRequestError('Please provide all values');
  }

  const user = await User.findById(req.user.userId);

  user.name = name;
  user.email = email;
  user.lastname = lastname;
  user.location = location;
  user.image = image;

  await user.save()
  
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({user, token, location: user.location});
};
