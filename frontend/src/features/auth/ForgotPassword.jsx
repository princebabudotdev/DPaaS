import { useState } from "react";
import { Lock } from "lucide-react";

export default function ResetPasswordStep() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-xl p-8">

        <h1 className="text-2xl font-semibold text-center text-slate-900 dark:text-white">
          Reset password
        </h1>

        {step === 1 && (
          <>
            <p className="mt-2 text-sm text-center text-slate-500">
              Verify your current password
            </p>

            <div className="mt-6 relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                placeholder="Current password"
                className="w-full rounded-xl border py-3 pl-10 pr-4"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-white"
            >
              Continue
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="mt-2 text-sm text-center text-slate-500">
              Choose a new password
            </p>

            <input
              type="password"
              placeholder="New password"
              className="mt-6 w-full rounded-xl border py-3 px-4"
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="mt-4 w-full rounded-xl border py-3 px-4"
            />

            <button className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-white">
              Update password
            </button>
          </>
        )}
      </div>
    </div>
  );
}
