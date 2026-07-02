"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = exports.mongoUri = void 0;
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'member' }
}, { timestamps: true, collection: 'users' });
const teamSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    captain: { type: String, required: true },
    members: { type: [String], default: [] }
}, { timestamps: true, collection: 'teams' });
const activitySchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, default: 0 },
    notes: { type: String, default: '' }
}, { timestamps: true, collection: 'activities' });
const leaderboardSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    score: { type: Number, required: true },
    streak: { type: Number, default: 0 }
}, { timestamps: true, collection: 'leaderboard' });
const workoutSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    focus: { type: String, required: true },
    duration: { type: Number, default: 30 },
    difficulty: { type: String, default: 'beginner' }
}, { timestamps: true, collection: 'workouts' });
exports.User = mongoose_1.default.model('User', userSchema);
exports.Team = mongoose_1.default.model('Team', teamSchema);
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
exports.LeaderboardEntry = mongoose_1.default.model('LeaderboardEntry', leaderboardSchema);
exports.Workout = mongoose_1.default.model('Workout', workoutSchema);
async function connectToDatabase() {
    if (mongoose_1.default.connection.readyState === 1) {
        return mongoose_1.default.connection;
    }
    await mongoose_1.default.connect(exports.mongoUri);
    return mongoose_1.default.connection;
}
