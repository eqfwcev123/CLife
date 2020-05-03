"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var post_1 = require("./post");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], User.prototype, "id");
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            length: 100,
            nullable: false
        }),
        __metadata("design:type", String)
    ], User.prototype, "username");
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            length: 100,
            nullable: false
        }),
        __metadata("design:type", String)
    ], User.prototype, "password");
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            length: 150,
            unique: true,
            nullable: false
        }),
        __metadata("design:type", String)
    ], User.prototype, "email");
    __decorate([
        typeorm_1.Column({
            type: "string",
            length: 100,
            nullable: false
        }),
        __metadata("design:type", String)
    ], User.prototype, "name");
    __decorate([
        typeorm_1.CreateDateColumn({ name: "created_at" }),
        __metadata("design:type", Date)
    ], User.prototype, "createdAt");
    __decorate([
        typeorm_1.UpdateDateColumn({ name: "updated_at" }),
        __metadata("design:type", Date)
    ], User.prototype, "updatedAt");
    __decorate([
        typeorm_1.OneToMany(function (type) { return post_1.Post; }, function (post) { return post.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "posts");
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}(typeorm_1.BaseEntity));
exports.User = User;
