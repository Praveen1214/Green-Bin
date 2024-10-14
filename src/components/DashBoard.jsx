import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, } from 'recharts';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Icon } from "@iconify/react/dist/iconify.js";

const co2EmissionData = [
  { year: 2014, value: 76 },
  { year: 2015, value: 76 },
  { year: 2016, value: 67 },
  { year: 2017, value: 18 },
];

const recycledVsCollectedData = [
  { name: 'TonesToRecycle', value: 66.43, color: '#82ca9d' },
  { name: 'TonesRecycled', value: 33.57, color: '#8884d8' },
];

const StatCard = ({ title, value, subValue, icon }) => (
  <Card className="bg-white">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-black">{title}</p>
          <p className="text-2xl font-bold text-green-600">{value}</p>
          {subValue && <p className="text-sm text-gray-600">{subValue}</p>}
        </div>
        {icon && <div className="text-6xl text-green-500 relative top-[120px] right-[90px]">{icon}</div>}
      </div>
    </CardContent>
  </Card>
);

const CategoryCard = ({ icon, value, title }) => (
  <div className="flex items-center space-x-2">
    <div className="bg-green-100 rounded-full p-9">{icon}</div>
    <div>
      <p className="font-bold">{value}</p>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  </div>
);

const DashBoard = () => {
  return (
    <div className="p-6 bg-gray-100">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Recycled YTD" value="519" icon={<Icon icon="mage:delivery-truck" />} />
        <Card className="bg-white ">
          <CardContent className="p-4">
            <StatCard title="Sent for Recycling" value="1027" />
            <StatCard title="Not Recyclable" value="508" />
            <StatCard title="Savings Returned (AED)" value="164K" />
          </CardContent>
        </Card>
        <Card className="p-6 bg-white rounded-xl">
          <CardContent>
            <p className="mb-4 text-sm font-semibold text-center text-gray-700">Recycled vs Collected</p>
            <div className="flex items-center justify-center mb-6">
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={recycledVsCollectedData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    innerRadius={50}
                    fill="#8884d8"
                  >
                    {recycledVsCollectedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-gray-600">
              <p className="text-base font-medium">Tones to Recycle: <span className="font-semibold text-green-600">66.43%</span></p>
              <p className="text-base font-medium">Tones Recycled: <span className="font-semibold text-purple-600">33.57%</span></p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-4">
            <StatCard title="Sent for Recycling" value="1027" />
            <StatCard title="Not Recyclable" value="508" />
            <StatCard title="Recycled" value="519" />
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6 bg-white">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-9">Recycled by Category YTD</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            <CategoryCard icon={<Icon icon="cbi:garbage-plastic" style={{ fontSize: 50, color:"#166535"}}/>} value="184K kg" title="Plastic" />
            <CategoryCard icon={<Icon icon="noto-v1:newspaper" style={{ fontSize: 50, color: "#166535" }} />} value="102K kg" title="Paper" />
            <CategoryCard icon={<Icon icon="token-branded:metal" style={{ fontSize: 50, color: "#166535" }} />} value="1262K kg" title="Metal" />
            <CategoryCard icon={<Icon icon="cbi:garbage-glass-alu" style={{ fontSize: 50, color: "#166535" }} />} value="190K kg" title="Glass" />
            <CategoryCard icon={<Icon icon="flat-color-icons:electronics" style={{ fontSize: 50, color: "#166535" }} />} value="1625K kg" title="E - Waste" />
            <CategoryCard icon={<Icon icon="emojione-monotone:womans-clothes" style={{ fontSize: 50, color: "#166535" }} />} value="123K kg" title="Clothes" />
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6 bg-white">
        <CardContent className="p-4">
          <h2 className="mb-4 text-xl font-bold">CO2 Emissions by Year</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={co2EmissionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#10B981" fill="#D1FAE5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashBoard;