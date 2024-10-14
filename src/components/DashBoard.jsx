import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Icon } from "@iconify/react/dist/iconify.js";

const co2EmissionData = [
  { year: 2014, value: 76 },
  { year: 2015, value: 76 },
  { year: 2016, value: 67 },
  { year: 2017, value: 18 },
];

const StatCard = ({ title, value, subValue, icon }) => (
  <Card className="bg-white">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-green-600">{value}</p>
          {subValue && <p className="text-sm text-gray-600">{subValue}</p>}
        </div>
        {icon && <div className="text-3xl text-green-500">{icon}</div>}
      </div>
    </CardContent>
  </Card>
);

const CategoryCard = ({ icon, value, title }) => (
  <div className="flex items-center space-x-2">
    <div className="p-2 bg-green-100 rounded-full">{icon}</div>
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
        <Card className="bg-white">
          <CardContent className="p-4">
            <p className="mb-2 text-sm text-gray-500">Recycled vs Collected</p>
            <div className="flex items-center justify-center mb-4">
              <Progress value={33.57} className="w-32 h-32" />
            </div>
            <div className="text-sm text-center">
              <p>TonesToRecycle: 66.43%</p>
              <p>TonesRecycled: 33.57%</p>
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
          <h2 className="mb-4 text-xl font-bold">Recycled by Category YTD</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            <CategoryCard icon="📦" value="72.2" title="Cardboard" />
            <CategoryCard icon="📄" value="10.0" title="Paper" />
            <CategoryCard icon="🔧" value="13" title="Metal" />
            <CategoryCard icon="🛍️" value="1372.5" title="Plastic" />
            <CategoryCard icon="🚗" value="6" title="Oil & Grease" />
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