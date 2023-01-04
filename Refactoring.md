# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

1. I don't like side effects, so I made it more functional way and removed `let`
2. There was a lot of unnecessary `if` blocks, I removed them
3. I used destructuring for clearer code
4. Removed nested `if` blocks
5. Removed `TRIVIAL_PARTITION_KEY` variable, because `return "0"` inside `deterministicPartitionKey` functions says it without words, unneeded complexity. I left `MAX_PARTITION_KEY_LENGTH` however, because we comparing it with another value, so we need to clearly understand why. Name suggests the answer
6. I was thinking a lot about changing the hashing algorithm or `sha3-512`, but since I don't know the goal, I can't pick the most efficient one, so I leave is as it is right now
7. I wrote some basic tests, what we need is to be sure it returns string less then 256 char. for any input
8. First, I wanted to use a single `if (!event?.partitionKey)` block, bit stringify of `undefined` is still `undefined` so, I made an explicit check. It's unlikely we will get an empty input anyway. 