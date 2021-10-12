# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.5.1](https://github.com/thdk/scrum-poker-online/compare/v0.5.0...v0.5.1)

### Commits

- ci: pass env variables to deploy step [`12825b5`](https://github.com/thdk/scrum-poker-online/commit/12825b514a5f116d66e81fb2d8ac1fde7b39df57)

## [v0.5.0](https://github.com/thdk/scrum-poker-online/compare/v0.4.2...v0.5.0) - 2021-10-12

### Commits

- chore: upgrade firestorable with mobx6 and firebase modular api [`0873b2e`](https://github.com/thdk/scrum-poker-online/commit/0873b2e8f07a4b78ea1131ff0a4b5556c3a40b96)
- style: rename useStore to useAppStore [`d4c85fd`](https://github.com/thdk/scrum-poker-online/commit/d4c85fdbed730b32ae804d244cf7edfc1a10dc18)
- fix: always show non numeric scores on top of scoreboard [`11e27aa`](https://github.com/thdk/scrum-poker-online/commit/11e27aa576c914972425654c6f6e02a0e8f1a350)

## [v0.4.2](https://github.com/thdk/scrum-poker-online/compare/v0.4.1...v0.4.2) - 2021-01-31

### Commits

- chore: change icons and page title [`b10ffd0`](https://github.com/thdk/scrum-poker-online/commit/b10ffd0550e663cbd62aa9e0397c3ddb1914c23a)
- feat: truncate player names [`12530f2`](https://github.com/thdk/scrum-poker-online/commit/12530f24cb19a2bb495233b15def2dfa2485a890)

## [v0.4.1](https://github.com/thdk/scrum-poker-online/compare/v0.4.0...v0.4.1) - 2021-01-30

### Commits

- fix: styling of player board is broken on wide screen [`9f411b9`](https://github.com/thdk/scrum-poker-online/commit/9f411b9123c2fd2dc7d35dda44d321f1dd16db46)

## [v0.4.0](https://github.com/thdk/scrum-poker-online/compare/v0.3.0...v0.4.0) - 2021-01-30

### Fixed

- feat: allow to create a second group of players within a single session [`#9`](https://github.com/thdk/scrum-poker-online/issues/9)
- feat: allow player to redraw as long as other cards haven't been revealed [`#8`](https://github.com/thdk/scrum-poker-online/issues/8)

### Commits

- chore: use latest version of firebase and firestorable [`5828b8d`](https://github.com/thdk/scrum-poker-online/commit/5828b8dd388dd80e814610eeb4d786f831c778f4)
- refactor: use usePlayerStore instead of selector pattern [`2d60888`](https://github.com/thdk/scrum-poker-online/commit/2d60888bdb5129917cbdeda86c9495910356802f)
- build: use auto-changelog to generate changelog.md [`a1935dd`](https://github.com/thdk/scrum-poker-online/commit/a1935dd298f5043e280d3905d8207db7351eff22)

## [v0.3.0](https://github.com/thdk/scrum-poker-online/compare/v0.2.2...v0.3.0) - 2021-01-10

### Merged

- refactor: use react router [`#6`](https://github.com/thdk/scrum-poker-online/pull/6)
- build: use airbnb lint config [`#5`](https://github.com/thdk/scrum-poker-online/pull/5)
- fix: flickr in player score board [`#4`](https://github.com/thdk/scrum-poker-online/pull/4)

### Fixed

- fix: flickr in player score board (#4) [`#3`](https://github.com/thdk/scrum-poker-online/issues/3)

### Commits

- feat: hide player bench from tv page [`c879a34`](https://github.com/thdk/scrum-poker-online/commit/c879a34c893e74b71241d73c72b4a72cbf83dbbe)
- feat: add tv page that is available for all players [`d2d4203`](https://github.com/thdk/scrum-poker-online/commit/d2d4203c0da86c5039b58b3f5a613b9aa6616411)
- feat: add spare player setting to settings page [`e796795`](https://github.com/thdk/scrum-poker-online/commit/e796795c2ad738c898fe537fb4e0b38b268b65cc)

## [v0.2.2](https://github.com/thdk/scrum-poker-online/compare/v0.2.1...v0.2.2) - 2021-01-05

### Commits

- Show player form when player has no session set [`ad2b455`](https://github.com/thdk/scrum-poker-online/commit/ad2b4550c843f1e1128630c24a737a5fb06a8954)

## [v0.2.1](https://github.com/thdk/scrum-poker-online/compare/v0.2.0...v0.2.1) - 2021-01-05

### Commits

- Remove test step from yaml [`17f0875`](https://github.com/thdk/scrum-poker-online/commit/17f0875ee9cbad2827b8a18cd45513fc7e486fbf)

## [v0.2.0](https://github.com/thdk/scrum-poker-online/compare/v0.1.10...v0.2.0) - 2021-01-05

### Fixed

- Require login for all players [`#2`](https://github.com/thdk/scrum-poker-online/issues/2)
