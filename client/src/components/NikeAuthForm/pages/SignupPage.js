import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { FloatingInput, FloatingPasswordInput, FloatingSelect } from "../components/Fields";
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

const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(() => location.state?.email || readEmail());
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [shoppingPreference, setShoppingPreference] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ text: "", isError: false });

  useEffect(() => {
    if (location.state?.email) {
      const normalizedEmail = normalizeEmail(location.state.email);
      setEmail(normalizedEmail);
      saveEmail(normalizedEmail);
    }
  }, [location.state]);

  useEffect(() => {
    if (!email.trim()) {
      navigate("/lookup", { replace: true });
    }
  }, [email, navigate]);

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    setFeedback({ text: "", isError: false });

    if (!termsAccepted) {
      setFeedback({ text: "Bạn cần đồng ý với Terms of Use để tiếp tục.", isError: true });
      return;
    }

    const normalizedEmail = normalizeEmail(email);
    const dateOfBirth = `${year.trim()}-${month.trim()}-${day.trim()}`;
    const payload = {
      firstName: firstName.trim(),
      surname: surname.trim(),
      email: normalizedEmail,
      password,
      shoppingPreference,
      dateOfBirth,
    };

    if (!payload.firstName || !payload.surname || !payload.email || !payload.password || !payload.shoppingPreference || !day.trim() || !month.trim() || !year.trim()) {
      setFeedback({ text: "Vui lòng điền đầy đủ thông tin.", isError: true });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      saveAuthUser({
        email: payload.email,
        firstName: payload.firstName,
        surname: payload.surname,
      });
      navigate("/");
    } catch (error) {
      setFeedback({ text: "Không kết nối được server", isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell>
      <form className="space-y-4" onSubmit={handleCreateAccount}>
        <h1 className="text-[28px] font-medium leading-[1.05] tracking-tight text-zinc-900">Now let's make you a Nike Member.</h1>

        <p className="text-[15px] leading-snug text-zinc-900">
          {email} <button type="button" onClick={() => navigate("/lookup", { state: { email } })} className="underline text-zinc-500">Edit</button>
        </p>

        <div className="grid grid-cols-2 gap-3">
          <FloatingInput
            id="first-name"
            label="First Name*"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
            autoComplete="given-name"
          />
          <FloatingInput
            id="surname"
            label="Surname*"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
            required
            autoComplete="family-name"
          />
        </div>

        <FloatingPasswordInput
          id="signup-password"
          label="Password*"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
        />

        <ul className="space-y-1 pl-4 text-[13px] text-zinc-500">
          <li className="list-none">x Minimum of 8 characters</li>
          <li className="list-none">x Uppercase, lowercase letters and one number</li>
        </ul>

        <FloatingSelect
          id="shopping-preference"
          label="Shopping Preference*"
          value={shoppingPreference}
          onChange={(event) => setShoppingPreference(event.target.value)}
          required
          options={[
            { value: "men's", label: "Men's" },
            { value: "women's", label: "Women's" },
          ]}
        />

        <div className="space-y-2">
          <p className="text-[15px] font-medium text-zinc-900">Date of Birth</p>
          <div className="grid grid-cols-3 gap-3">
            <FloatingInput
              id="dob-day"
              label="Day*"
              value={day}
              onChange={(event) => setDay(event.target.value.replace(/[^0-9]/g, ""))}
              required
            />
            <FloatingInput
              id="dob-month"
              label="Month*"
              value={month}
              onChange={(event) => setMonth(event.target.value.replace(/[^0-9]/g, ""))}
              required
            />
            <FloatingInput
              id="dob-year"
              label="Year*"
              value={year}
              onChange={(event) => setYear(event.target.value.replace(/[^0-9]/g, ""))}
              required
            />
          </div>
          <p className="text-[10px] text-zinc-500">Get a Nike Member Reward on your birthday.</p>
        </div>

        <label className="flex items-start gap-3 text-[15px] leading-snug text-zinc-900">
          <input
            type="checkbox"
            checked={marketingOptIn}
            onChange={(event) => setMarketingOptIn(event.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-black"
          />
          <span>Sign up for emails to get updates from Nike on products, offers and your Member benefits.</span>
        </label>

        <label className="flex items-start gap-3 text-[15px] leading-snug text-zinc-900">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(event) => setTermsAccepted(event.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-black"
          />
          <span>
            I agree to Nike's <span className="underline">Privacy Policy</span> and <span className="underline">Terms of Use</span>.
          </span>
        </label>

        {feedback.text && <p className={`text-sm ${feedback.isError ? "text-red-600" : "text-zinc-600"}`}>{feedback.text}</p>}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-black px-7 py-2.5 text-[15px] font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Loading..." : "Create Account"}
          </button>
        </div>
      </form>
    </AuthShell>
  );
};

export default SignupPage;
