import Permissions from "@aabp/auth/permissions";
import useAuthUser from "@aabp/auth/useAuthUser";

function usePermissions(): (
  permissionType: string,
  unitId?: string,
) => boolean {
  const authedUser = useAuthUser();

  const perms = (permissionType: string, unitId = null) => {
    return Permissions(permissionType, authedUser, unitId);
  };

  return perms;
}

export default usePermissions;
