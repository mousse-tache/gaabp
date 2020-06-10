export default PermissionTypes = {
    CreateUser: "createUser",
    UpdateUser: "updateUser",
    DeleteUser: "deleteUser",
    CreateUnit: "createUnit",
    UpdateUnit: "updateUnit",
    DeactivateUnit: "deactivateUnit",
    CreateGroup: "createGroup",
    UpdateGroup: "updateGroup"
}

const Permissions = (user, permission) => {
    switch(permission) {
        case PermissionTypes.CreateUser:
        case PermissionTypes.UpdateUser:
        case PermissionTypes.UpdateUnit:
            return (user.isAdmin || user.isChief)
        case PermissionTypes.DeleteUser:
        case PermissionTypes.DeactivateUnit:
        case PermissionTypes.CreateUnit:
        case PermissionTypes.CreateGroup:
            return (user.isAdmin || user.isGroupChief)
        default:
          return false
      } 
};

export default Permissions
