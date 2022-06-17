"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const apollo_server_1 = require("apollo-server");
const type_graphql_1 = require("type-graphql");
const type_graphql_2 = require("@generated/type-graphql");
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        // ... Building schema here
        const schema = yield (0, type_graphql_1.buildSchema)({
            resolvers: type_graphql_2.resolvers,
            validate: false,
        });
        // Create the GraphQL server
        const server = new apollo_server_1.ApolloServer({
            schema,
            context: () => ({ prisma }),
        });
        //server.applyMiddleware({ app });
        // Start the server
        const { url } = yield server.listen(PORT);
        console.log(`Server is running, GraphQL Playground available at ${url}`);
    });
}
bootstrap();
