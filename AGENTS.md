# MotionLex development workflow

- For user-requested changes to this website, complete the change, run relevant checks, commit, and push to `origin/main` unless the user asks to keep the work local or use a pull request.
- Vercel deploys `main` to `https://www.motionlex.online/`. After pushing, confirm the deployment succeeded and check the affected public page before reporting that a change is live.
- Never commit API keys, SSH keys, tokens, or `.env.local`. The repository's SSH identity is configured only in this machine's local Git config.
