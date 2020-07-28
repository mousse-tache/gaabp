import PermissionTypes from "./permissionTypes"
import NominationTypes from "../utils/nominationTypes"

function Permissions(user, permission) {

    if (!user) {
        return false;
    }

    const isGeneralCommissionner = () => {
        return user?.nominations.filter(x => x.type === NominationTypes.VPScout && !x.ed);
    };

    const isCommissionner = () => {
        return user?.nominations.filter(x => x.type === NominationTypes.Commissaire && !x.ed);
    };

    const isChief = () => {
        return user?.nominations.filter(x => x.type === NominationTypes.Chef && !x.ed);
    };
    
    const isGroupChief = () => {
        return user?.nominations.filter(x => x.type === NominationTypes.Chef && !x.unitId && !x.ed);
    };

    switch(permission) {
        case PermissionTypes.CreateUser:
        case PermissionTypes.UpdateUser:
        case PermissionTypes.UpdateUnit:
            return (user.isAdmin || isChief() || isGroupChief() || isGeneralCommissionner());
        case PermissionTypes.DeleteUser:
        case PermissionTypes.DeactivateUnit:
        case PermissionTypes.CreateUnit:
        case PermissionTypes.CreateGroup:
        case PermissionTypes.UpdateGroup:
            return (user.isAdmin || isGroupChief() || isGeneralCommissionner());
        case PermissionTypes.AddNomination:
        case PermissionTypes.RemoveNomination:
            return (user.isAdmin || isGeneralCommissionner());
        case PermissionTypes.RecommendFormation:
            return (user.isAdmin || user.isFormateur);
        case PermissionTypes.ConfirmFormation:
            return (user.isAdmin || isCommissionner() || isGeneralCommissionner());
        default:
          return false
      } 
};

export default Permissions
