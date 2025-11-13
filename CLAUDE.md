# CLAUDE.md - AI Assistant Guide for Spark

## Project Overview

**Spark** is a location-based social discovery platform that combines real-time heat maps, verified user connections, and gamification to facilitate safe in-person meetups. Think of it as Snapchat Map + Foursquare + Tinder verification.

### Core Mission
Enable users to discover social hotspots, connect with verified people nearby, and meet in-person safely through a privacy-preserving, gamified experience.

---

## Repository Structure

```
Spark/
├── spark_technical_specification.md  # Complete technical specification
├── spark-iphone17-demo.html         # DEPRECATED - See demo/ directory
├── demo/                            # Interactive UI/UX mockup (refactored)
│   ├── index.html                   # Main demo page
│   ├── README.md                    # Demo documentation
│   ├── css/                         # Stylesheets organized by concern
│   │   ├── base.css                # Global styles and resets
│   │   ├── iphone.css              # iPhone 17 frame and Dynamic Island
│   │   ├── components.css          # Reusable UI components
│   │   ├── screens.css             # Screen-specific layouts
│   │   └── animations.css          # Keyframe animations
│   └── js/                          # JavaScript modules by feature
│       ├── app.js                  # Main app initialization
│       ├── navigation.js           # Screen switching logic
│       ├── map.js                  # Map screen functionality
│       ├── discovery.js            # Card swiping and matching
│       ├── sparks.js               # Sparks screen functionality
│       ├── profile.js              # Profile screen functionality
│       └── ui.js                   # UI utilities (notifications, etc.)
└── CLAUDE.md                        # This file - AI assistant guide
```

### Current Development Stage
**Phase: Early Planning/Prototype**
- Technical specification complete
- UI/UX prototype complete (HTML demo - modularized)
- Backend implementation: NOT STARTED
- Mobile apps: NOT STARTED
- Infrastructure: NOT STARTED

---

## Demo Directory

The `demo/` directory contains an interactive iPhone 17 mockup of the Spark app. The original monolithic HTML file has been refactored into a modular structure for better development and troubleshooting.

### Demo Architecture

**CSS Organization (5 files):**
- `base.css` - Global resets, body styles, gradient backgrounds
- `iphone.css` - iPhone 17 frame, Dynamic Island, status bar, screen structure
- `components.css` - Reusable components (buttons, badges, cards, toggles, etc.)
- `screens.css` - Screen-specific layouts (map, discovery, sparks, profile)
- `animations.css` - All keyframe animations (@keyframes)

**JavaScript Modules (7 files):**
- `app.js` - Main initialization, global state, real-time updates
- `navigation.js` - Screen switching and tab navigation
- `map.js` - Heat map, location services, venue pins, check-in
- `discovery.js` - Card swiping, drag handlers, matching logic
- `sparks.js` - Spark requests, acceptance/decline, notifications
- `profile.js` - Settings toggles, profile interactions
- `ui.js` - Dynamic Island, notifications, loading states

**Benefits of Refactored Structure:**
- Separation of concerns (CSS by purpose, JS by feature)
- Easier debugging (find issues in specific modules)
- Better maintainability (modify one aspect without touching others)
- Reusable components (extract and reuse in production)
- Faster development (work on different parts simultaneously)
- Clear code organization (developers know where to look)

### Running the Demo

**The demo is 100% static HTML5 and runs directly in any browser:**

```bash
# Easiest way - just open the file
open demo/index.html

# Or double-click demo/index.html in your file explorer
```

**No server, no build process, no installation required!**

The demo uses:
- Pure HTML5/CSS3/JavaScript (no frameworks)
- Only external dependency: Font Awesome CDN for icons
- All assets are self-contained or loaded from CDN
- Works with direct file:// protocol

See `demo/README.md` for complete documentation and development guidelines.

---

## Technical Architecture

### Technology Stack (Planned)

**Backend:**
- Node.js/Express API servers
- PostgreSQL with PostGIS for geospatial data
- Redis for heat map caching and real-time data
- Kafka/Kinesis for location streaming
- WebSocket for real-time updates

