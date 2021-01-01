const PermissionTypes = {
    // users
    CreateUser: "createUser",
    UpdateUser: "updateUser",
    DeleteUser: "deleteUser",
    ViewUsers: "viewUsers",
    ViewPersonalInfo: "viewPersonalInfo",
    UpdateDecorations: "updateDecorations",

    // units
    CreateUnit: "createUnit",
    UpdateUnit: "updateUnit",
    DeactivateUnit: "deactivateUnit",
    SubmitRecensement: "submitRecensement",
    PayRecensement: "payRecensement",

    // groups
    CreateGroup: "createGroup",
    UpdateGroup: "updateGroup",
    DeactivateGroup: "deactivateGroup",

    // nominations
    AddNomination: "addNomination",
    ValidateNomination: "validateNomination",
    RemoveNomination: "removeNomination",

    // formations
    RecommendFormation: "recommendFormation",
    ConfirmFormation: "confirmFormation",

    // recensements
    ViewRecensementSummary: "viewRecensements"

}

export default PermissionTypes;
