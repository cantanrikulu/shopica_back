const User = require("../models/user.model");
const Comment = require("../models/comment.model");
// const { sendBotMessage } = require("./telegram.service");
const utils = require("../utils/index");
const fileService = require("./file.service");

exports.register = async (req) => {
  try {
    const { name, surname, email, password, birthDate, gender } = req.body;
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      throw new Error("Bu email zaten kulllanımda");
    }
    const _password = utils.helper.hashToPassword(password);

    const user = new User({
      name,
      surname,
      email,
      password: _password,
      birthDate,
      gender,
      zodiacSign: zodiacSign,
    });
    await user.save();
    const token = utils.helper.createToken(user._id, user.name);

    return { user, token };
  } catch (error) {
    throw new Error(error);
  }
};

exports.login = async (req) => {
  try {
    const { email, password } = req.body;
    const _password = utils.helper.hashToPassword(password);
    const user = await User.findOne({ email: email, password: _password });
    if (!user) {
      throw new Error("Kullanıcı bilgileri yanlış!");
    }
    const token = utils.helper.createToken(user._id, user.name);
    return { user, token };
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateUser = async (req) => {
  try {
    const { userId } = req.params;
    const { name, surname, gender, adress } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name: name, surname: surname, gender: gender, adress: adress },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

exports.changePassword = async (req) => {
  try {
    const { id } = req.params;
    const { password, newPassword } = req.body;
    const existUser = await User.findById(id);
    if (!existUser) {
      throw new Error("Kullanıcı bulunamadı");
    }
    const _password = utils.helper.hashToPassword(password);
    const _newPassword = utils.helper.hashToPassword(newPassword);
    if (existUser.password === _password) {
      existUser.password = _newPassword;
      await existUser.save();
      return existUser;
    } else {
      throw new Error("Şifre yanlış");
    }
  } catch (error) {
    throw new Error(error);
  }
};

exports.getUserComments = async (req) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) throw new Error("Kullanıcı bulunamadı");

    const comments = await Comment.find({
      _id: { $in: user.comments },
    });
    return comments;
  } catch (error) {
    throw new error(error);
  }
};

exports.deleteUser = async (req) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }
    const deleteUser = await User.findByIdAndDelete(userId);
    await sendBotMessage(
      `❌ Kullanıcı silindi: ${deleteUser.name} ${deleteUser.surname} (${deleteUser.email})Toplam kullanıcı: ${totalUsers}`
    );

    return "Kullanıcı başarılı şekilde silindi";
  } catch (error) {
    throw new Error(error);
  }
};

exports.uploadProfilePhoto = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }
    const imageUrl = await fileService.uploadImage(req, res);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: imageUrl },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
};
