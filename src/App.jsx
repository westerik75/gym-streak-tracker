
import { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// function GymStreakTracker() {
//   const [streak, setStreak] = useState(0);
//   const [lastLoggedWeek, setLastLoggedWeek] = useState(null);

//   useEffect(() => {
//     const storedStreak = localStorage.getItem("gymStreak");
//     const storedWeek = localStorage.getItem("lastLoggedWeek");
//     if (storedStreak) setStreak(parseInt(storedStreak));
//     if (storedWeek) setLastLoggedWeek(parseInt(storedWeek));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("gymStreak", streak);
//     if (lastLoggedWeek !== null) {
//       localStorage.setItem("lastLoggedWeek", lastLoggedWeek);
//     }
//   }, [streak, lastLoggedWeek]);

//   const getCurrentWeek = () => {
//     const now = new Date();
//     const startOfYear = new Date(now.getFullYear(), 0, 1);
//     const pastDaysOfYear = (now - startOfYear) / 86400000;
//     return Math.floor((pastDaysOfYear + startOfYear.getDay()) / 7);
//   };

//   const logGymVisit = () => {
//     const currentWeek = getCurrentWeek();
//     if (lastLoggedWeek === currentWeek) return;

//     if (lastLoggedWeek === currentWeek - 1 || lastLoggedWeek === null) {
//       setStreak(streak + 1);
//     } else {
//       setStreak(1);
//     }
//     setLastLoggedWeek(currentWeek);
//   };

//   return (
//     <div className="p-4 max-w-sm mx-auto text-center mb-10">
//       <Card>
//         <CardContent>
//           <h2 className="text-xl font-bold mb-2">🏋️ Gym Streak</h2>
//           <p className="text-3xl mb-4">{streak} weeks</p>
//           <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//             <Button onClick={logGymVisit}>Went to the Gym</Button>
//             <Button onClick={() => { setStreak(0); setLastLoggedWeek(null); }}>Reset</Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

function BeerCounter() {
  const [todayBeers, setTodayBeers] = useState(0);
  const [beerHistory, setBeerHistory] = useState({});

  const todayKey = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("beerHistory") || "{}");
    const current = saved[todayKey] || 0;
    setBeerHistory(saved);
    setTodayBeers(current);
  }, []);

  const updateStorage = (newCount) => {
    const updated = { ...beerHistory, [todayKey]: newCount };
    setBeerHistory(updated);
    localStorage.setItem("beerHistory", JSON.stringify(updated));
  };

  const addBeer = () => {
    const newCount = todayBeers + 1;
    setTodayBeers(newCount);
    updateStorage(newCount);
  };

  const resetBeer = () => {
    setTodayBeers(0);
    updateStorage(0);
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
            <Line data={chartData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
function NeutjesCounter() {
  const [todayNeutjes, setTodayNeutjes] = useState(0);
  const [NeutjeHistory, setNeutjeHistory] = useState({});

  const todayKey = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("NeutjeHistory") || "{}");
    const current = saved[todayKey] || 0;
    setNeutjeHistory(saved);
    setTodayNeutjes(current);
  }, []);

  const updateStorage = (newCount) => {
    const updated = { ...NeutjeHistory, [todayKey]: newCount };
    setNeutjeHistory(updated);
    localStorage.setItem("NeutjeHistory", JSON.stringify(updated));
  };

  const addNeutje = () => {
    const newCount = todayNeutjes + 1;
    setTodayNeutjes(newCount);
    updateStorage(newCount);
  };

  const resetNeutje = () => {
    setTodayNeutjes(0);
    updateStorage(0);
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
      data: last10Days.map(date => NeutjeHistory[date] || 0),
      fill: false,
      borderColor: "rgb(255, 99, 132)",
      tension: 0.3
    }]
  };

  return (
    <div className="p-4 max-w-sm mx-auto text-center">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">🍷 Neutjes Counter</h2>
          <p className="text-3xl mb-4">{todayNeutjes} Neutjes today</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Button onClick={addNeutje}>Add 1 Neutje</Button>
            <Button onClick={resetNeutje}>Reset</Button>
          </div>
          <div className="mt-6">
            <Line data={chartData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



export default function App() {
  return (
    <>
 {/* <GymStreakTracker /> */}
      <BeerCounter />
      <NeutjesCounter />
    </>
  );
}
