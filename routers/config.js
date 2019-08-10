

const Router = require("koa-router");
const user = require("../models/User");
// const config = new Router({ prefix:"config" });
const config = new Router();
// const secret = require("../utils/secret");

const USER = "/user";

/**@api {post}  /config/user 管理员新增用户
 * @apiGroup Config
 * @apiHeader { String } Authorization 用户token
 * @apiParam { String } name 用户名
 * @apiParam { String } password 密码
 * @apiParam { String } [avatUrl] 头像，默认null
 * @apiPermission adminToken
 * @apiSuccess { Number } code 状态码
 * @apiSuccess { String } message 提示信息
 * @apiSampleRequest /config/user
 * @apiVersion 0.1.0
 * */ 

config.post(USER, async ctx => {
  const { name, password, avatUrl=null } = ctx.request.body;
  // console.log(password);
  try{
    let data = await user.findOne({ name });
    if(data){
      ctx.body = { code:202, message:"当前用户名已存在！" };
    }
    else {
      await user.create({ name, password, avatUrl });
      ctx.body = { code:201, message: "用户新增成功！" };
    }
    
  }
  catch(err){
    console.log(err);
  }
});

config.delete(USER, async (ctx) => {
  const { _id } = ctx.request.body;
  await user.findByIdAndRemove(_id);
  ctx.body = { code:201, message:"删除用户成功!" };
});

config.put(USER, async (ctx) => {
  const { _id, ...obj } = ctx.request.body;
  if(!_id){
    ctx.body= { code:400, message:"缺少参数: _id!" };
  }
  else{
    await user.findByIdAndUpdate(_id, obj);
    let data = await  user.find({ _id });
    ctx.body = { code:401, message:"修改信息成功", data };
  }
  
});

config.get(USER, async (ctx) => {
  let data = await user.find().populate("teams");
  ctx.body = {  code:200, message:"获取用户成功", data };
} );

module.exports = config;