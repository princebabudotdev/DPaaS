import { useState } from "react";
import {
  Github,
  RefreshCcw,
  CheckCircle,
  XCircle,
} from "lucide-react";

const GitHubSync = () => {
  const [connected, setConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  const connectGitHub = () => {
    // later → OAuth redirect
    setConnected(true);
  };

  const disconnectGitHub = () => {
    setConnected(false);
    setLastSync(null);
  };

  const syncNow = () => {
    setSyncing(true);
    setTimeout(() => {
      setLastSync(new Date().toLocaleString());
      setSyncing(false);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          GitHub Sync
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Connect GitHub to sync repositories and developer activity.
        </p>
      </div>

      {/* CONNECTION STATUS */}
      <section
        className="
          rounded-lg p-6
          bg-white dark:bg-[#010409]
          border border-neutral-200 dark:border-neutral-800
        "
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Github className="text-neutral-700 dark:text-neutral-300" />
            <div>
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                GitHub Account
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                {connected
                  ? "Your GitHub account is connected"
                  : "No GitHub account connected"}
              </p>
            </div>
          </div>

          {connected ? (
            <button
              onClick={disconnectGitHub}
              className="
                rounded-md px-3 py-1.5 text-xs
                border border-neutral-300 dark:border-neutral-800
                text-neutral-700 dark:text-neutral-300
                hover:bg-neutral-100 dark:hover:bg-neutral-900
                transition
              "
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={connectGitHub}
              className="
                rounded-md px-3 py-1.5 text-xs
                bg-neutral-900 dark:bg-neutral-800
                text-white
                hover:bg-neutral-800 dark:hover:bg-neutral-700
                transition
              "
            >
              Connect GitHub
            </button>
          )}
        </div>

        {/* STATUS */}
        <div className="mt-4 flex items-center gap-2 text-sm">
          {connected ? (
            <>
              <CheckCircle size={16} className="text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">
                Connected
              </span>
            </>
          ) : (
            <>
              <XCircle size={16} className="text-red-500" />
              <span className="text-red-600 dark:text-red-400">
                Not connected
              </span>
            </>
          )}
        </div>
      </section>

      {/* SYNC SECTION */}
      <section
        className="
          rounded-lg p-6
          bg-white dark:bg-[#010409]
          border border-neutral-200 dark:border-neutral-800
          space-y-4
        "
      >
        <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          Sync Data
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SyncItem label="Repositories" />
          <SyncItem label="Pinned Projects" />
          <SyncItem label="Activity Summary" />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            {lastSync ? `Last synced: ${lastSync}` : "No sync performed yet"}
          </p>

          <button
            onClick={syncNow}
            disabled={!connected || syncing}
            className="
              flex items-center gap-2 px-3 py-1.5 text-xs rounded-md
              border border-neutral-300 dark:border-neutral-800
              text-neutral-700 dark:text-neutral-300
              hover:bg-neutral-100 dark:hover:bg-neutral-900
              disabled:opacity-50 transition
            "
          >
            <RefreshCcw
              size={14}
              className={syncing ? "animate-spin" : ""}
            />
            Sync now
          </button>
        </div>
      </section>
    </div>
  );
};

export default GitHubSync;

/* ---------- SMALL COMPONENT ---------- */

const SyncItem = ({ label }) => (
  <div
    className="
      rounded-md p-4
      bg-neutral-50 dark:bg-transparent
      border border-neutral-200 dark:border-neutral-800
    "
  >
    <p className="text-sm text-neutral-900 dark:text-neutral-200">
      {label}
    </p>
    <p className="text-xs text-neutral-600 dark:text-neutral-500 mt-1">
      Automatically updated
    </p>
  </div>
);
