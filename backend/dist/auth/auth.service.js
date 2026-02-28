"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcrypt"));
const uuid_1 = require("uuid");
const firebase_service_1 = require("../integrations/firebase/firebase.service");
const users_service_1 = require("../users/users.service");
let AuthService = AuthService_1 = class AuthService {
    firebaseService;
    usersService;
    jwtService;
    configService;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(firebaseService, usersService, jwtService, configService) {
        this.firebaseService = firebaseService;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async authenticateWithGoogle(idToken) {
        const firebaseClaims = await this.firebaseService.verifyIdToken(idToken);
        let user = await this.usersService.findByFirebaseUid(firebaseClaims.uid);
        if (!user) {
            user = await this.usersService.create({
                email: firebaseClaims.email,
                displayName: firebaseClaims.name || firebaseClaims.email.split('@')[0],
                photoUrl: firebaseClaims.picture,
                firebaseUid: firebaseClaims.uid,
            });
            this.logger.log(`Created new user: ${user.email}`);
        }
        const tokens = await this.generateTokens(user);
        return {
            ...tokens,
            user: this.mapUserToDto(user),
        };
    }
    async refreshTokens(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get('jwt.secret'),
            });
            if (payload.type !== 'refresh') {
                throw new common_1.UnauthorizedException('Invalid token type');
            }
            const user = await this.usersService.findById(payload.sub);
            if (!user || !user.refreshTokenHash) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            const isValid = await bcrypt.compare(refreshToken, user.refreshTokenHash);
            if (!isValid) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            return this.generateTokens(user);
        }
        catch (error) {
            this.logger.error('Failed to refresh tokens', error);
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async validateUserById(userId) {
        return this.usersService.findById(userId);
    }
    async generateTokens(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: 900,
        });
        const refreshToken = this.jwtService.sign({ ...payload, type: 'refresh', jti: (0, uuid_1.v4)() }, {
            expiresIn: 604800,
        });
        const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
        await this.usersService.updateRefreshTokenHash(user.id, refreshTokenHash);
        return { accessToken, refreshToken };
    }
    mapUserToDto(user) {
        return {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            photoUrl: user.photoUrl,
            role: user.role,
        };
    }
    mapUserToResponse(user) {
        return this.mapUserToDto(user);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
        users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map