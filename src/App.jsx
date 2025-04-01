
import { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

export default function App() {
  const [streak, setStreak] = useState(0);
  const [lastLoggedWeek, setLastLoggedWeek] = useState(null);

  useEffect(() => {
    const storedStreak = localStorage.getItem("gymStreak");
    const storedWeek = localStorage.getItem("lastLoggedWeek");
    if (storedStreak) setStreak(parseInt(storedStreak));
    if (storedWeek) setLastLoggedWeek(parseInt(storedWeek));
  }, []);

  useEffect(() => {
    localStorage.setItem("gymStreak", streak);
    if (lastLoggedWeek !== null) {
      localStorage.setItem("lastLoggedWeek", lastLoggedWeek);
    }
  }, [streak, lastLoggedWeek]);

  const getCurrentWeek = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const pastDaysOfYear = (now - startOfYear) / 86400000;
    return Math.floor((pastDaysOfYear + startOfYear.getDay()) / 7);
  };

  const logGymVisit = () => {
    const currentWeek = getCurrentWeek();
    if (lastLoggedWeek === currentWeek) return;

    if (lastLoggedWeek === currentWeek - 1 || lastLoggedWeek === null) {
      setStreak(streak + 1);
    } else {
      setStreak(1);
    }
    setLastLoggedWeek(currentWeek);
  };

  return (
    <div className="p-4 max-w-sm mx-auto text-center">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">🏋️ Gym Streak</h2>
          <p className="text-3xl mb-4">{streak} weeks</p>
          <Button onClick={logGymVisit}>Went to the Gym</Button>
        </CardContent>
      </Card>
    </div>
  );
}
