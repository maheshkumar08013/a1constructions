# CMS API & Admin Usage

This document describes the CMS API endpoints and admin UI usage for the A1 Construction project.

## Public Endpoints
- `GET /api/cms/posts` — List public posts/pages.
- `GET /api/cms/posts/:slug` — Get a single post by slug.
- `GET /api/cms/terms` — List taxonomy terms.
- `GET /api/cms/settings` — Get site settings (public view may filter autoload).

## Admin Endpoints (require auth)
Base path: `/api/admin` (the frontend proxy forwards `/api` to backend)

- `POST /api/auth/login` — Authenticate admin and receive JWT.

- Posts/Pages
  - `GET /api/admin/cms/posts` — List posts (admin view).
  - `POST /api/admin/cms/posts` — Create post. Body fields: `title`, `slug`, `excerpt`, `content` (HTML), `type` (`post`|`page`), `status`, `menu_order`, `term_ids` (array).
  - `PUT /api/admin/cms/posts/:id` — Update post.
  - `DELETE /api/admin/cms/posts/:id` — Delete post.

- Terms
  - `GET /api/admin/cms/terms` — List terms.
  - `POST /api/admin/cms/terms` — Create term (name, slug, taxonomy, parent, description).
  - `PUT /api/admin/cms/terms/:id` — Update.
  - `DELETE /api/admin/cms/terms/:id` — Delete.

- Media
  - `GET /api/admin/cms/media` — List uploaded media.
  - `POST /api/admin/cms/media` — Upload file; multipart `file` field. Returns `url` for the uploaded file.
  - `DELETE /api/admin/cms/media/:id` — Delete media.

- Settings
  - `GET /api/admin/cms/settings` — List settings.
  - `POST /api/admin/cms/settings` — Create setting: `key`, `value` (string), `autoload`.
  - `PUT /api/admin/cms/settings/:id` — Update setting.

## Admin UI
- Admin UI available at `/admin` (frontend). Requires login via `Admin Login`.
- Key admin features added:
  - Posts: Create/edit posts and pages. `content` supports rich HTML editing with image insertion.
  - Media: Upload and manage media files.
  - Media chooser: Insert previously uploaded media into post content.
  - Terms: Manage categories/tags.
  - Pages: Separate list of posts filtered by `type = 'page'`.
  - Menus: Manage site menus (stored in `settings` under key `menus`).

## Menus
Menus are saved in the `settings` table under key `menus` as JSON. Structure:

[
  {
    "name": "Main Menu",
    "items": [ { "title": "Home", "url": "/" }, ... ]
  }
]

Use the Menus UI to create menus, add/remove/reorder items and assign URLs. To assign a page, copy its slug/path into the item's `url`.

## Notes for Developers
- Frontend requests use the axios instance in `frontend/src/utils/api.js` — it sets the `Authorization` header when logged in.
- Image uploads from the WYSIWYG editor are handled by `frontend/src/components/cms/WysiwygEditor.jsx` which calls `POST /api/admin/cms/media` and inserts the returned `url` into the editor content.
- The media chooser component is `frontend/src/components/cms/MediaChooser.jsx`.
- Menus UI is `frontend/src/components/cms/MenuManager.jsx` and uses the `settings` API to persist.

If you'd like, I can extend the backend to have a dedicated `menus` table and endpoints instead of storing menus in `settings`.
