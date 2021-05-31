const { PermissionTypes } = require("./permissionTypes")
const { NominationTypes } = require("./nominationTypes")

require('dotenv').config()
const jwt = require('jsonwebtoken');

exports.Permissions = (userJwt, permission) => {
    const user = jwt.verify(userJwt, process.env.signingsecret).permissions; 

    if (!user || !user.nominations) {
        return false;
    }

    const isGeneralCommissionner = () => {
        return user.nominations.filter(x => x.type.includes("VPScout") && !x.ed).length > 0;
    };

    const isManagementVicepResident = () => {
        return user.nominations.filter(x => x.type.includes("VPGestion") && !x.ed).length > 0;
    };

    const isCommissionner = () => {
        return user.nominations.filter(x => x.type.includes("Commissaire") && !x.ed).length > 0;
    };

    const isBranchCommissionner = () => {
        return user.nominations.filter(x => x.type.includes("Commissaire") && x.type.includes("branche") && !x.ed).length > 0;
    };

    const isGroupCommissionner = () => {
        return  user.nominations.filter(x => x.type.includes("Commissaire") && x.type.includes("Groupes") && !x.ed).length > 0;
    };

    const isChief = () => {
        if(unitId) {
            return user.nominations.filter(x => x.type.includes("Chef") && x.unitId === unitId && !x.ed).length > 0;
        }

        return user.nominations.filter(x => x.type.includes("Chef") && !x.ed).length > 0;
    };
    
    const isGroupChief = () => {
        return user.nominations.filter(x => x.type.includes("Chef") && !x.unitId && !x.ed).length > 0;
    };

    const isFormateur = () => {
        return user.formations.filter(x => x.niveau.id === "32" && x.dateConfirmed).length > 0;
    };

    switch(permission) {
        case PermissionTypes.SubmitCamp:
            return (user.isAdmin || isChief());
        case PermissionTypes.CreateUser:
        case PermissionTypes.UpdateUser:
        case PermissionTypes.UpdateUnit:
        case PermissionTypes.ViewPersonalInfo:
        case PermissionTypes.ViewUsers:
        case PermissionTypes.SubmitRecensement:
            return (user.isAdmin || isChief() || isGroupChief() || isGroupCommissionner() || isGeneralCommissionner());
        case PermissionTypes.DeleteUser:
        case PermissionTypes.DeactivateUnit:
        case PermissionTypes.CreateUnit:
        case PermissionTypes.CreateGroup:
        case PermissionTypes.UpdateGroup:
            return (user.isAdmin || isGroupChief() || isGroupCommissionner() || isGeneralCommissionner());
        case PermissionTypes.AddNomination:
        case PermissionTypes.ValidateNomination:
        case PermissionTypes.RemoveNomination:
        case PermissionTypes.ViewRecensementSummary:
            return (user.isAdmin || isGeneralCommissionner());
        case PermissionTypes.RecommendFormation:
            return (user.isAdmin || isFormateur() || isCommissionner() || isGeneralCommissionner());    
        case PermissionTypes.ConfirmFormation:
        case PermissionTypes.ApproveCamp:
            return (user.isAdmin || isBranchCommissionner() || isGeneralCommissionner());
        case PermissionTypes.PayRecensement:
            return (user.isAdmin || isManagementVicepResident());
        case PermissionTypes.AddDecoration:
            return (user.isAdmin || isManagementVicepResident() || isGeneralCommissionner());
        case PermissionTypes.FuseUsers:
        case PermissionTypes.FeatureManagement:
            return user.isAdmin;
        default:
          return false;
      } 
};