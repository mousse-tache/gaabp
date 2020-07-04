import PermissionTypes from "./permissionTypes"

function Permissions(user, permission) {

    if (!user) {
        return false;
    }

    switch(permission) {
        case PermissionTypes.CreateUser:
        case PermissionTypes.UpdateUser:
        case PermissionTypes.UpdateUnit:
            return (user.isAdmin || user.isChief)
        case PermissionTypes.DeleteUser:
        case PermissionTypes.DeactivateUnit:
        case PermissionTypes.CreateUnit:
        case PermissionTypes.CreateGroup:
        case PermissionTypes.UpdateGroup:
            return (user.isAdmin || user.isGroupChief)
        case PermissionTypes.AddNomination:
        case PermissionTypes.RemoveNomination:
            return (user.isAdmin || user.isGeneralCommissionner)
        default:
          return false
      } 
};

export default Permissions
