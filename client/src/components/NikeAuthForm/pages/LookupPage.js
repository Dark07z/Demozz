import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SelectCountries from "../components/SelectCountries";
import AuthShell from "../components/AuthShell";
import { FloatingInput } from "../components/Fields";
import { API_BASE, normalizeEmail, readCountry, readEmail, saveCountry, saveEmail } from "../authFlow";

const LookupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const countrySelectRef = useRef(null);

  const [email, setEmail] = useState(() => location.state?.email || readEmail());
  const [selectedCountry, setSelectedCountry] = useState(() => readCountry());
  const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ text: "", isError: false });

  useEffect(() => {
    if (location.state?.email) {
      const normalizedEmail = normalizeEmail(location.state.email);
      setEmail(normalizedEmail);
      saveEmail(normalizedEmail);
    }
  }, [location.state]);

  const handleLookupSubmit = async (event) => {
    event.preventDefault();
    setFeedback({ text: "", isError: false });

    const normalizedEmail = normalizeEmail(email);
    if (!normalizedEmail) {
      setFeedback({ text: "Vui lòng nhập email.", isError: true });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const result = await response.json();
      saveEmail(normalizedEmail);

      if (result.exists) {
        navigate("/login", { state: { email: normalizedEmail } });
      } else {
        navigate("/signup", { state: { email: normalizedEmail } });
      }
    } catch (error) {
      setFeedback({ text: "Không kết nối được server", isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenCountrySelector = () => {
    const selectElement = countrySelectRef.current;
    if (!selectElement) {
      return;
    }

    if (typeof selectElement.showPicker === "function") {
      try {
        selectElement.showPicker();
        return;
      } catch (error) {
      }
    }

    setIsCountrySelectorOpen(true);
    setTimeout(() => selectElement.focus(), 0);
  };

  return (
    <AuthShell>
      <form className="space-y-6" onSubmit={handleLookupSubmit}>
        <h1 className="text-[28px] font-medium leading-[1.05] tracking-tight text-zinc-900">Enter your email to join us or sign in.</h1>

        <div classname="relative">  
          <p className="text-[16px] font-medium leading-none text-zinc-900">
            {selectedCountry}
            <button type="button" className="ml-2 cursor-pointer text-zinc-500 underline" onClick={handleOpenCountrySelector}>
              Change
            </button>
          </p>

          <div className={`max-w-[500px] ${isCountrySelectorOpen ? "mt-1" : "pointer-events-none absolute h-0 overflow-hidden opacity-10"}`}>
            <SelectCountries
              id="lookup-country"
              name="lookup-country"
              value={selectedCountry}
              selectRef={countrySelectRef}
              onBlur={() => setIsCountrySelectorOpen(false)}
              onChange={(nextCountry) => {
                setSelectedCountry(nextCountry);
                saveCountry(nextCountry);
                setIsCountrySelectorOpen(false);
              }}
              className="border border-zinc-400 bg-transparent text-zinc-900 outline-none focus:border-black"
            />
          </div>
        </div>

        <FloatingInput
          id="lookup-email"
          label="Email*"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
        />

        <p className="text-[12px] text-zinc-500">
          By continuing, I agree to Nike's <span className="underline">Privacy Policy</span> and <span className="underline">Terms of Use</span>.
        </p>

        {feedback.text && <p className={`text-sm ${feedback.isError ? "text-red-600" : "text-zinc-600"}`}>{feedback.text}</p>}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-black px-5 py-2.5 text-[15px] font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Loading..." : "Continue"}
          </button>
        </div>
      </form>
    </AuthShell>
  );
};

export default LookupPage;
