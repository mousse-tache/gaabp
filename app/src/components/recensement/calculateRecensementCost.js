import NominationTypes from "../../utils/nominationTypes";

function CalculateCost(unitMembers, isUniteCadette = true) {
    var totalCount = unitMembers.length
    var formedUsers = unitMembers.filter(x => x.formations.filter(y => y.dateConfirme).length > 0).length
    var adultUsers = unitMembers.filter(x => x.formations.filter(y => y.dateConfirme).length == 0 && x.nominations.filter(y => y.type !== NominationTypes.Membre).length > 0).length

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

    return { details: {formedUsers, adultUsers, others: totalCount-formedUsers-adultUsers, totalCount}, basePrice, totalPrice:`${(formedUsers)+((adultUsers)*25)+((totalCount-formedUsers-adultUsers)*basePrice)}$`}
}

export default CalculateCost;