import React, {useContext, useState, useEffect} from "react";
import { Link } from "gatsby"
import UserContext from "../../context/userContext";
import { List, ListItem } from "@material-ui/core";
import GroupClient from "../../clients/groupClient";
import UnitClient from "../../clients/unitClient";

const QuickUnits = () => {
    const userContext = useContext(UserContext);
    const [unitList, setUnitList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const groupClient = new GroupClient();
    const unitClient = new UnitClient();

    const ownUnits = userContext.authedUser?.nominations ? userContext.authedUser.nominations.filter(x => !x.ed).map(x => x.unitId).filter(x => x) : [];
    const ownGroups = userContext.authedUser?.nominations ? userContext.authedUser.nominations.map(x => x.groupId).filter(x => x) : [];

    useEffect(() => {
        FetchUnits();
        FetchGroups();
    }, [userContext])

    async function FetchUnits() {
        if(ownUnits.length == 0) {
            return;
        }

        try {               
            var data = await unitClient.getMultipleById(ownUnits);
            if(data !== null)
            {
                setUnitList(data);
            }            
        } catch (e) {
            console.log(e.message);   
        }
    }

    async function FetchGroups() {
        if(ownGroups.length == 0) {
            return;
        }
        
        try {               
            var data = await groupClient.getMultipleById(ownGroups);
            if(data !== null)
            {
                setGroupList(data);
            }            
        } catch (e) {
            console.log(e.message);   
        }
    }

    if(ownUnits.length === 0 && ownGroups.length === 0) {
        return <List />;
    }
    
    return (
        <List>
            <ListItem className="title-list-item" disableGutters divider>Mes unités</ListItem>
            {unitList.map(unit => (
            <ListItem dense>
                <Link className="quick-units" to={"/app/unite/"+unit._id} >{unit.nom}</Link>
            </ListItem>))}
            {groupList.map(group => (
            <ListItem dense>
                <Link className="quick-units" to={"/app/unite/"+group._id} >{"Groupe " + group.numero + " " + group.nom}</Link>
            </ListItem>))}
        </List>
    );
};

export default QuickUnits;