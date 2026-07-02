import mongoose from 'mongoose';

export const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'member' }
}, { timestamps: true, collection: 'users' });

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  captain: { type: String, required: true },
  members: { type: [String], default: [] }
}, { timestamps: true, collection: 'teams' });

const activitySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, default: 0 },
  notes: { type: String, default: '' }
}, { timestamps: true, collection: 'activities' });

const leaderboardSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  score: { type: Number, required: true },
  streak: { type: Number, default: 0 }
}, { timestamps: true, collection: 'leaderboard' });

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  focus: { type: String, required: true },
  duration: { type: Number, default: 30 },
  difficulty: { type: String, default: 'beginner' }
}, { timestamps: true, collection: 'workouts' });

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(mongoUri);
  return mongoose.connection;
}
