/**
 * @api {post} /login 登录
 * @apiGroup Login
 * @apiParam {String} name 用户名
 * @apiParam {String} password 密码，长度不得小于8位，必须包含大写、小写字母及数字
 * @apiPermission name
 * @apiSuccess {String} token 返回token.
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} message 提示信息.
 * @apiSampleRequest /login
 * @apiSuccessExample { json } 成功返回示意图
 *{
 *   "code": 201,
 *   "message": "ok",
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlcjIiLCJfaWQiOiI1YjlmNDVlNDViYjlkODM3NjAxNGJjMjgiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTM4MTE2NTgzLCJleHAiOjE1Mzg3MjEzODN9.c42GYe4JleQr2OidXFWjyf-zbuvXl0o1htn74HtjiNc"
 *}
 */

const Router = require("koa-router");
const secret = require("../utils/secret");
const user = require("../models/User");
const { cert } = require("../config");
const jsonwebtoken = require("jsonwebtoken");

const login = new Router({ prefix:"login" });


login.post("/", async (ctx) =>{
  const { name, password }= ctx.request.body;
  if(!name||!password){
    ctx.body = { code: 400, message:"name或者password不存在" };
  }
  else {
    let obj = await user.findOne({ name }).select("name password isAdmin"); 
    const check = passwords => obj.password === passwords;
    if(obj&&check(password)){
      let token = jsonwebtoken.sign({name: obj["name"] , _id: obj["_id"], isAdmin: obj["isAdmin"]  }, secret(cert), { expiresIn: "7d" });
      ctx.body = { code: 201, message:"ok", token};
    }
    else {
      ctx.body = { code:401, message:"用户名或者密码不正确" };
    }

  }
  
} );

module.exports = login;