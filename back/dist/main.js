"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const express_1 = require("express");
const platform_express_1 = require("@nestjs/platform-express");
async function bootstrap() {
    const server = (0, express_1.default)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    app.setGlobalPrefix('api');
    server.use(express_1.default.static((0, path_1.join)(__dirname, '..', 'dist')));
    server.get('*', (req, res) => {
        res.sendFile((0, path_1.join)(__dirname, '..', 'dist', 'index.html'));
    });
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map