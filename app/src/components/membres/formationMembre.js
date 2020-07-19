import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MaterialTable from 'material-table';
import CardContent from "@material-ui/core/CardContent";
import UserClient from "../../clients/userClient"

const FormationMembre = ({formations}) => {
    formations.sort();

    const userClient = new UserClient();

    const [formateurs, setFormateurs] = useState({});

    const FetchFormateurs = async() => {
        try {
            var ids = formations.map(x => x.recommendedBy);
            ids.concat(formations.map(x => x.confirmedBy));

            var formateurArray = []

            const reducedFormateurs = {};

            ids.forEach(async id => {
                var data = await userClient.getById(id);
                var formateur = data[0]
                if(formateurArray.filter(x => x._id === formateur._id).length < 1) {
                    formateurArray.push(formateur);
                    const nom = `${formateur.prenom} ${formateur.nom}`
                    console.log(nom)
                    reducedFormateurs[ id ] = nom;
                }
            });               
            
            setFormateurs(reducedFormateurs)
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        FetchFormateurs();
    }, [formations])

    return (
        <CardContent>
            <MaterialTable
            title=""
            columns={
                [
                    { title: 'Niveau', field: 'niveau.id' },
                    { title: 'Branche', field: 'branche.couleur' },
                    { title: 'Émis le', field: 'dateConfirme' },
                    { title: 'Émis par', field: 'confirmedBy', lookup: formateurs },   
                    { title: 'Recommendé le', field: 'dateRecommende' },
                    { title: 'Recommander par', field: 'recommendedBy', lookup: formateurs },                    
                ]
            }
            data={formations}
            options={
                {
                pageSize: 10,
                search: true,
                grouping: true
                }
            }
            />
        </CardContent>
    );
}

FormationMembre.propTypes = {
    formations: PropTypes.array
}

export default FormationMembre;