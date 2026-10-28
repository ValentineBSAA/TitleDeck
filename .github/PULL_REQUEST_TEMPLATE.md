## Summary

What changes, and why? Link the issue and identify Steam/non-Steam behavior.

## Regression checklist

- [ ] `node --test tests/*.test.cjs` passes
- [ ] `python3 -m unittest discover -s tests -p 'test_*.py'` passes
- [ ] `src/index.js` and `dist/index.js` remain identical for a release build
- [ ] Game names, local descriptions, save/restore, backup and original Steam presentation unaffected
- [ ] Steam **and** non-Steam Game Info paths considered separately
- [ ] Steam Deck built-in and external-controller LB/RB Full Library Manager paging protected
- [ ] TitleDeck editor right-stick behavior distinguished from Steam Game Info right-stick behavior
- [ ] Missing/odd artwork and hidden-title restoration tested where relevant
- [ ] No new developer-only controls exposed to ordinary users
- [ ] Physical hardware evidence separated from automated-only tests
- [ ] README, changelog, compatibility and release notes updated if needed

**Hardware / SteamOS / Steam client / Decky version:**  
**Real-device verification results:**  
**Unverified scenarios / known issues:**
