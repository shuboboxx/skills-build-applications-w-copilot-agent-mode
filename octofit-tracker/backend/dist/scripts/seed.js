"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
// Seed the octofit_db database with test data
async function seed() {
    await (0, models_1.connectToDatabase)();
    console.log('Seeding octofit_db with realistic sample data...');
    await Promise.all([
        models_1.User.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.Activity.deleteMany({}),
        models_1.LeaderboardEntry.deleteMany({}),
        models_1.Workout.deleteMany({})
    ]);
    const users = await models_1.User.insertMany([
        { name: 'Ava Chen', email: 'ava.chen@example.com', role: 'captain' },
        { name: 'Liam Patel', email: 'liam.patel@example.com', role: 'member' },
        { name: 'Mina Alvarez', email: 'mina.alvarez@example.com', role: 'member' }
    ]);
    const teams = await models_1.Team.insertMany([
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
    await models_1.Activity.insertMany([
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
    await models_1.LeaderboardEntry.insertMany([
        { userId: users[0]._id.toString(), score: 1420, streak: 8 },
        { userId: users[1]._id.toString(), score: 1180, streak: 5 },
        { userId: users[2]._id.toString(), score: 1295, streak: 6 }
    ]);
    await models_1.Workout.insertMany([
        { title: 'Core Blast', focus: 'strength', duration: 25, difficulty: 'beginner' },
        { title: 'Tempo Run', focus: 'endurance', duration: 35, difficulty: 'intermediate' },
        { title: 'Mobility Flow', focus: 'recovery', duration: 20, difficulty: 'beginner' }
    ]);
    console.log(`Seed complete: ${users.length} users, ${teams.length} teams, 3 activities, 3 leaderboard entries, and 3 workouts inserted.`);
    await mongoose_1.default.disconnect();
}
seed().catch(async (error) => {
    console.error('Seed failed:', error);
    await mongoose_1.default.disconnect();
    process.exit(1);
});
