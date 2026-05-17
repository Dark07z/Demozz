import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { FloatingPasswordInput } from "../components/Fields";
import { API_BASE, normalizeEmail, readEmail, saveEmail } from "../authFlow";

const AUTH_USER_STORAGE_KEY = "nike-auth-user";
const AUTH_CHANGE_EVENT = "nike-auth-changed";

const saveAuthUser = (user) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(() => location.state?.email || readEmail());
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ text: "", isError: false });

  useEffect(() => {
    if (location.state?.email) {
      const normalizedEmail = normalizeEmail(location.state.email);
      setEmail(normalizedEmail);
      saveEmail(normalizedEmail);
    }
  }, [location.state]);



  const handleSignIn = async (event) => {
    event.preventDefault();
    setFeedback({ text: "", isError: false });

    if (!password.trim()) {
      setFeedback({ text: "Vui lòng nhập mật khẩu.", isError: true });
      return;
    }

    setIsSubmitting(true);
    try {
      const normalizedEmail = normalizeEmail(email);
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });

      const result = await response.json();
      const loginSuccess = result === "Success" || result?.status === "Success";

      if (loginSuccess) {
        saveEmail(normalizedEmail);
        saveAuthUser({
          email: normalizedEmail,
          firstName: result?.user?.firstName || "",
          surname: result?.user?.surname || "",
        });
        navigate("/");
        return;
      }

      if (result === "Wrong password") {
        setFeedback({ text: "Sai mật khẩu. Vui lòng thử lại.", isError: true });
      }
    } catch (error) {
      setFeedback({ text: "Không kết nối được server", isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell>
      <form className="space-y-4" onSubmit={handleSignIn}>
        <h1 className="text-[28px] mt-7 font-medium leading-[1.05] tracking-tight text-zinc-900">What's your password?</h1>

        <p className="text-[15px] leading-snug text-zinc-900">
          {email} <button type="button" onClick={() => navigate("/lookup", { state: { email } })} className="underline text-zinc-500">Edit</button>
        </p>

        <FloatingPasswordInput
          id="login-password"
          label="Password*"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          autoComplete="current-password"
        />

        <button type="button" className="text-[14px] font-semibold text-zinc-500 underline">Forgotten your password?</button>

        {feedback.text && <p className={`text-sm ${feedback.isError ? "text-red-600" : "text-zinc-600"}`}>{feedback.text}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-black py-2.5 text-[16px] font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Loading..." : "Sign In"}
        </button>
      </form>
    </AuthShell>
  );
};

export default LoginPage;
