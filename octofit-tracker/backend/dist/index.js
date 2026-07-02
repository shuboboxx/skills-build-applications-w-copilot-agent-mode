"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express_1.default.json());
const sampleUsers = [
    { id: 'user-1', name: 'Ava Chen', email: 'ava.chen@example.com', role: 'captain' },
    { id: 'user-2', name: 'Liam Patel', email: 'liam.patel@example.com', role: 'member' }
];
const sampleTeams = [
    { id: 'team-1', name: 'Rocket Squad', captain: 'Ava Chen', members: ['Ava Chen', 'Liam Patel'] }
];
const sampleActivities = [
    { id: 'activity-1', userId: 'user-1', type: 'run', duration: 30, notes: 'Morning 5K' }
];
const sampleLeaderboard = [
    { id: 'entry-1', userId: 'user-1', score: 420, streak: 7 }
];
const sampleWorkouts = [
    { id: 'workout-1', title: 'Core Blast', focus: 'strength', duration: 25, difficulty: 'beginner' }
];
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-backend',
        apiBaseUrl: baseUrl,
        codespaceName: codespaceName || null
    });
});
async function listWithFallback(model, fallback) {
    try {
        await (0, models_1.connectToDatabase)();
        const docs = await model.find().lean();
        return { data: docs, source: 'mongodb' };
    }
    catch (error) {
        console.warn('Database query failed, using fallback data:', error);
        return { data: fallback, source: 'memory' };
    }
}
async function createWithFallback(model, payload, fallback) {
    try {
        await (0, models_1.connectToDatabase)();
        const document = await model.create(payload);
        return { data: document, source: 'mongodb' };
    }
    catch (error) {
        console.warn('Database create failed, using fallback data:', error);
        return { data: { ...fallback, ...payload }, source: 'memory' };
    }
}
app.get('/api/users', async (_req, res) => {
    const result = await listWithFallback(models_1.User, sampleUsers);
    res.json({ count: result.data.length, items: result.data, source: result.source });
});
app.get('/api/users/', async (_req, res) => {
    const result = await listWithFallback(models_1.User, sampleUsers);
    res.json({ count: result.data.length, items: result.data, source: result.source });
});
app.post('/api/users', async (req, res) => {
    const payload = req.body;
    const result = await createWithFallback(models_1.User, payload, { id: `user-${Date.now()}`, ...payload });
    res.status(201).json(result);
});
app.get('/api/teams/', async (_req, res) => {
    const result = await listWithFallback(models_1.Team, sampleTeams);
    res.json({ count: result.data.length, items: result.data, source: result.source });
});
app.post('/api/teams', async (req, res) => {
    const payload = req.body;
    const result = await createWithFallback(models_1.Team, payload, { id: `team-${Date.now()}`, ...payload });
    res.status(201).json(result);
});
app.get('/api/activities/', async (_req, res) => {
    const result = await listWithFallback(models_1.Activity, sampleActivities);
    res.json({ count: result.data.length, items: result.data, source: result.source });
});
app.post('/api/activities', async (req, res) => {
    const payload = req.body;
    const result = await createWithFallback(models_1.Activity, payload, { id: `activity-${Date.now()}`, ...payload });
    res.status(201).json(result);
});
app.get('/api/leaderboard/', async (_req, res) => {
    const result = await listWithFallback(models_1.LeaderboardEntry, sampleLeaderboard);
    res.json({ count: result.data.length, items: result.data, source: result.source });
});
app.post('/api/leaderboard', async (req, res) => {
    const payload = req.body;
    const result = await createWithFallback(models_1.LeaderboardEntry, payload, { id: `entry-${Date.now()}`, ...payload });
    res.status(201).json(result);
});
app.get('/api/workouts/', async (_req, res) => {
    const result = await listWithFallback(models_1.Workout, sampleWorkouts);
    res.json({ count: result.data.length, items: result.data, source: result.source });
});
app.post('/api/workouts', async (req, res) => {
    const payload = req.body;
    const result = await createWithFallback(models_1.Workout, payload, { id: `workout-${Date.now()}`, ...payload });
    res.status(201).json(result);
});
async function start() {
    try {
        await (0, models_1.connectToDatabase)();
        console.log(`MongoDB connected to ${models_1.mongoUri}`);
    }
    catch (error) {
        console.warn('MongoDB unavailable, continuing in memory mode:', error);
    }
    app.listen(port, () => {
        console.log(`OctoFit backend listening on port ${port}`);
        console.log(`API base URL: ${baseUrl}`);
    });
}
start().catch((error) => {
    console.error('Failed to start backend:', error);
    process.exit(1);
});
