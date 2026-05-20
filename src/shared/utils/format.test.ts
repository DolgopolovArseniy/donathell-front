import { describe, it, expect } from '@jest/globals';
import { formatCompactNumber, formatCurrency } from "./format";

describe("format utilities", () => {
  describe("formatCompactNumber", () => {
    it("should return the exact number as string if less than 1000", () => {
      expect(formatCompactNumber(999)).toBe("999");
      expect(formatCompactNumber(0)).toBe("0");
    });

    it("should format thousands with 'k' suffix and one decimal place", () => {
      expect(formatCompactNumber(1500)).toBe("1.5k");
      expect(formatCompactNumber(999999)).toBe("1000k"); 
    });

    it("should drop the '.0' decimal place for exact thousands", () => {
      expect(formatCompactNumber(1000)).toBe("1k");
      expect(formatCompactNumber(5000)).toBe("5k");
    });

    it("should format millions with 'mil' suffix and one decimal place", () => {
      expect(formatCompactNumber(1500000)).toBe("1.5mil");
      expect(formatCompactNumber(2340000)).toBe("2.3mil");
    });

    it("should drop the '.0' decimal place for exact millions", () => {
      expect(formatCompactNumber(1000000)).toBe("1mil");
      expect(formatCompactNumber(10000000)).toBe("10mil");
    });
  });

  describe("formatCurrency", () => {
    it("should format currency using standard Intl.NumberFormat when compact is false", () => {
      expect(formatCurrency(1500)).toBe("$1,500.00");
      expect(formatCurrency(0)).toBe("$0.00");
    });

    it("should format currency with a compact suffix when compact is true", () => {
      expect(formatCurrency(1500, true)).toBe("$1.5k");
      expect(formatCurrency(1000000, true)).toBe("$1mil");
      expect(formatCurrency(500, true)).toBe("$500");
    });
  });
});