**Mobile:**
- React Native or native iOS/Android
- Real-time location services
- Push notifications

**Infrastructure:**
- AWS (ECS Fargate, Lambda, RDS, ElastiCache, S3)
- CloudFront CDN for heat map tiles
- Docker for containerization

### Key Systems

1. **Authentication & Verification**
   - Multi-tier verification (phone, email, social accounts, ID)
   - Trust score calculation (0-1000 scale)
   - Progressive verification levels

2. **Location Services**
   - Multi-signal verification (GPS, WiFi, Bluetooth)
   - Privacy-preserving heat maps with differential privacy
   - K-anonymity requirement (minimum 3 users)
   - 5-10 minute location delays
   - Tile-based rendering for performance

3. **User Levels & Gamification**
   - Ghost (0-99 points): Limited features
   - Explorer (100-499): Basic sparks, better precision
   - Connector (500-1999): Unlimited sparks, event creation
   - Ambassador (2000+): VIP perks, moderation tools

4. **Matching & Discovery**
   - Collaborative filtering
   - Content-based filtering
   - Social graph integration
   - Temporal patterns analysis

5. **Safety System**
   - Panic button functionality
   - Behavioral anomaly detection
   - Community reporting
   - Trusted contacts notification
   - Auto-moderation at report thresholds

6. **Spark Messaging**
   - Double opt-in required
   - Daily spark limits based on user level
   - 24-hour expiration
   - Auto-deleting messages
   - Temporary location sharing (2 hours after acceptance)

---

## Development Workflow

### When Starting New Work

1. **Read the technical specification first** (`spark_technical_specification.md`)
2. **Check the current implementation state** (most systems not yet implemented)
3. **Verify security requirements** before implementing any feature
4. **Follow the phased rollout plan** (Beta → Campus → Expansion → City)

### Code Implementation Order

Follow the "IMMEDIATE ACTION ITEMS" in the technical spec:

1. Setup development environment (Docker Compose)
2. Database schema with PostGIS
3. Phone + social authentication
4. Location capture with multi-signal verification
5. Heat map tile generation
6. Privacy filters and differential privacy
7. WebSocket for real-time updates
8. Spark double opt-in system
9. Trust score calculation
10. Safety features
11. Progressive user levels
12. Subscription payment processing
13. Venue dashboard
14. Comprehensive logging/monitoring
15. Tests for all critical paths

### Git Workflow

- **Main branch**: `main` (or master)
- **Feature branches**: Use Claude-specific branches starting with `claude/` and ending with session ID
- **Commit messages**: Clear, descriptive, focused on "why" not just "what"
- **Never force push** to main/master
- **Always create PR** with comprehensive summary and test plan

---

## Key Conventions & Best Practices

### Security-First Development

**CRITICAL RULES - NEVER VIOLATE:**

1. **Location Privacy**
   - NEVER show exact location without mutual consent
   - ALWAYS verify location with 3+ signals before displaying
   - REQUIRE minimum 3 users for heat map generation (k-anonymity)
   - IMPLEMENT 5-10 minute delay on all location updates
   - MAINTAIN 7-day retention on raw location data

2. **User Safety**
   - AUTO-ENABLE SafeMode for users with trust_score < 100
   - VALIDATE every check-in against impossible travel
   - LOG all safety-related events for audit trail
   - IMPLEMENT panic button that immediately hides location

3. **Anti-Gaming Measures**
   - ENFORCE daily point caps to prevent gaming (200 points max/day)
   - Apply diminishing returns on repeated actions
   - Verify action legitimacy before awarding points

4. **API Security**
   - RATE-LIMIT all endpoints (user: 100/min, IP: 1000/min)
   - Never skip authentication on any endpoint
   - Validate all input rigorously
   - Prevent SQL injection, XSS, command injection

5. **Data Protection**
   - Never commit secrets (.env, credentials, API keys)
   - Use environment variables for all sensitive config
   - Encrypt PII at rest and in transit

### Code Quality Standards

