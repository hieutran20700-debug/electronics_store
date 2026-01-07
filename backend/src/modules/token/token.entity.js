class Token {
  constructor({ token, userId, userAgent, createdAt, revokedAt }) {
    this.token = token;
    this.userId = userId;
    this.userAgent = userAgent;
    this.createdAt = createdAt || new Date();
    this.revokedAt = revokedAt || null; // Mặc định là null (chưa bị thu hồi)
  }

  /**
   * Kiểm tra xem token đã hết hạn theo thời gian chưa
   */
  isExpired() {
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    const now = new Date().getTime();
    return now - this.createdAt.getTime() > sevenDaysInMs;
  }

  /**
   * Kiểm tra xem token có bị thu hồi thủ công không
   */
  isRevoked() {
    return !!this.revokedAt; // Trả về true nếu revokedAt có giá trị
  }

  /**
   * Kiểm tra tính hợp lệ tổng thể (Chưa hết hạn VÀ Chưa bị thu hồi)
   */
  isValid() {
    return !this.isExpired() && !this.isRevoked();
  }

  /**
   * Hành động thu hồi token (Thay đổi trạng thái của Entity)
   */
  revoke() {
    this.revokedAt = new Date();
  }
}

module.exports = Token;
