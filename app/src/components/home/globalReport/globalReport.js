import React, { useEffect, useState } from "react";

import { Card, CardContent, Tooltip } from "@material-ui/core";
import HelpOutline from "@material-ui/icons/HelpOutline";

import ReportingClient from "@aabp/clients/reportingClient";

import "./globalReport.css";

const GlobalReport = () => {
    const [report, setReport] = useState({})
    const reportClient = new ReportingClient();

    useEffect(() => {
        const fetchReport = async() => {
            const data = await reportClient.getGlobalReport();
            setReport(data);
        };

        fetchReport();
    }, []);

    const { nbOfUsers, uniteRecenses, unitsPaye, totalCashForYear } = report;

    return (
        <Card className="globalreport">
            <h2>Portrait de l'Association</h2>
            <CardContent className="globalreport-tile-container">
                <div className="globalreport-tile-item">
                    <Tooltip title="Membres avec une nomination sans date de fin">
                        <h3>Membres actifs <HelpOutline className="icon-align" /></h3>
                    </Tooltip>
                    <div>
                        <span className="report-number">{`${nbOfUsers}`}</span>
                    </div>
                </div>
                <div className="globalreport-tile-item">
                    <Tooltip title="Unités ayant soumis leur recensement">
                        <h3>Unités recensées <HelpOutline className="icon-align" /></h3>
                    </Tooltip>
                    <div>
                        <span className="report-number">{`${uniteRecenses}`}</span>
                    </div>
                </div>
                <div className="globalreport-tile-item">
                    <Tooltip title="Unités ayant payé leur recensement">
                        <h3>Unités payées <HelpOutline className="icon-align" /></h3>
                    </Tooltip>
                    <div>
                        <span className="report-number">{`${unitsPaye}`}</span>
                    </div>
                </div>
                <div className="globalreport-tile-item">
                    <Tooltip title="Somme des recensements marqués comme payés">
                        <h3>Revenus des recensements <HelpOutline className="icon-align" /></h3>
                    </Tooltip>
                    <div>
                        <span className="report-number">{`${totalCashForYear},00$`}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
};

export default GlobalReport;