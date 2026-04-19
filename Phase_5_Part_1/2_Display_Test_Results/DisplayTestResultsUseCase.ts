import { TestResult, DisplayedTestResult } from "../CommonData";

// Takes a completed test result and returns a display-ready object with a summary message.

export class DisplayTestResultsUseCase {

    displayTestResults(result: TestResult): DisplayedTestResult {
        // Validate the result object
        if (!result) {
            throw new Error("Test result is required.");
        }
        if (result.wpm < 0) {
            throw new Error("WPM cannot be negative.");
        }
        if (result.accuracy < 0 || result.accuracy > 100) {
            throw new Error("Accuracy must be between 0 and 100.");
        }
        if (result.totalChars < 0) {
            throw new Error("Total characters cannot be negative.");
        }

        // Build a simple summary message based on WPM performance
        const summaryMessage = this.buildSummaryMessage(result.wpm, result.accuracy);

        const displayed: DisplayedTestResult = {
            sessionId: result.sessionId,
            wpm: result.wpm,
            accuracy: result.accuracy,
            totalChars: result.totalChars,
            completedAt: result.completedAt,
            summaryMessage: summaryMessage
        };

        return displayed;
    }

    // Helper: generates a short feedback message based on wpm and accuracy.
    private buildSummaryMessage(wpm: number, accuracy: number): string {
        let speedLabel: string;
        if (wpm >= 80) {
            speedLabel = "Excellent speed";
        } else if (wpm >= 50) {
            speedLabel = "Good speed";
        } else if (wpm >= 25) {
            speedLabel = "Average speed";
        } else {
            speedLabel = "Keep practicing";
        }

        return `${speedLabel} — ${wpm} WPM with ${accuracy.toFixed(1)}% accuracy.`;
    }
}
