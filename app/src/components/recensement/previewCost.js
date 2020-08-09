import React from "react"

const PreviewCost = ({cost, latestRecensement}) => {

    return ( 
        <div>
            {!latestRecensement && "Aucun recensement n'a été enregistré par le passé."} Le coût de recensement actuel serait de {cost.totalPrice}$
            <ul>
                { cost.details.formedUsers ? (
                <li>
                    {cost.details.formedUsers} membre(s) formés à 1$ chacun - {cost.details.formedUsers}$
                </li>) : null
                }
                { cost.details.adultUsers ? ( 
                <li>
                    {cost.details.adultUsers} membre(s) de maîtrise non formés à 25$ chacun - {cost.details.adultUsers*25}$
                </li>) : null}
                { cost.details.others ? (
                <li>
                    {cost.details.others} membre(s) à {cost.basePrice}$ chacun - {cost.details.others}$
                </li>
                ) : null} 
            </ul>
        </div>        
    )
}

export default PreviewCost;