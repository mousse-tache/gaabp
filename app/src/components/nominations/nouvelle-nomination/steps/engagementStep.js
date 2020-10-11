import React, { useContext } from "react";
import NominationContext from "../../../../context/nominationContext";
import r7 from "../../../../docs/Règlement spécifique 07 - Code d'éthique et de déontologie de l'AABP.pdf"
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

const EngagementStep = () => {
    const { nomination, setNomination } = useContext(NominationContext);

    return (
        <div className="step-main-container">
            <h2>
                Engagement
            </h2>
            <p className="nomination-flex-container">
            Engagement de fidélité au mouvement
            </p>
            <div className="nomination-flex-container">
                <FormControl required component="fieldset">
                    <FormLabel component="legend">Le chef et la cheftaine doivent toujours se rappeler qu'en plus de leur devoir face aux jeunes, ils ont aussi un devoir vis-à-vis le mouvement scout. Chargés de la responsabilité d'éduquer les jeunes par leur propre exemple de vie disciplinée et ordonnée, les commissaires et chefs doivent se placer au-dessus de leurs sentiments personnels et avoir l'esprit assez large pour subordonner leurs propres opinions aux principes généraux de l'ensemble. Il leur appartient d'enseigner aux jeunes qui sont sous leur responsabilité, par leur exemple, à faire leur part de travail, comme des briques dans un mur. Chacun possède sa sphère d'activité spéciale. Mieux il s'en acquittera, mieux ses jeunes répondront à son action d'éducateur.C'est seulement en considérant le but supérieur du mouvement et les conséquences ultérieures des mesures prises aujourd'hui, qu'il faut mesurer dans leur juste proportion les gestes quotidiens de l'éducation des enfants. Lorsque, en toute conscience, un chef n'est plus digne du mandat qu'on lui a confié, il doit quitter ses fonctions, mieux vaut remettre son insigne sur le champ que de trahir sa loyauté envers la loi scoute. Celui qui devient chef en accepte toutes les responsabilité et se consacre entièrement à son engagement. Le scoutisme n'a que faire des aventuriers de passage qui ne recherchent que gloire et satisfaction personnelle égoïste. Lord Robert Baden-Powell, fondateur du scoutisme</FormLabel>
                    <RadioGroup 
                    aria-label="dossier-criminel" 
                    value={nomination.fidelite} 
                    onChange={(event) => setNomination({...nomination, fidelite: event.target.value})}>
                        <FormControlLabel value="oui" control={<Radio />} label="J'accepte" />
                        <FormControlLabel value="non" control={<Radio />} label="Je refuse" />
                        <FormControlLabel style={{display:"none"}} value="nonselectionner" control={<Radio />} label="Non" />
                    </RadioGroup>
                </FormControl>
            </div>

            <p className="nomination-flex-container">
                Engagement comme {nomination.role.includes("Assistant") ? "assistant(e)" : "chef(taine)"}
            </p>
            {
            !nomination.role.includes("Assistant") ? (
                <div className="nomination-flex-container">                
                    <FormControl component="fieldset">
                        <FormLabel component="legend">
                            Je m'engage solennellement sur mon honneur, comme chef(taine), à observer et à faire observer la LOI SCOUTE, les RÈGLEMENTS et les MÉTHODES de l'Association des aventuriers de Baden-Powell, à suivre la formation appropriée et à suivre les instruction et directives qui me seront données par mes chefs et supérieur. Je m'engage en outre à assurer la relève lorsque je quitterai mes fonctions. Je m'engage à suivre le premier niveau de formation de ma branche à l'intérieur d'une période de 2 ans.
                        </FormLabel>
                        <RadioGroup 
                        aria-label="dossier-criminel" 
                        value={nomination.engagementChef} 
                        onChange={(event) => setNomination({...nomination, engagementChef: event.target.value})}>
                            <FormControlLabel value="oui" control={<Radio />} label="J'accepte" />
                            <FormControlLabel value="non" control={<Radio />} label="Je refuse" />
                            <FormControlLabel style={{display:"none"}} value="nonselectionner" control={<Radio />} label="Non" />
                        </RadioGroup>
                    </FormControl>
                </div>
            ) :
            (
                <div className="nomination-flex-container">
                    
                    <FormControl component="fieldset">
                        <FormLabel component="legend">
                        Je m'engage solennellement sur mon honneur, comme assistant(e), observer et à faire observer la LOI SCOUTE, les RÉGLEMENTS et les MÉTHODES de l'Association des aventuriers de Baden-Powell, à suivre la formation appropriée à ma fonction et à seconder loyalement mon (ma) chef (cheftaine).
                        </FormLabel>
                        <RadioGroup 
                        aria-label="dossier-criminel" 
                        value={nomination.engagementAssistant} 
                        onChange={(event) => setNomination({...nomination, engagementAssistant: event.target.value})}>
                            <FormControlLabel value="oui" control={<Radio />} label="J'accepte" />
                            <FormControlLabel value="non" control={<Radio />} label="Je refuse" />
                            <FormControlLabel style={{display:"none"}} value="nonselectionner" control={<Radio />} label="Non" />
                        </RadioGroup>
                    </FormControl>
                </div>) 
            }
            <p className="nomination-flex-container">
            Code d'éthique et de déontologie https://aventuriersdebadenpowell.org/ressources
            </p>
            <div className="nomination-flex-container">
                <FormControl required component="fieldset">
                    <FormLabel component="legend">
                    J'ai lu et pris connaissance du <a target="_blank" href={r7}>code d'éthique et de déontologie</a> de l'AABP et j'accepte de m'y conformer. 
                    
                    </FormLabel>
                    <RadioGroup 
                    aria-label="dossier-criminel" 
                    value={nomination.deonto} 
                    onChange={(event) => setNomination({...nomination, deonto: event.target.value})}>
                        <FormControlLabel value="oui" control={<Radio />} label="J'accepte" />
                        <FormControlLabel value="non" control={<Radio />} label="Je refuse" />
                        <FormControlLabel style={{display:"none"}} value="nonselectionner" control={<Radio />} label="Non" />
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    )
};

export default EngagementStep;