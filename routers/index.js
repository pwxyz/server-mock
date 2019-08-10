
const Router = require("koa-router");
// const user = require("../models/User");
const login = require("./login");
const config = require("./config");
const sign = require("./sign");
const team = require("./team");

const parsePassword = require("../middlewares/parsePassword");

const checkAdmin = require("../middlewares/checkAdmin");
const qsUrl = require("../middlewares/qsUrl");

const router = new Router();

router.get("/",  ctx => {
  ctx.body= { api:"welcome to web-api" };
});

// router.get("/", function(ctx){
//   ctx.body = { api:"this is api" };
// })


router.use(parsePassword);
router.use(qsUrl);
router.use("/",  login.routes(), login.allowedMethods() );
router.use("/config", checkAdmin, config.routes(), config.allowedMethods()  );
router.use("/", sign.routes(), sign.allowedMethods()  );
router.use("/", team.routes(), team.allowedMethods()  );

module.exports = router;