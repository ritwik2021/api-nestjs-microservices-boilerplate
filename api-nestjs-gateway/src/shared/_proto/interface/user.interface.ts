export interface UserServiceInterface {
  create(CreateUserDto);
  login(LoginUserDto);
  findOneByEmailOrUsername(EmailOrUsername);
  updateProfile(UpdateProfileDto);
  findOneById(UserId);
  listUsers(ListUsersDto);
  healthCheck(MessageDef);
  getUsersByFilters(GetUsersDto);
  getUserById(GetUserByIdDto);
  convertHashToString(convertHashToStringDto);
  generateHashOfString(generateHashOfStringDto);
}
