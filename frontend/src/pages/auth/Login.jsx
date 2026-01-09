import React, { useContext, useState } from "react";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import "../../assets/styles/auth/auth.css";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthProvider";
const Login = () => {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = showPassword ? "text" : "password";

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [form, setForm] = useState({
    phone: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try{
      const {phone, password} = form;
      await login({phone, password});
    }catch(error){
      console.log(error);
    }
  }

  return (
    <section className="auth-wrapper">
      <div className="auth-form">
        <h3 className="auth-title">Chào mừng bạn tới SnowMobile</h3>
        <p className="auth-description m-0">
          Bạn đã từng mua sắm tại SnowMobile? Đăng nhập xem hạng thẻ ngay
        </p>
        <form className="form" onSubmit={handleOnSubmit}>
          <div className="input-box">
            <input
              className="auth-input"
              type="text"
              placeholder="Số điện thoại của bạn"
              name="phone"
              value={form.phone}
              onChange={handleOnChange}
            />
          </div>
          <div className="input-box">
            <input
              className="auth-input"
              type={isPassword}
              placeholder="Mật khẩu"
              name="password"
              value={form.password}
              onChange={handleOnChange}
            />
            <div onClick={handleShowPassword}>
              {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
            </div>
          </div>
          <Button type="submit" className="w-100 custom-btn">Đăng nhập</Button>
          <div className="d-flex gap-2">
            <p style={{ fontSize: "14px" }}>Bạn chưa có tài khoản</p>
            <a
              href="/register"
              style={{
                textDecoration: "none",
                color: "var(--color-primary)",
                fontSize: "14px",
              }}
            >
              Đăng ký
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
