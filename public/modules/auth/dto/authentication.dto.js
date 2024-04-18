"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const registration_dto_1 = require("./registration.dto");
class AuthenticationDTO extends (0, mapped_types_1.PartialType)(registration_dto_1.RegistrationDTO) {
}
exports.AuthenticationDTO = AuthenticationDTO;
//# sourceMappingURL=authentication.dto.js.map