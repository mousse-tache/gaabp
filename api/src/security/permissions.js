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

    const isGroupCommissionner = () => {
        return  user.nominations.filter(x => x.type.includes("Commissaire") && x.type.includes("Groupes") && !x.ed).length > 0;
    };

    const isChief = () => {
        return user.nominations.filter(x => x.type.includes("Chef") && !x.ed).length > 0;
    };
    
    const isGroupChief = () => {
        return user.nominations.filter(x => x.type.includes("Chef") && !x.unitId && !x.ed).length > 0;
    };

    const isFormateur = () => {
        return user.formations.filter(x => x.niveau.id === "32" && x.dateConfirmed).length > 0;
    };

    if (user.isAdmin) {
        return true;
    }

    switch(permission) {
        case PermissionTypes.CreateUser:
        case PermissionTypes.UpdateUser:
        case PermissionTypes.UpdateUnit:
        case PermissionTypes.ViewPersonalInfo:
        case PermissionTypes.ViewUsers:
        case PermissionTypes.SubmitRecensement:
            return (user.isAdmin || isChief() || isGroupChief() || isGeneralCommissionner());
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
            return (user.isAdmin || isCommissionner() || isGeneralCommissionner());
        case PermissionTypes.PayRecensement:
            return (user.isAdmin || isManagementVicepResident());
        default:
          return false;
      } 
};