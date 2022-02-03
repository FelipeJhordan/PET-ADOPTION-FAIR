export const verifyRoleMatch = (
  roleName: string,
  requiredRoles: string[],
) => {
  return (
    roleName.includes('ADMIN') ||
    requiredRoles.some((r) => r === roleName)
  );
};
