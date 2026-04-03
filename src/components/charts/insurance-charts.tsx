'use client';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, AreaChart, Area,
  LineChart, Line, CartesianGrid,
} from 'recharts';
import { aseanComparison, ageDemographics, stats } from '@/lib/data';

// ============================================================
// ASEAN PENETRATION BAR CHART
// ============================================================
export function AseanBarChart() {
  return (
    <div className="w-full h-64 sm:h-80">
      <ResponsiveContainer>
        <BarChart data={aseanComparison} layout="vertical" margin={{ left: 60, right: 20, top: 5, bottom: 5 }}>
          <XAxis type="number" tick={{ fontSize: 11 }} />
          <YAxis dataKey="country" type="category" tick={{ fontSize: 11, fontWeight: 800 }} width={60} />
          <Tooltip
            contentStyle={{ border: '3px solid #000', fontWeight: 'bold', fontFamily: 'monospace', fontSize: 12 }}
            formatter={(value: number) => [`${value}%`, 'Penetration']}
          />
          <Bar dataKey="penetration" radius={[0, 6, 6, 0]} name="Penetration %">
            {aseanComparison.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.color}
                stroke="#000"
                strokeWidth={2}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================
// AGE DEMOGRAPHICS PIE CHART
// ============================================================
export function AgeDemographicsPie() {
  const COLORS = ['#FF6B9D', '#BFFF00', '#FFFF00', '#54A0FF', '#FF9F43', '#FFD700', '#888'];
  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={ageDemographics}
            dataKey="percent"
            nameKey="range"
            cx="50%"
            cy="50%"
            outerRadius={90}
            stroke="#000"
            strokeWidth={2}
            label={({ range, percent }) => `${range}: ${percent}%`}
            labelLine={{ stroke: '#000', strokeWidth: 1 }}
          >
            {ageDemographics.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ border: '3px solid #000', fontFamily: 'monospace', fontSize: 12 }}
            formatter={(value: number) => [`${value}%`, 'Population']}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================
// INSURANCE RATE BY AGE (Pie)
// ============================================================
export function InsuranceRatePie() {
  const COLORS = ['#FF6B9D', '#BFFF00', '#FFFF00', '#54A0FF', '#FF9F43', '#FFD700', '#888'];
  const data = ageDemographics.map(d => ({ ...d, value: d.insuranceRate }));
  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="range"
            cx="50%"
            cy="50%"
            outerRadius={90}
            stroke="#000"
            strokeWidth={2}
            label={({ range, value }) => `${range}: ${value}%`}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ border: '3px solid #000', fontFamily: 'monospace', fontSize: 12 }}
            formatter={(value: number) => [`${value}%`, 'Insurance Rate']}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================
// PRODUCT COMPARISON RADAR CHART
// ============================================================
export function ProductRadarChart() {
  const data = [
    { feature: 'Coverage', blueRoyale: 95, flexiShield: 70 },
    { feature: 'Affordability', blueRoyale: 30, flexiShield: 90 },
    { feature: 'Flexibility', blueRoyale: 90, flexiShield: 75 },
    { feature: 'Accessibility', blueRoyale: 60, flexiShield: 95 },
    { feature: 'Premium Benefits', blueRoyale: 95, flexiShield: 50 },
    { feature: 'Family Friendly', blueRoyale: 85, flexiShield: 90 },
  ];
  return (
    <div className="w-full h-72 sm:h-80">
      <ResponsiveContainer>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius={100}>
          <PolarGrid stroke="#000" strokeWidth={2} />
          <PolarAngleAxis dataKey="feature" tick={{ fontSize: 11, fontWeight: 800 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
          <Radar name="Blue Royale" dataKey="blueRoyale" stroke="#1a1a2e" fill="#1a1a2e" fillOpacity={0.3} strokeWidth={2} />
          <Radar name="FlexiShield" dataKey="flexiShield" stroke="#BFFF00" fill="#BFFF00" fillOpacity={0.3} strokeWidth={2} />
          <Tooltip contentStyle={{ border: '3px solid #000', fontFamily: 'monospace', fontSize: 12 }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================
// FINANCIAL RUIN CAUSES CHART
// ============================================================
export function FinancialRuinChart() {
  const data = stats.topCausesOfRuin;
  const COLORS = ['#FF0000', '#FF6B9D', '#FF9F43', '#888'];
  return (
    <div className="w-full h-52">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ left: 0, right: 20, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="cause" tick={{ fontSize: 10, fontWeight: 700 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip
            contentStyle={{ border: '3px solid #000', fontFamily: 'monospace', fontSize: 12 }}
            formatter={(value: number) => [`${value}%`, 'Percentage']}
          />
          <Bar dataKey="percent" name="Percentage" radius={[6, 6, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} stroke="#000" strokeWidth={2} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================
// INCOME PROJECTION LINE CHART
// ============================================================
export function IncomeProjectionChart({ data }: { data: { month: string; income: number; cumulative: number }[] }) {
  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF6B9D" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FF6B9D" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="cumulGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#BFFF00" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#BFFF00" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="month" tick={{ fontSize: 10, fontWeight: 700 }} />
          <YAxis tick={{ fontSize: 10 }} tickFormatter={(v: number) => `₱${(v / 1000).toFixed(0)}K`} />
          <Tooltip
            contentStyle={{ border: '3px solid #000', fontFamily: 'monospace', fontSize: 12 }}
            formatter={(value: number) => [`₱${value.toLocaleString()}`, '']}
          />
          <Area type="monotone" dataKey="income" stroke="#FF6B9D" fill="url(#incomeGrad)" strokeWidth={3} name="Monthly Income" />
          <Area type="monotone" dataKey="cumulative" stroke="#BFFF00" fill="url(#cumulGrad)" strokeWidth={3} name="Cumulative" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================
// SOCIAL MEDIA ENGAGEMENT FUNNEL
// ============================================================
export function EngagementFunnel() {
  const data = [
    { stage: 'Impressions', value: 10000, color: '#54A0FF' },
    { stage: 'Engagement', value: 3000, color: '#FF6B9D' },
    { stage: 'Link Clicks', value: 800, color: '#FFFF00' },
    { stage: 'Leads', value: 200, color: '#BFFF00' },
    { stage: 'Clients', value: 20, color: '#FF9F43' },
  ];
  return (
    <div className="w-full h-56">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ left: 70, right: 20, top: 5, bottom: 5 }}>
          <XAxis type="number" tick={{ fontSize: 10 }} />
          <YAxis dataKey="stage" type="category" tick={{ fontSize: 11, fontWeight: 800 }} width={70} />
          <Tooltip
            contentStyle={{ border: '3px solid #000', fontFamily: 'monospace', fontSize: 12 }}
            formatter={(value: number) => [value.toLocaleString(), 'Count']}
          />
          <Bar dataKey="value" radius={[0, 6, 6, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} stroke="#000" strokeWidth={2} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================
// SIMPLE LINE CHART FOR POSTING TIMES
// ============================================================
export function PostingTimesChart() {
  const data = [
    { day: 'Mon', engagement: 65 },
    { day: 'Tue', engagement: 85 },
    { day: 'Wed', engagement: 78 },
    { day: 'Thu', engagement: 72 },
    { day: 'Fri', engagement: 90 },
    { day: 'Sat', engagement: 60 },
    { day: 'Sun', engagement: 45 },
  ];
  return (
    <div className="w-full h-48">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 800 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip
            contentStyle={{ border: '3px solid #000', fontFamily: 'monospace', fontSize: 12 }}
            formatter={(value: number) => [`${value}%`, 'Engagement']}
          />
          <Line type="monotone" dataKey="engagement" stroke="#FF6B9D" strokeWidth={4} dot={{ fill: '#FF6B9D', stroke: '#000', strokeWidth: 2, r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
