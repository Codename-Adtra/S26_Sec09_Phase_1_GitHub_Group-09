// Seeds the word_bank table with ~200 common English words used for typing tests.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const words: string[] = [
    "the", "of", "and", "to", "in", "is", "you", "that", "it", "he",
    "was", "for", "on", "are", "as", "with", "his", "they", "at", "be",
    "this", "have", "from", "or", "one", "had", "by", "word", "but", "not",
    "what", "all", "were", "we", "when", "your", "can", "said", "there", "use",
    "an", "each", "which", "she", "do", "how", "their", "if", "will", "up",
    "other", "about", "out", "many", "then", "them", "these", "so", "some", "her",
    "would", "make", "like", "him", "into", "time", "has", "look", "two", "more",
    "write", "go", "see", "no", "way", "could", "people", "my", "than", "first",
    "water", "been", "call", "who", "its", "now", "find", "long", "down", "day",
    "did", "get", "come", "made", "may", "part", "over", "new", "sound", "take",
    "only", "little", "work", "know", "place", "year", "live", "back", "give", "most",
    "very", "after", "thing", "our", "just", "name", "good", "sentence", "man", "think",
    "say", "great", "where", "help", "through", "much", "before", "line", "right", "too",
    "mean", "old", "any", "same", "tell", "boy", "follow", "came", "want", "show",
    "also", "around", "form", "three", "small", "set", "put", "end", "why", "again",
    "turn", "here", "off", "went", "old", "number", "great", "men", "read", "need",
    "land", "different", "home", "us", "move", "try", "kind", "hand", "picture", "change",
    "play", "spell", "air", "away", "animal", "house", "point", "page", "letter", "mother",
    "answer", "found", "study", "still", "learn", "should", "world", "high", "every", "near",
    "add", "food", "between", "own", "below", "country", "plant", "last", "school", "father"
];

async function main() {
    const result = await prisma.word.createMany({
        data: words.map(w => ({ word: w })),
        skipDuplicates: true
    });
    console.log(`Seed complete: inserted ${result.count} words.`);
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
