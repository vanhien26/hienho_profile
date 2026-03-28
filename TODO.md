# Growth Portfolio Development Plan
**Status**: In Progress | Maintainer: BLACKBOXAI

## Phase 0: Passcode Authentication (Priority 1 - Current)
- [ ] ✅ Create AuthGate component (4-digit PIN input, contact UI)
- [ ] ✅ Hardcode PIN ('1234') in utils/auth.ts (client-side)
- [ ] ✅ Wrap app/layout.tsx với AuthProvider (sessionStorage, 1h expiry)
- [ ] ✅ Styling: Dark fullscreen overlay, MoMo branding
- [ ] ✅ Test: Lock/unlock, wrong PIN shake anim, contact link
- [ ] ✅ Update README.md với setup instructions

## Phase 1: Core Enhancements
- [ ] Full-text search (fuse.js)
- [ ] Metrics charts (Recharts)
- [ ] Integrate mini_webs.ts tab

## Phase 2: CMS Features
- [ ] Inline project editor (React Hook Form)
- [ ] New project builder UI

## Phase 3: Analytics & Export
- [ ] GA4 integration
- [ ] PDF/JSON export

## Phase 4: Polish
- [ ] Dark mode
- [ ] PWA
- [ ] i18n (vi/en)

**Next Step**: Implement Phase 0 → `npm run dev` test auth → user confirm → Phase 1.
