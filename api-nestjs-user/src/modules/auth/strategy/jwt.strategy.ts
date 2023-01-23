import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from "@nestjs/passport";
// import { ExtractJwt, Strategy } from "passport-jwt";

// import { JwtPayload } from "./jwt-payload.interface";
// import { UserService } from "../../user/user.service";
// import { User } from "../../user/entities/user.entity";
// import { ResponseHandlerService } from "../../helper/response-handler.service";
// import { Constants } from "../../helper/constant";
// import { UserStatus } from "../../user/enums/user-status.enum";

@Injectable()
export class JwtStrategy {}
// extends PassportStrategy(Strategy, 'jwt') {
// constructor(
//   private userService: UserService,
//   private readonly configService: ConfigService,
//   private responseHandler: ResponseHandlerService
// ) {
//   super({
//     secretOrKey: configService.get("JWT_SECRET_KEY"),
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     ignoreExpiration: false,
//   });
// }
// async validate(payload: JwtPayload): Promise<User> {
//   const { id } = payload;
//   const user: User = await this.userService.findOne(id);
//   if (!user) {
//     await this.responseHandler.response(
//       Constants.MESSAGES.EN.API_UNAUTHORIZED,
//       HttpStatus.UNAUTHORIZED,
//       null
//     );
//   }
//   if (user.status === UserStatus.INACTIVE) {
//     await this.responseHandler.response(
//       Constants.MESSAGES.EN.API_ACCOUNT_SUSPENDED,
//       HttpStatus.FORBIDDEN,
//       null
//     );
//   }
//   return user;
// }
// }