**Testing Requirements:**
- Unit test coverage: 80% minimum
- Integration test coverage: 60% minimum
- E2E critical paths: 100% coverage

**Critical Test Paths:**
- user_registration_verification
- location_privacy_filters
- spark_double_optin
- panic_button_activation
- payment_processing
- heat_map_aggregation

**Performance Targets:**
- 100K concurrent users
- 10K location updates/second
- API response time p99: 200ms
- 50K WebSocket connections
- Heat map tile generation: 50ms

### Database Conventions

**Location Data:**
- Use PostGIS for geospatial queries
- Partition locations table by time (7-day retention)
- Index geospatial columns with GIST
- Cache heat map tiles in Redis (60s TTL)

**Data Retention:**
- Raw location data: 7 days
- Aggregated heat map data: 30 days
- User profiles: Indefinite (until deletion request)
- Messages: Auto-delete after 24 hours
- Spark requests: 24-hour expiration

### API Design

**Endpoint Naming:**
- Use RESTful conventions
- Plural nouns for collections
- Nested resources where appropriate
- Version APIs (`/api/v1/...`)

**Response Format:**
```javascript
{
  "success": true,
  "data": {...},
  "error": null,
  "meta": {
    "timestamp": "2025-11-13T...",
    "version": "1.0"
  }
}
```

**Error Handling:**
- Use standard HTTP status codes
- Provide clear error messages
- Never expose internal details
- Log errors with context

---

## Privacy & Compliance

### Privacy-Preserving Techniques

1. **Differential Privacy**
   - Add calibrated noise to location data
   - Prevent individual identification from aggregated data

2. **K-Anonymity**
   - Minimum 3 users required for any heat map zone
   - Never show zones with < 3 users

3. **Location Precision Levels**
   - Level 1: 1km² zones (low trust)
   - Level 2: 500m radius (basic trust)
   - Level 3: 100m radius (verified users)
   - Level 4: Exact location (mutual opt-in only)

4. **Time Delays**
   - 5-10 minute delay on all public location updates
   - Real-time only for accepted Spark connections

### Compliance Considerations

- **GDPR**: Right to deletion, data portability, consent
- **CCPA**: California privacy requirements
- **Age Verification**: 18+ only, verify on signup
- **Location Permissions**: Clear, informed consent
- **Data Minimization**: Collect only what's necessary

---

## Working with This Codebase as an AI Assistant

### Before Starting Any Task

1. **Read `spark_technical_specification.md`** for complete context
2. **Check current implementation state** (most features not built yet)
3. **Identify security implications** of the feature
4. **Review the 12 CRITICAL IMPLEMENTATION RULES** in the spec
5. **Consider privacy impact** of any location/user data handling

### When Implementing Features

**DO:**
- Follow the technical specification exactly
- Implement all safety features for any user-facing functionality
- Add comprehensive error handling and logging
- Write tests before marking work complete
- Consider edge cases and abuse scenarios
- Use the TodoWrite tool to track multi-step implementations
- Ask clarifying questions about ambiguous requirements

**DON'T:**
- Skip security measures for "MVP" or "quick prototype"
- Implement location features without privacy protections
- Hard-code secrets or configuration
- Assume the spec is outdated (verify first)
- Make breaking changes without discussion
- Implement features in isolation (consider system integration)

### Common Tasks

**Adding a New API Endpoint:**
1. Define endpoint in the spec (or verify it exists)
2. Implement authentication middleware
3. Add rate limiting
4. Validate all inputs
5. Implement business logic with safety checks
6. Add error handling
7. Log important events
8. Write unit and integration tests
9. Document in API documentation

**Implementing Location Feature:**
1. Review location privacy requirements
2. Implement multi-signal verification (GPS + WiFi + BT)
3. Add differential privacy noise
4. Check k-anonymity requirements
5. Apply time delays (5-10 minutes)
6. Implement impossible travel detection
7. Add audit logging
8. Test privacy preservation

**Building Safety Feature:**
1. Review safety system requirements
2. Implement immediate action (e.g., hide location)
3. Add notification system (trusted contacts, support)
4. Log incident with full context
5. Create audit trail
6. Test emergency scenarios
7. Ensure 24/7 monitoring integration

### Testing Approach

**For Every Feature:**
- Write unit tests for business logic
- Create integration tests for API endpoints
- Add E2E tests for critical user flows
- Test error scenarios and edge cases
- Verify security measures (auth, rate limiting, input validation)
- Check privacy preservation (location data, user info)
- Load test performance-critical features

**Before Committing:**
- Run all tests
- Check test coverage meets standards
- Verify no secrets in code
- Review security implications
- Ensure logging is comprehensive

### Documentation Standards

**Code Comments:**
- Explain "why" not "what"
- Document security decisions
- Note privacy considerations
- Reference spec sections where applicable

**API Documentation:**
- Describe purpose and use cases
- List all parameters with types and constraints
- Show example requests and responses
- Document error codes and meanings
- Note rate limits and authentication requirements

**Architecture Decisions:**
- Document major technical decisions
- Explain tradeoffs considered
- Reference performance benchmarks
- Note scalability considerations

---

## Monitoring & Observability

### Key Metrics to Track

**User Metrics:**
- user_signups_per_hour
- successful_meetups_per_day
- trust_score_distribution
- user_level_distribution

**Safety Metrics:**
- safety_incidents_per_week
- panic_button_activations
- report_submission_rate
- fake_checkin_rate

**Technical Metrics:**
- api_response_time_p50/p95/p99
- location_updates_per_second
- websocket_connection_count
- heatmap_tile_cache_hit_rate
- database_connection_pool_usage

**Business Metrics:**
- revenue_per_user
- subscription_conversion_rate
- payment_failure_rate
- venue_partnership_count

### Alert Thresholds

**Critical Alerts (Immediate Response):**
- safety_incidents > 5 in 1 hour
- api_error_rate > 0.1% in 5 minutes
- database_connection_failures > 10 in 1 minute
- panic_button_activation (always alert)

**Warning Alerts (Review Within 1 Hour):**
- fake_checkin_rate > 1% in 10 minutes
- payment_failures > 5% in 1 hour
- heatmap_tile_latency > 100ms p95
- websocket_disconnections > 10% in 5 minutes

---

## Launch Readiness Checklist

Before any launch phase, verify:

- [ ] All safety features tested and functional
- [ ] Location privacy working (differential privacy, k-anonymity)
- [ ] Trust scoring preventing fake accounts
- [ ] Heat maps updating in real-time with <5s delay
- [ ] Payment processing working for all tiers
- [ ] Venue partnerships secured (targets vary by phase)
- [ ] Seed users recruited
- [ ] Legal compliance verified (privacy, age verification)
- [ ] Crisis response plan documented and tested
- [ ] 24/7 support system ready
- [ ] Monitoring and alerts configured
- [ ] Load testing passed performance targets
- [ ] Security audit completed
- [ ] Penetration testing completed
- [ ] Data backup and recovery tested
- [ ] Rollback plan documented and tested

---

## Phase-Specific Guidance

### Phase 1: Beta (4 weeks, 500 users, single campus)

**Focus:**
- Core heat map functionality
- Basic verification (phone + email)
- Essential safety features (panic button, reporting)
- Simple location tracking

**Success Metrics:**
- Day 7 retention: 40%
- Zero safety incidents
- Heat map accuracy validated
- Average response time <200ms

### Phase 2: Campus Expansion (8 weeks, 10K users)

**Focus:**
- Full verification system
- Spark messaging
- Basic gamification
- Enhanced privacy features

**Success Metrics:**
- Daily active users: 30%
- 100+ successful meetups
- Trust score system working
- Payment system integrated

### Phase 3: Multi-Campus (12 weeks, 3 universities)

**Focus:**
- Premium subscription tiers
- Venue partnerships
- Advanced matching algorithms
- B2B venue dashboard

**Success Metrics:**
- Monthly revenue: $10K
- User acquisition cost: $5
- Venue partnership: 50+ locations
- Premium conversion: 5%

### Phase 4: City Launch (NYC, LA, Austin)

