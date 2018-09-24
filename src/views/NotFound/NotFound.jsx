import React from "react";
// function that returns a color based on an interval of numbers

import { PanelHeader, Stats, CardCategory, Tasks } from "components";

import {
  dashboardPanelChart,
  dashboardShippedProductsChart,
  dashboardAllProductsChart,
  dashboard24HoursPerformanceChart
} from "variables/charts.jsx";

import { tasks } from "variables/general.jsx";

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          404 Not found
        </div>
      </div>
    );
  }
}

export default NotFound;
