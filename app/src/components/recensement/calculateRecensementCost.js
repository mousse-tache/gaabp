import NominationTypes from "@aabp/utils/nominationTypes";

function CalculateCost(unitMembers, isUniteCadette = true) {
    var totalCount = unitMembers.length

    var basePrice = isUniteCadette ? 75 : 25;
    var today = new Date();
    
    switch(today.getMonth()) {
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            basePrice=25;
            break;
        default:
            break;
    }

    if(totalCount == 0) {
        return {details: {formedUsers:0, adultUsers:0, others:0, totalCount}, basePrice: null, totalPrice: 0}
    }

    var formedUsers = unitMembers.filter(x => x.formations?.filter(y => y.dateConfirme && y.niveau?.name?.includes("BC")).length > 0).length
    var adultUsers = unitMembers.filter(x => x.formations?.filter(y => y.dateConfirme).length == 0 && x.nominations.type !== NominationTypes.Membre).length

    return { details: {formedUsers, adultUsers, others: totalCount-formedUsers-adultUsers, totalCount}, basePrice, totalPrice:(formedUsers)+((adultUsers)*25)+((totalCount-formedUsers-adultUsers)*basePrice)}
}

export default CalculateCost;