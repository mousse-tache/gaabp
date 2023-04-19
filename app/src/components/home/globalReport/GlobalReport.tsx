import { useEffect, useState } from "react";

import { Tooltip } from "@material-ui/core";
import HelpOutline from "@material-ui/icons/HelpOutline";
import { Skeleton } from "@material-ui/lab";

import ReportingClient from "@aabp/clients/reportingClient";
import Card from "@aabp/components/design-system/Card/Card";
import DonutChart from "@aabp/reporting/DonutChart";
import { getBranchColorFromId, getBranchFromId } from "@aabp/utils/branches";

const GlobalReport = () => {
  const [report, setReport] = useState({});
  const [init, setInit] = useState(false);
  const reportClient = new ReportingClient();

  useEffect(() => {
    const fetchReport = async () => {
      const data = await reportClient.getGlobalReport();
      await setReport(data);

      await setInit(true);
    };

    fetchReport();
  }, []);

  const {
    nbOfUsers,
    uniteRecenses,
    unitsPaye,
    totalCashForYear,
    usersByType,
    usersByBranch,
  } = report;

  if (!init) {
    return <Skeleton />;
  }

  return (
    <Card className="globalreport">
      <h2>Portrait de l'Association</h2>
      <div className="flex flex-row flex-wrap content-between">
        <div className="block m-auto">
          <Tooltip title="Membres avec une nomination sans date de fin">
            <h3>
              Membres actifs <HelpOutline className="align-text-bottom" />
            </h3>
          </Tooltip>
          <div>
            <span className="font-bold text-xl">{`${nbOfUsers}`}</span>
          </div>
        </div>
        <div className="block m-auto">
          <Tooltip title="Unités ayant soumis leur recensement">
            <h3>
              Unités recensées <HelpOutline className="align-text-bottom" />
            </h3>
          </Tooltip>
          <div>
            <span className="font-bold text-xl">{`${uniteRecenses}`}</span>
          </div>
        </div>
        <div className="block m-auto">
          <Tooltip title="Unités ayant payé leur recensement">
            <h3>
              Unités payées <HelpOutline className="align-text-bottom" />
            </h3>
          </Tooltip>
          <div>
            <span className="font-bold text-xl">{`${unitsPaye}`}</span>
          </div>
        </div>
        <div className="block m-auto">
          <Tooltip title="Somme des recensements marqués comme payés">
            <h3>
              Revenus des recensements{" "}
              <HelpOutline className="align-text-bottom" />
            </h3>
          </Tooltip>
          <div>
            <span className="font-bold text-xl">{`${totalCashForYear},00$`}</span>
          </div>
        </div>
        {usersByType && (
          <div className="block m-auto">
            <Tooltip title="Compte chaque nomination individuellement">
              <h3>
                Membres par type de nomination{" "}
                <HelpOutline className="align-text-bottom" />
              </h3>
            </Tooltip>
            <div>
              <DonutChart data={usersByType} outerRadius={500} />
            </div>
          </div>
        )}
        {usersByBranch && (
          <div className="block m-auto">
            <Tooltip title="Compte chaque nomination individuellement">
              <h3>
                Membres par branche{" "}
                <HelpOutline className="align-text-bottom" />
              </h3>
            </Tooltip>
            <div>
              <DonutChart
                data={usersByBranch.map((x) => {
                  return {
                    value: x.value,
                    label: getBranchFromId(x.label),
                    color: getBranchColorFromId(x.label),
                  };
                })}
                outerRadius={500}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default GlobalReport;
