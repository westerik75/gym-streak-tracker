import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, Button } from '@material-ui/core';

export default function App() {
  const [todayBeers, setTodayBeers] = useState(0);
  const [beerHistory, setBeerHistory] = useState({});

  const addBeer = () => {
    const newCount = todayBeers + 1;
    setTodayBeers(newCount);
    updateStorage(newCount);
  };

  const resetBeer = () => {
    setTodayBeers(0);
    updateStorage(0);
  };

  const updateStorage = (count) => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const newHistory = { ...beerHistory, [today]: count };
    setBeerHistory(newHistory);
  };

  const last5Days = [...Array(5)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (9 - i));
    return d.toLocaleDateString('en-US', { weekday: 'long' });
  });

  const chartData = {
    labels: last5Days,
    datasets: [{
      label: "Beers per Day",
      data: last5Days.map(date => beerHistory[date] || 0),
      fill: false,
      borderColor: "rgb(255, 99, 132)",
      tension: 0.3
    }]
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto text-center">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">🍺 Beer Counter</h2>
          <p className="text-3xl mb-4">{todayBeers} beers today</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Button onClick={addBeer}>Add 1 Beer</Button>
            <Button onClick={resetBeer}>Reset</Button>
          </div>
          <div className="mt-6">
            <Line data={chartData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function NeutjesCounter() {
  const [todayNeutjes, setTodayNeutjes] = useState(0);
  const [NeutjeHistory, setNeutjeHistory] = useState({});

  const addNeutje = () => {
    const newCount = todayNeutjes + 1;
    setTodayNeutjes(newCount);
    updateNeutjeStorage(newCount);
  };

  const resetNeutje = () => {
    setTodayNeutjes(0);
    updateNeutjeStorage(0);
  };

  const updateNeutjeStorage = (count) => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const newHistory = { ...NeutjeHistory, [today]: count };
    setNeutjeHistory(newHistory);
  };

  const last5Days = [...Array(5)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (9 - i));
    return d.toLocaleDateString('en-US', { weekday: 'long' });
  });

  const chartData = {
    labels: last5Days,
    datasets: [{
      label: "Neutjes per Day",
      data: last5Days.map(date => NeutjeHistory[date] || 0),
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.3
    }]
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto text-center">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">🍬 Neutjes Counter</h2>
          <p className="text-3xl mb-4">{todayNeutjes} neutjes today</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Button onClick={addNeutje}>Add 1 Neutje</Button>
            <Button onClick={resetNeutje}>Reset</Button>
          </div>
          <div className="mt-6">
            <Line data={chartData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}