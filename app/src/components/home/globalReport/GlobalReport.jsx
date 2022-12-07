import React, { useEffect, useState } from "react";

import { Card, CardContent, Tooltip } from "@material-ui/core";
import HelpOutline from "@material-ui/icons/HelpOutline";
import { Skeleton } from "@material-ui/lab";

import DonutChart from "@aabp/reporting/DonutChart";
import { getBranchFromId } from "@aabp/utils/branches";
import ReportingClient from "@aabp/clients/reportingClient";

import "./global-report.scss";

const GlobalReport = () => {
    const [report, setReport] = useState({});
    const [init, setInit] = useState(false);
    const reportClient = new ReportingClient();

    useEffect(() => {
        const fetchReport = async() => {
            const data = await reportClient.getGlobalReport();
            await setReport(data);

            await setInit(true);
        };

        fetchReport();
    }, []);

    const { nbOfUsers, uniteRecenses, unitsPaye, totalCashForYear, usersByType, usersByBranch } = report;

    if (!init) {
        return <Skeleton />;
    }

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
                {
                    usersByType &&
                    <div className="globalreport-tile-item">
                        <Tooltip title="Compte chaque nomination individuellement">
                            <h3>Membres par type de nomination <HelpOutline className="icon-align" /></h3>
                        </Tooltip>
                        <div>
                            <DonutChart data={usersByType} outerRadius={500} />
                        </div>
                    </div>
                }
                {
                    usersByBranch &&
                    <div className="globalreport-tile-item">
                        <Tooltip title="Compte chaque nomination individuellement">
                            <h3>Membres par branche <HelpOutline className="icon-align" /></h3>
                        </Tooltip>
                        <div>
                            <DonutChart data={usersByBranch.map(x => {return {value: x.value, label: getBranchFromId(x.label)};})} outerRadius={500} />
                        </div>
                    </div>
                }
            </CardContent>
        </Card>
    );
};

export default GlobalReport;