**Focus:**
- Full platform features
- Scale infrastructure
- Advanced analytics
- Marketing partnerships

**Success Metrics:**
- MRR: $100K
- Ready for Series A funding
- 100K+ active users
- Enterprise venue clients

---

## Common Pitfalls to Avoid

1. **Location Privacy Shortcuts**
   - Never skip privacy delays for "better UX"
   - Don't reduce k-anonymity threshold
   - Always implement all location verification signals

2. **Gamification Exploits**
   - Test all point-earning actions for abuse
   - Implement rate limits on everything
   - Use diminishing returns to prevent farming

3. **Safety Feature Gaps**
   - Don't launch without panic button
   - Test behavioral anomaly detection thoroughly
   - Ensure 24/7 monitoring before launch

4. **Performance Assumptions**
   - Load test early and often
   - Don't assume caching will solve all problems
   - Monitor database query performance

5. **Scope Creep**
   - Follow phased rollout strictly
   - Don't add features before core is solid
   - Validate each phase before moving forward

---

## Getting Help

### When You're Uncertain

1. **Check the technical specification** - it's comprehensive
2. **Review the CRITICAL IMPLEMENTATION RULES** - they're non-negotiable
3. **Ask the user for clarification** - better than guessing
4. **Search for similar implementations** - in the spec or code
5. **Consider security and privacy first** - always

### What to Escalate

- Ambiguities in security requirements
- Privacy considerations not covered in spec
- Performance tradeoffs affecting user safety
- Legal/compliance questions
- Major architectural decisions
- Changes to core user flows
- Database schema modifications
- API contract changes

---

## Resources

### Internal Documentation
- `spark_technical_specification.md` - Complete technical specification
- `demo/` - Interactive UI/UX mockup (modularized)
  - `demo/README.md` - Demo documentation and usage guide
  - `demo/index.html` - Interactive iPhone 17 prototype
- `spark-iphone17-demo.html` - DEPRECATED (see demo/ directory)

### External Resources (Planned)
- API Documentation (not yet created)
- Architecture Decision Records (not yet created)
- Deployment Runbooks (not yet created)
- Incident Response Playbooks (not yet created)

---

## Version History

- **v1.1** (2025-11-13): Demo refactoring
  - Refactored monolithic HTML demo into modular structure
  - Created demo/ directory with organized CSS and JS files
  - Added demo/README.md with comprehensive documentation
  - Updated repository structure documentation
  - Deprecated spark-iphone17-demo.html in favor of demo/ directory

- **v1.0** (2025-11-13): Initial CLAUDE.md creation
  - Project overview and structure
  - Technical architecture overview
  - Development workflows
  - Security and privacy guidelines
  - AI assistant best practices

---

## Notes for AI Assistants

### This Project is Safety-Critical

Spark involves:
- Real-world meetups between strangers
- Location data of real people
- Potential for harassment, stalking, or harm
- Financial transactions (subscriptions)

**Every decision must prioritize user safety and privacy over features, speed, or convenience.**

### Trust the Specification

The technical specification is comprehensive and well-thought-out. It includes:
- Detailed security measures
- Privacy-preserving techniques
- Anti-abuse mechanisms
- Performance targets

When in doubt, refer to the spec. If the spec is unclear, ask for clarification rather than making assumptions.

### Think About Abuse Scenarios

For every feature, consider:
- How could this be abused?
- What if a user tries to game the system?
- What if someone uses this to stalk or harass?
- What if the data is leaked?
- What if someone creates fake accounts?

### Progressive Enhancement

Follow the phased rollout plan:
1. Build core safely
2. Test thoroughly
3. Launch small
4. Validate success metrics
5. Only then expand

Don't jump ahead to Phase 4 features when Phase 1 isn't complete.

### When Implementation Differs from Spec

If you find the specification needs updating:
1. Document why the change is needed
2. Explain the tradeoffs
3. Get approval before implementing
4. Update the spec alongside the code

---

**Remember: We're building a platform that brings people together in real life. Safety, privacy, and trust are not optional - they're the foundation of everything we build.**
