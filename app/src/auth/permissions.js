import PermissionTypes from "./permissionTypes";

const Permissions = (permission, authedUser = null, unitId = null) => {
    if (!authedUser) {
        return false;
    }

    const isGeneralCommissionner = () => {
        return authedUser.nominations.filter(x => x.type.includes("VPScout") && !x.ed).length > 0;
    };

    const isManagementVicepResident = () => {
        return authedUser.nominations.filter(x => x.type.includes("VPGestion") && !x.ed).length > 0;
    };

    const isCommissionner = () => {
        return authedUser.nominations.filter(x => x.type.includes("Commissaire") && !x.ed).length > 0;
    };

    const isBranchCommissionner = () => {
        return authedUser.nominations.filter(x => x.type.includes("Commissaire") && x.type.includes("branche") && !x.ed).length > 0;
    };

    const isGroupCommissionner = () => {
        return  authedUser.nominations.filter(x => x.type.includes("Commissaire") && x.type.includes("Groupes") && !x.ed).length > 0;
    };

    const isChief = () => {
        if(unitId) {
            return authedUser.nominations.filter(x => x.type.includes("Chef") && x.unitId === unitId && !x.ed).length > 0;
        }

        return authedUser.nominations.filter(x => x.type.includes("Chef") && !x.ed).length > 0;
    };
    
    const isGroupChief = () => {
        return authedUser.nominations.filter(x => x.type.includes("Chef") && !x.unitId && !x.ed).length > 0;
    };

    const isFormateur = () => {
        return authedUser.formations.filter(x => x.niveau.id === "32" && x.dateConfirmed).length > 0;
    };

    switch(permission) {
        case PermissionTypes.SubmitCamp:
            return (authedUser.isAdmin || isChief());
        case PermissionTypes.CreateUser:
        case PermissionTypes.UpdateUser:
        case PermissionTypes.UpdateUnit:
        case PermissionTypes.ViewPersonalInfo:
        case PermissionTypes.ViewUsers:
        case PermissionTypes.SubmitRecensement:
            return (authedUser.isAdmin || isChief() || isGroupChief() || isGroupCommissionner() || isGeneralCommissionner());
        case PermissionTypes.DeleteUser:
        case PermissionTypes.DeactivateUnit:
        case PermissionTypes.CreateUnit:
        case PermissionTypes.CreateGroup:
        case PermissionTypes.UpdateGroup:
            return (authedUser.isAdmin || isGroupChief() || isGroupCommissionner() || isGeneralCommissionner());
        case PermissionTypes.AddNomination:
        case PermissionTypes.ValidateNomination:
        case PermissionTypes.RemoveNomination:
        case PermissionTypes.ViewRecensementSummary:
            return (authedUser.isAdmin || isGeneralCommissionner());
        case PermissionTypes.RecommendFormation:
            return (authedUser.isAdmin || isFormateur() || isCommissionner() || isGeneralCommissionner());    
        case PermissionTypes.ConfirmFormation:
        case PermissionTypes.ApproveCamp:
            return (authedUser.isAdmin || isBranchCommissionner() || isGeneralCommissionner());
        case PermissionTypes.PayRecensement:
            return (authedUser.isAdmin || isManagementVicepResident());
        case PermissionTypes.AddDecoration:
            return (authedUser.isAdmin || isManagementVicepResident() || isGeneralCommissionner());
        case PermissionTypes.FeatureManagement:
        case PermissionTypes.DeleteUnit:
            return authedUser.isAdmin;
        default:
          return false;
      } 
};

export default Permissions;
