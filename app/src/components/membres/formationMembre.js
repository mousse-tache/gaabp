import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MaterialTable from 'material-table';
import CardContent from "@material-ui/core/CardContent";
import UserClient from "../../clients/userClient"

const FormationMembre = ({formations}) => {
    formations.sort();

    const userClient = new UserClient();

    const [formateurs, setFormateurs] = useState({});

    // https://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript-and-de-duplicate-items
    Array.prototype.unique = function() {
        var a = this.concat();
        for(var i=0; i<a.length; ++i) {
            for(var j=i+1; j<a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }
    
        return a;
    };

    const FetchFormateurs = async() => {

        try {
            var ids = formations.map(x => x.recommendedBy);
            ids.concat(formations.map(x => x.confirmedBy)).unique();
            if(ids.length < 1) {
                return;
            }

            var formateurArray = []
            const reducedFormateurs = {};
            var data = await userClient.getByIds(ids);

            data.forEach(formateur => {
                if(formateurArray.filter(x => x._id === formateur._id).length < 1) {
                    formateurArray.push(formateur);
                    const id = formateur._id
                    const nom = `${formateur.prenom} ${formateur.nom}`
                    reducedFormateurs[ id ] = nom;
                }                   
            });
                      
            setFormateurs(reducedFormateurs)
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        if (!formateurs) {
            FetchFormateurs();
        }
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