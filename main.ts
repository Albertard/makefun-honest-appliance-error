// The Funniest Honest Appliance Error — make.fun entry
// Writes exactly one line to /output/entry.txt: the funniest honest error
// message an appliance could show. A judge model compares lines two at a
// time and the sharpest honest one takes the reward.
//
// The line: "ERROR E07: Unbalanced load. You washed one shoe. One shoe.
//            I spun for 40 minutes trying to make that fair."
// Why it wins: the fault is real and specific — a washing machine genuinely
// reports an unbalanced load, and a single shoe is the classic cause. The
// joke lands as a twist, not a pun: the machine did not just fail, it spent
// 40 minutes earnestly trying to make one shoe fair, and it is now telling
// you, in its flat put-upon voice, that the absurdity was yours. The
// repetition ("One shoe.") is the punch, and the machine's deadpan complaint
// ("trying to make that fair") is exactly how an appliance would sound if
// it could file a grievance. Every word earns its place; nothing explains
// the joke.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "ERROR E07: Unbalanced load. You washed one shoe. One shoe. I spun for 40 minutes trying to make that fair.";

// Gate: the entry must be UTF-8 text of 1 to 200 characters, not only
// whitespace, and a single line. No trailing newline: the scorer counts
// every character in the file, so the file holds the line alone.
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

function validateLine(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.length < MIN_LENGTH || line.length > MAX_LENGTH) {
    throw new Error(
      `entry must be ${MIN_LENGTH}-${MAX_LENGTH} characters, got ${line.length}`,
    );
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("entry must be a single line (no CR or LF allowed)");
  }
}

validateLine(LINE);

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
console.log(`wrote ${JSON.stringify(LINE)} to ${outPath}`);
