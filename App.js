import React, { useState } from "react";

export default function App() {
  const [screen, setScreen] = useState("home");

  // ----------------- DATA STATES -----------------
  const [workouts, setWorkouts] = useState([]);
  const [diet, setDiet] = useState([]);
  const [goals, setGoals] = useState([]);
  const [badges, setBadges] = useState([]);

  // inputs
  const [workoutInput, setWorkoutInput] = useState("");
  const [dietInput, setDietInput] = useState("");
  const [goalInput, setGoalInput] = useState("");

  // ----------------- FUNCTIONS -----------------
  const addWorkout = () => {
    if (!workoutInput.trim()) return;
    const updated = [...workouts, workoutInput];
    setWorkouts(updated);
    setWorkoutInput("");

    // badge reward
    if (updated.length === 5) setBadges([...badges, "🏅 Starter Badge"]);
    if (updated.length === 15) setBadges([...badges, "🔥 Beast Mode Badge"]);
  };

  const addDiet = () => {
    if (!dietInput.trim()) return;
    const updated = [...diet, dietInput];
    setDiet(updated);
    setDietInput("");

    if (updated.length === 10)
      setBadges([...badges, "🥗 Clean Eating Badge"]);
  };

  const addGoal = () => {
    if (!goalInput.trim()) return;
    setGoals([...goals, { text: goalInput, done: false }]);
    setGoalInput("");
  };

  const toggleGoal = (index) => {
    const updated = [...goals];
    updated[index].done = !updated[index].done;

    if (updated[index].done) {
      setBadges([...badges, "🎯 Goal Achiever"]);
    }

    setGoals(updated);
  };

  // ----------------- NAVBAR -----------------
  const Navbar = () => (
    <div style={styles.nav}>
      <h2 style={{ margin: 0 }}>💪 FitnessTracker</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {["home", "dashboard", "workouts", "diet", "goals", "achievements"].map((item) => (
          <span
            key={item}
            style={styles.navItem}
            onClick={() => setScreen(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );

  // ----------------- SCREENS -----------------

  const Home = () => (
    <div>
      {Navbar()}
      <div style={styles.hero}>
        <h1>Track • Train • Transform</h1>
        <p style={{ opacity: 0.8 }}>
          Your personal fitness tracker — simple, clean, and powerful.
        </p>
        <button style={styles.primaryBtn} onClick={() => setScreen("dashboard")}>
          Get Started
        </button>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div>
      {Navbar()}
      <div style={styles.container}>
        <h2>Dashboard</h2>

        <div style={styles.statsRow}>
          <div style={styles.statBox}>
            <h3>{workouts.length}</h3>
            <p>Workouts</p>
          </div>
          <div style={styles.statBox}>
            <h3>{diet.length}</h3>
            <p>Meals Logged</p>
          </div>
          <div style={styles.statBox}>
            <h3>{goals.filter((g) => g.done).length}</h3>
            <p>Goals Done</p>
          </div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <h3>Progress</h3>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${Math.min(workouts.length * 10, 100)}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );

  const WorkoutsScreen = () => (
    <div>
      {Navbar()}
      <div style={styles.container}>
        <h2>Workouts</h2>
        <div style={styles.inputRow}>
          <input
            style={styles.input}
            placeholder="e.g. Pushups - 20 reps"
            value={workoutInput}
            onChange={(e) => setWorkoutInput(e.target.value)}
          />
          <button style={styles.primaryBtn} onClick={addWorkout}>
            Add
          </button>
        </div>

        <ul style={styles.list}>
          {workouts.map((w, i) => (
            <li key={i} style={styles.listItem}>{w}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  const DietScreen = () => (
    <div>
      {Navbar()}
      <div style={styles.container}>
        <h2>Diet Log</h2>
        <div style={styles.inputRow}>
          <input
            style={styles.input}
            placeholder="e.g. Chicken + Rice - 500 cal"
            value={dietInput}
            onChange={(e) => setDietInput(e.target.value)}
          />
          <button style={styles.primaryBtn} onClick={addDiet}>
            Log
          </button>
        </div>

        <ul style={styles.list}>
          {diet.map((d, i) => (
            <li key={i} style={styles.listItem}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  const GoalsScreen = () => (
    <div>
      {Navbar()}
      <div style={styles.container}>
        <h2>Goals</h2>

        <div style={styles.inputRow}>
          <input
            style={styles.input}
            placeholder="e.g. Run 5km daily"
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
          />
          <button style={styles.primaryBtn} onClick={addGoal}>
            Add
          </button>
        </div>

        <ul style={styles.list}>
          {goals.map((g, i) => (
            <li key={i} style={styles.listItem}>
              <input
                type="checkbox"
                checked={g.done}
                onChange={() => toggleGoal(i)}
              />
              <span style={{ marginLeft: "10px", textDecoration: g.done ? "line-through" : "none" }}>
                {g.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const AchievementsScreen = () => (
    <div>
      {Navbar()}
      <div style={styles.container}>
        <h2>Achievements</h2>

        {badges.length === 0 ? (
          <p>No badges yet — keep training!</p>
        ) : (
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {badges.map((b, i) => (
              <div key={i} style={styles.badge}>{b}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // ----------------- SCREEN CONTROLLER -----------------
  return {
    home: <Home />,
    dashboard: <Dashboard />,
    workouts: <WorkoutsScreen />,
    diet: <DietScreen />,
    goals: <GoalsScreen />,
    achievements: <AchievementsScreen />
  }[screen];
}

// ----------------- UI STYLES -----------------
const styles = {
  nav: {
    padding: "20px 40px",
    background: "#111",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navItem: {
    cursor: "pointer",
    opacity: 0.8,
    transition: "0.2s",
  },
  hero: {
    padding: "70px 40px",
    background: "#181818",
    color: "white",
    textAlign: "left",
    borderRadius: "12px",
    margin: "40px",
  },
  container: {
    padding: "40px",
  },
  primaryBtn: {
    background: "#4f46e5",
    padding: "10px 18px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  statsRow: {
    display: "flex",
    gap: "20px",
  },
  statBox: {
    background: "#ffffff",
    padding: "22px",
    borderRadius: "12px",
    width: "180px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    color: "#111",
    fontWeight: "600"
},

  progressBar: {
    background: "#333",
    height: "10px",
    borderRadius: "10px",
    marginTop: "8px",
  },
  progressFill: {
    background: "#4f46e5",
    height: "10px",
    borderRadius: "10px",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
  },
  input: {
    padding: "10px",
    flex: 1,
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  list: {
    marginTop: "20px",
    paddingLeft: "20px",
  },
  listItem: {
    marginBottom: "10px",
  },
  badge: {
    background: "gold",
    padding: "8px 12px",
    borderRadius: "8px",
    fontWeight: "bold",
  },
};
