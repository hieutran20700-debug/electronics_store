import React, { useState, useContext } from "react";
import { Eye, EyeClosed } from "lucide-react";
import "../../assets/styles/auth/auth.css";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthProvider";
import { AlertContext } from "../../contexts/AlertProvider";

const Register = () => {
  const { register } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState("");


  const isPassword = showPassword ? "text" : "password";

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if(name === "password" && value.length >= 6){
      setErrors("");
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const { phone, password, confirmPassword } = form;

      if (!phone || !password || !confirmPassword) {
        showAlert("Vui lòng nhập đầy đủ thông tin", "danger");
        return;
      }

      if (password !== confirmPassword) {
        showAlert("Mật khẩu nhập lại không khớp", "danger");
        return;
      }
      await register({ phone, password });

      setForm({
        phone: "",
        password: "",
        confirmPassword: "",
      });
      setErrors(""); 
      showAlert("Đăng ký thành công", "success");
    } catch (error) {
      const message =
        error?.response?.data?.errors?.[0] ||
        error?.response?.data?.message ||
        "Đăng ký thất bại";
      setErrors(message);
    }
  };

  return (
    <section className="auth-wrapper">
      <div className="auth-form">
        <h3 className="auth-title">Chào mừng bạn tới SnowMobile</h3>
        {errors && <div className="errors-message">{errors}</div>}
        <p className="auth-description m-0">
          Bạn chưa từng mua sắm tại SnowMobile? Đăng ký ngay để nhận nhiều ưu
          đãi hấp dẫn
        </p>
        <form className="form" onSubmit={handleOnSubmit}>
          <div className="input-box">
            <input
              className="auth-input"
              type="text"
              placeholder="Số điện thoại của bạn"
              onChange={handleOnChange}
              value={form.phone}
              name="phone"
            />
          </div>
          <div className={`input-box ${errors ? "input-box-error" : ""}`}>
            <input
              className="auth-input"
              type={isPassword}
              placeholder="Mật khẩu"
              onChange={handleOnChange}
              value={form.password}
              name="password"
            />
            <div onClick={handleShowPassword}>
              {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
            </div>
          </div>

          <div className={`input-box ${errors ? "input-box-error" : ""}`}>
            <input
              className="auth-input"
              type={isPassword}
              placeholder="Nhập lại mật khẩu"
              onChange={handleOnChange}
              value={form.confirmPassword}
              name="confirmPassword"
            />
          </div>
          <Button type="submit" className="w-100 custom-btn">
            Đăng ký
          </Button>
          <a
            style={{
              textDecoration: "none",
              color: "var(--color-primary)",
              fontSize: "14px",
            }}
            href="/login"
          >
            Đăng nhập ngay
          </a>
        </form>
      </div>
    </section>
  );
};

export default Register;
