const { validationResult } = require("express-validator");
const md5 = require("md5");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const dns = require("dns");
const os = require("os");

exports.hashToPassword = (password) => {
  return md5(password);
};

exports.handleValidation = (req) => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty() === false) {
    return {
      message: "Geçersiz veri",
      success: false,
      error: true,
      validationErrors: validationErrors.array(),
      timestamp: new Date(),
      code: StatusCodes.BAD_REQUEST,
    };
  }
  return null;
};

exports.createToken = (userId, userName) => {
  const token = jwt.sign({ userId, userName }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
    issuer: "localhost",
  });
  return token;
};

exports.verifyToken = (token) => {
  const isVerify = { decodedToken: null };
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return isVerify.decodedToken = decodedToken;
  } catch (error) {
    console.log("helperde hata oldu verify tokende");
    throw new Error("Token validate sırasında hata oluştu");
  }
};

exports.getHost = () => {  
  return new Promise((resolve) => {  
    dns.lookup(os.hostname(), (err, ip) => {  
      resolve(`http://${ip}:${process.env.PORT}`);  
    });  
  });  
};  