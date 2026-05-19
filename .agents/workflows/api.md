---
description: Check API endpoint structure before making an API call
---

# /api Workflow

Use this workflow before creating any new API call to verify endpoint structure, parameters, and response shape.

## Steps

1. Use GitHub MCP to read `docs/api.md` from the https://github.com/DolgopolovArseniy/donathell-back
2. Find the relevant endpoint for the current task
3. Extract:
   - HTTP method and path
   - Required and optional parameters
   - Response shape (fields, types)
   - Auth requirements (Bearer token etc.)
4. Summarize what you found to the user before writing any code
5. If the endpoint doesn't exist in `docs/api.md` — stop and inform, do not guess or invent a structure