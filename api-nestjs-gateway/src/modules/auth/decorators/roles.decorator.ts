import 'reflect-metadata';
import { UserRole } from '../guards/role.enum';

export const ROLES_KEY = 'roles';
export const RolesDecorator = (...roles: UserRole[]) => {
  return Reflect.metadata(ROLES_KEY, roles);
};
