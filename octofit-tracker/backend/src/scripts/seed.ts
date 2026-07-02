import mongoose from 'mongoose';
import { connectToDatabase, User, Team, Activity, LeaderboardEntry, Workout } from '../models';

// Seed the octofit_db database with test data
async function seed() {
  await connectToDatabase();
  console.log('Seeding octofit_db with realistic sample data...');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const users = await User.insertMany([
    { name: 'Ava Chen', email: 'ava.chen@example.com', role: 'captain' },
    { name: 'Liam Patel', email: 'liam.patel@example.com', role: 'member' },
    { name: 'Mina Alvarez', email: 'mina.alvarez@example.com', role: 'member' }
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Rocket Squad',
      captain: users[0].name,
      members: users.map((user) => user.name)
    },
    {
      name: 'Storm Riders',
      captain: users[2].name,
      members: [users[1].name, users[2].name]
    }
  ]);

  await Activity.insertMany([
    {
      userId: users[0]._id.toString(),
      type: 'run',
      duration: 32,
      notes: 'Morning 5K with a strong finish.'
    },
    {
      userId: users[1]._id.toString(),
      type: 'workout',
      duration: 45,
      notes: 'Strength circuit focused on mobility.'
    },
    {
      userId: users[2]._id.toString(),
      type: 'cycling',
      duration: 60,
      notes: 'Steady hill intervals.'
    }
  ]);

  await LeaderboardEntry.insertMany([
    { userId: users[0]._id.toString(), score: 1420, streak: 8 },
    { userId: users[1]._id.toString(), score: 1180, streak: 5 },
    { userId: users[2]._id.toString(), score: 1295, streak: 6 }
  ]);

  await Workout.insertMany([
    { title: 'Core Blast', focus: 'strength', duration: 25, difficulty: 'beginner' },
    { title: 'Tempo Run', focus: 'endurance', duration: 35, difficulty: 'intermediate' },
    { title: 'Mobility Flow', focus: 'recovery', duration: 20, difficulty: 'beginner' }
  ]);

  console.log(`Seed complete: ${users.length} users, ${teams.length} teams, 3 activities, 3 leaderboard entries, and 3 workouts inserted.`);
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error('Seed failed:', error);
  await mongoose.disconnect();
  process.exit(1);
});
