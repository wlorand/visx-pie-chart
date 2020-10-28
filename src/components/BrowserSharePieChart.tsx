// new way to import React -- no default export, so TS complains on import React from 'react'
import * as React from 'react';

// @visx imports
import { scaleOrdinal } from '@visx/scale';
import Pie from '@visx/shape/lib/shapes/Pie';

import { Group } from '@visx/group';
import { GradientPinkBlue } from '@visx/gradient';

// mock data
import browserUsage, {
  BrowserUsage as Browsers,
} from '@visx/mock-data/lib/mocks/browserUsage';

console.log(browserUsage); // big Array of browserShare data

// define TS types for your data
type BrowserNames = keyof Browsers;
interface BrowserUsage {
  label: BrowserNames;
  usage: number;
}

// define vars for the browser data
const browserNames = Object.keys(browserUsage[0]).filter(
  (key) => key !== 'date'
) as BrowserNames[];

// **create browser object whose data is now ready to render as a pie (usage numbers add up to 100%)
const browsers: BrowserUsage[] = browserNames.map((name) => ({
  label: name,
  usage: Number(browserUsage[0][name]),
}));
console.table(browsers);

// data accessor function
const usage = (d: BrowserUsage) => d.usage;
// const label = (d: BrowserUsage) => d.label;

// define color scale for your data
const getBrowserColor = scaleOrdinal({
  domain: browserNames,
  range: [
    'rgba(255,255,255,0.7)',
    'rgba(255,255,255,0.6)',
    'rgba(255,255,255,0.5)',
    'rgba(255,255,255,0.4)',
    'rgba(255,255,255,0.3)',
    'rgba(255,255,255,0.2)',
    'rgba(255,255,255,0.1)',
  ],
});

// d3 margin convention
const margin = { top: 20, right: 20, bottom: 20, left: 20 };

// define TS type for your props
export type PieProps = {
  width: number;
  height: number;
};

function BrowserSharePieChart({ width, height }: PieProps) {
  if (width < 100) return null; // don't render at widths less than 100 pixels

  // define chart dimension vars
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  // size the pie
  const radius = Math.min(innerWidth, innerHeight) / 2;
  // center the pie
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  // size the donut hole
  const donutThickness = 25;

  return (
    <svg width={width} height={height}>
      <GradientPinkBlue id="pie-bground" />
      <rect rx={25} width={width} height={height} fill="url('#pie-bground')" />
      <Group top={centerY + margin.top} left={centerX + margin.left}>
        <Pie
          data={browsers}
          pieValue={usage}
          outerRadius={radius}
          innerRadius={radius - donutThickness}
          cornerRadius={3}
          padAngle={0.005}
          fill={'rgba(255, 255, 255, 0.5)'} // need accessor
        />
      </Group>
    </svg>
  );
}

export default BrowserSharePieChart;
