"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskResolver = void 0;
const Task_1 = require("../entities/Task");
const type_graphql_1 = require("type-graphql");
let TaskResolver = class TaskResolver {
    tasks({ em }) {
        return __awaiter(this, void 0, void 0, function* () {
            return em.find(Task_1.Task, {});
        });
    }
    task(id, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            return em.findOne(Task_1.Task, { id });
        });
    }
    createTask(type, location, dueDate = new Date(), { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = em.create(Task_1.Task, { type, location, dueDate });
            yield em.persistAndFlush(task);
            return task;
        });
    }
    updateTask(id, type, location, dueDate = new Date(), { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield em.findOne(Task_1.Task, { id, type, location, dueDate });
            if (!task) {
                return null;
            }
            task.type = type;
            task.location = location;
            task.dueDate = dueDate;
            yield em.persistAndFlush(task);
            return task;
        });
    }
    deleteTask(id, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield em.nativeDelete(Task_1.Task, { id });
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Task_1.Task]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "tasks", null);
__decorate([
    type_graphql_1.Query(() => Task_1.Task, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "task", null);
__decorate([
    type_graphql_1.Mutation(() => Task_1.Task),
    __param(0, type_graphql_1.Arg("type", () => String)),
    __param(1, type_graphql_1.Arg("location", () => String)),
    __param(2, type_graphql_1.Arg("dueDate", () => Date)),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "createTask", null);
__decorate([
    type_graphql_1.Mutation(() => Task_1.Task, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => Number)),
    __param(1, type_graphql_1.Arg("type", () => String)),
    __param(2, type_graphql_1.Arg("location", () => String)),
    __param(3, type_graphql_1.Arg("dueDate", () => Date)),
    __param(4, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "updateTask", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => Number)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "deleteTask", null);
TaskResolver = __decorate([
    type_graphql_1.Resolver()
], TaskResolver);
exports.TaskResolver = TaskResolver;
//# sourceMappingURL=task.js.map