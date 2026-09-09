import assert from "node:assert/strict";
import test from "node:test";
import { CLEAN_INITIAL_STATE } from "./seed.ts";
import {
  LEGACY_STORAGE_KEY,
  loadInitial,
  STORAGE_KEY,
} from "./storage.ts";

test("loadInitial migrates a valid legacy snapshot to the AfterBills key", () => {
  const values = new Map<string, string>();
  const localStorage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
  };
  const previousWindow = (globalThis as typeof globalThis & { window?: unknown }).window;

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: { localStorage },
  });

  try {
    const legacyState = {
      ...CLEAN_INITIAL_STATE,
      settings: { ...CLEAN_INITIAL_STATE.settings, hasCompletedOnboarding: true },
      bills: [
        {
          id: "legacy-bill",
          title: "Legacy bill",
          monthlyAmount: 1000,
          frequency: "MONTHLY" as const,
          dueDayOfMonth: 15,
        },
      ],
      accruals: [{ billId: "legacy-bill", accrued: 200 }],
    };
    values.set(LEGACY_STORAGE_KEY, JSON.stringify(legacyState));

    const loaded = loadInitial();

    assert.equal(loaded.bills[0]?.id, "legacy-bill");
    assert.ok(values.has(STORAGE_KEY));
    assert.ok(values.has(LEGACY_STORAGE_KEY));
    assert.deepEqual(JSON.parse(values.get(STORAGE_KEY)!), loaded);
  } finally {
    if (previousWindow === undefined) {
      Reflect.deleteProperty(globalThis, "window");
    } else {
      Object.defineProperty(globalThis, "window", {
        configurable: true,
        value: previousWindow,
      });
    }
  }
});
