const JwtUtils = require("../../utils/jwt");
const Token = require("./token.entity");
const TokenRepository = require("./token.repository");
const CreateError = require("../../utils/create.error");
const UserRepository = require("../user/user.repository");

class TokenService{
    async generateAuthTokens(user, userAgent = ""){
        const payload = {
            id: user.id,
            roles: user.roles,
        }

        const accessToken = JwtUtils.createAccessToken(payload);
        const refreshToken = JwtUtils.createRefreshToken(payload);

        const tokenEntity = new Token({
            token: refreshToken,
            userId: user.id,
            userAgent: userAgent
        })

        await TokenRepository.createToken(tokenEntity);

        return {
            accessToken,
            refreshToken,
        }
    }

    async refreshAuth(refreshTokenString){
        let payload;
        try{
            payload = JwtUtils.verifyRefreshToken(refreshTokenString);
        }catch(error){
            throw CreateError.createError(
              401,
              "Invalid or expired refresh token"
            );
        }
       
        const tokenEntity = await TokenRepository.findToken(refreshTokenString);
      
        if(!tokenEntity){
            throw CreateError.createError(404, "Refresh token not found");
        }

        if(!tokenEntity.isValid()){
            throw CreateError.createError(401, "Refresh token revoked");
        }

        const user = await UserRepository.findById(payload.id);
        if(!user || !user.isActive){
            throw CreateError.createError(401, "User is no longer active");
        }

        tokenEntity.revoke();
        await TokenRepository.updateToken(tokenEntity);

        const tokenPayload = {
            id: user.id,
            roles: user.roles
        }

        
        const newToken = await this.generateAuthTokens(tokenPayload, tokenEntity.userAgent);

        return newToken
    }

    async logout(refreshTokenString){
        const tokenEntity = await TokenRepository.findToken(refreshTokenString);
        if(tokenEntity){
            tokenEntity.revoke();
            await TokenRepository.updateToken(tokenEntity);
        }
    }

    async revokeAllUserTokens(userId){
        return await TokenRepository.deleteByUserId(userId);
    }
}

module.exports = new TokenService();