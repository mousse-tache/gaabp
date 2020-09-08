import PermissionTypes from "./permissionTypes"
import NominationTypes from "../utils/nominationTypes"

function Permissions(user, permission) {

    if (!user) {
        return false;
    }

    const isGeneralCommissionner = () => {
        return user?.nominations.filter(x => x.type === NominationTypes.VPScout && !x.ed).length > 0;
    };

    const isCommissionner = () => {
        return user?.nominations.filter(x => x.type.includes("Commissaire") && !x.ed).length > 0;
    };

    const isChief = () => {
        return user?.nominations.filter(x => x.type === NominationTypes.Chef && !x.ed).length > 0;
    };
    
    const isGroupChief = () => {
        return user?.nominations.filter(x => x.type === NominationTypes.Chef && !x.unitId && !x.ed).length > 0;
    };

    const isFormateur = () => {
        return user?.formations.filter(x => x.niveau.id === "32" && x.dateConfirmed).length > 0;
    };

    switch(permission) {
        case PermissionTypes.CreateUser:
        case PermissionTypes.UpdateUser:
        case PermissionTypes.UpdateUnit:
        case PermissionTypes.ViewUsers:
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
            return (user.isAdmin || isFormateur() || isCommissionner() || isGeneralCommissionner());
        case PermissionTypes.ConfirmFormation:
            return (user.isAdmin || isCommissionner() || isGeneralCommissionner());
        default:
          return false
      } 
};

export default Permissions
