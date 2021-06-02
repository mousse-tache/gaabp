const PermissionTypes = {
    // users
    CreateUser: "createUser",
    UpdateUser: "updateUser",
    DeleteUser: "deleteUser",
    ViewUsers: "viewUsers",
    ViewPersonalInfo: "viewPersonalInfo",
    FuseUsers: "fuse",

    // units
    CreateUnit: "createUnit",
    UpdateUnit: "updateUnit",
    DeactivateUnit: "deactivateUnit",
    DeleteUnit: "deleteUnit",
    SubmitRecensement: "submitRecensement",
    PayRecensement: "payRecensement",
    SubmitCamp: "submitCamp",
    ApproveCamp: "approveCamp",

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
    ViewRecensementSummary: "viewRecensements",

    // décorations
    AddDecoration: "addDecoration",
    UpdateDecorations: "updateDecorations",

    // feature
    FeatureManagement: "featureManagement"
};

export default PermissionTypes;
