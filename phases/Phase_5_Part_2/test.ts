// test.ts
// Phase 5 - 2d : Concrete Assert-Based Test Cases
// Run with : npx ts-node test.ts

import assert from "assert";
import { GenerateTestTextUseCase } from "./1_Generate_Test_Text/GenerateTestTextUseCase";
import { DisplayTestResultsUseCase } from "./2_Display_Test_Results/DisplayTestResultsUseCase";
import { WordBank, TestResult } from "./CommonData";

// USE CASE 1 : GENERATE TEST TEXT

const generateUseCase = new GenerateTestTextUseCase();

const generated10 = generateUseCase.generateTestText(10);

assert.strictEqual(generated10.wordCount, 10);
assert.strictEqual(generated10.content.split(" ").length, 10);
assert.ok(generated10.textId.startsWith("text-"));
assert.ok(generated10.createdAt instanceof Date);

const generated25 = generateUseCase.generateTestText(25);

assert.strictEqual(generated25.wordCount, 25);
assert.strictEqual(generated25.content.split(" ").length, 25);
assert.ok(generated25.textId.startsWith("text-"));
assert.ok(generated25.createdAt instanceof Date);

assert.throws(
    () => generateUseCase.generateTestText(0),
    /wordCount must be greater than 0\./
);

const customWordBank: WordBank = {
    words: ["alpha", "beta"]
};

const customGenerateUseCase = new GenerateTestTextUseCase(customWordBank);
const customGenerated = customGenerateUseCase.generateTestText(20);

assert.strictEqual(customGenerated.wordCount, 20);
assert.strictEqual(customGenerated.content.split(" ").length, 20);

for (const word of customGenerated.content.split(" ")) {
    assert.ok(word === "alpha" || word === "beta");
}

const emptyWordBank: WordBank = {
    words: []
};

const emptyGenerateUseCase = new GenerateTestTextUseCase(emptyWordBank);

assert.throws(
    () => emptyGenerateUseCase.generateTestText(10),
    /Word bank is empty\./
);

// USE CASE 2 : DISPLAY TEST RESULTS

const displayUseCase = new DisplayTestResultsUseCase();

const highPerformerResult: TestResult = {
    sessionId: "session-001",
    wpm: 95,
    accuracy: 98.5,
    totalChars: 430,
    completedAt: new Date("2026-04-23T12:00:00")
};

const displayedHighPerformer = displayUseCase.displayTestResults(highPerformerResult);

assert.strictEqual(displayedHighPerformer.sessionId, "session-001");
assert.strictEqual(displayedHighPerformer.wpm, 95);
assert.strictEqual(displayedHighPerformer.accuracy, 98.5);
assert.strictEqual(displayedHighPerformer.totalChars, 430);
assert.ok(displayedHighPerformer.completedAt instanceof Date);
assert.ok(displayedHighPerformer.summaryMessage.length > 0);

const beginnerResult: TestResult = {
    sessionId: "session-002",
    wpm: 20,
    accuracy: 74.0,
    totalChars: 90,
    completedAt: new Date("2026-04-23T12:01:00")
};

const displayedBeginner = displayUseCase.displayTestResults(beginnerResult);

assert.strictEqual(displayedBeginner.sessionId, "session-002");
assert.strictEqual(displayedBeginner.wpm, 20);
assert.strictEqual(displayedBeginner.accuracy, 74.0);
assert.strictEqual(displayedBeginner.totalChars, 90);
assert.ok(displayedBeginner.completedAt instanceof Date);
assert.ok(displayedBeginner.summaryMessage.length > 0);

assert.throws(
    () =>
        displayUseCase.displayTestResults({
            sessionId: "session-003",
            wpm: -5,
            accuracy: 80,
            totalChars: 150,
            completedAt: new Date("2026-04-23T12:02:00")
        })
);

assert.throws(
    () =>
        displayUseCase.displayTestResults({
            sessionId: "session-004",
            wpm: 60,
            accuracy: 110,
            totalChars: 200,
            completedAt: new Date("2026-04-23T12:03:00")
        })
);

assert.throws(
    () =>
        displayUseCase.displayTestResults({
            sessionId: "session-005",
            wpm: 60,
            accuracy: 90,
            totalChars: -1,
            completedAt: new Date("2026-04-23T12:04:00")
        })
);

console.log("Phase 5 - 2d concrete assert-based test cases passed.");
