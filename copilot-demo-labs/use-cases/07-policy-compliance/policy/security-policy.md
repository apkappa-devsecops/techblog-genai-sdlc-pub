# Security Policy

1. Do not log secrets, tokens, or passwords.
2. All write endpoints must require authentication.
3. Use parameterized SQL only, never string interpolation.
4. Enforce input validation on user-provided values.
5. Use least privilege by default.
