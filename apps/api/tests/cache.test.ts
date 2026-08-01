import { describe, test, expect } from "bun:test";
import { SmartCache } from "../src/lib/cache";

describe("SmartCache Unit Tests", () => {
  test("sets and gets values before TTL expires", () => {
    const cache = new SmartCache(10);
    cache.set("key1", { data: "test" }, 60);

    const val = cache.get<{ data: string }>("key1");
    expect(val).not.toBeNull();
    expect(val?.data).toBe("test");
  });

  test("returns null for non-existent key", () => {
    const cache = new SmartCache(10);
    expect(cache.get("missing")).toBeNull();
  });

  test("invalidates pattern correctly", () => {
    const cache = new SmartCache(10);
    cache.set("insights:field1", "val1", 60);
    cache.set("agronomy:field1", "val2", 60);
    cache.set("insights:field2", "val3", 60);

    cache.invalidatePattern("field1");

    expect(cache.get("insights:field1")).toBeNull();
    expect(cache.get("agronomy:field1")).toBeNull();
    expect(cache.get("insights:field2")).not.toBeNull();
  });
});
