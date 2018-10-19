/* Created by cridequegerWorkBase at 2018/9/26 */
import expressJwt from "express-jwt";
// express-jwt中间件帮我们自动做了token的验证以及错误处理，所以一般情况下我们按照格式书写就没问题，其中unless放的就是你想要不检验token的api。
const jwtAuth = expressJwt({secret: 'secret'}).unless({path: ["/login", "/register"]});

export default jwtAuth;