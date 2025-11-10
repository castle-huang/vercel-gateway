// src/app.ts
import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

// 中间件：解析 JSON 请求体
app.use(express.json());

// 基础路由
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello, TypeScript + Express!',
        timestamp: new Date().toISOString()
    });
});

// 健康检查端点
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK' });
});

// 用户路由示例
app.get('/users', (req: Request, res: Response) => {
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
    ];
    res.json(users);
});

// 带参数的路由
app.get('/users/:id', (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    res.json({ id: userId, name: `User ${userId}` });
});

// POST 请求示例
app.post('/users', (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const newUser = {
        id: Date.now(),
        name: name
    };

    res.status(201).json(newUser);
});

// 修复：使用正确的 404 处理方式
app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.path,
        method: req.method
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;