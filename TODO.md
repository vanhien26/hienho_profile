# Growth Portfolio Development Plan
**Status**: In Progress | Maintainer: BLACKBOXAI

## Phase 0: Passcode Authentication (Priority 1 - ✅ Complete)
- [x] ✅ Create AuthGate component (4-digit PIN input, contact UI)
- [x] ✅ Hardcode PIN ('1234') in utils/auth.ts (client-side)
- [x] ✅ Wrap app/layout.tsx với AuthProvider (sessionStorage, 1h expiry)
- [x] ✅ Styling: Dark fullscreen overlay, MoMo branding
- [x] ✅ Test: Lock/unlock, wrong PIN shake anim, contact link
- [x] ✅ Update README.md với setup instructions

## Phase 1: Core Enhancements (Next)
- [ ] Full-text search (fuse.js)
- [ ] Metrics charts (Recharts) 
- [ ] Integrate mini_webs.ts tab → Main page chỉ show Knowledge docs, Mini Web Registry separate tab (/use-case) **🔄 In Progress**

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

**Next Step**: Fix main page → test `npm run dev` → Phase 1 complete → user confirm → Phase 2.
