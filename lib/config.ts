/**
 * Live reviews: the published-to-web CSV of the approved reviews tab in Google Sheets.
 * Public data (no secrets). Change it here to point the Reviews section at another sheet.
 * Expected columns: Name, Role, Organisation, Relationship, Rating, Feedback, LinkedIn, Photo, Submitted
 */
export const REVIEWS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQSZM8zL9nezI_NZrDvko44xszFyf9byingz14mHPGI42iysv3f-9H6zEE0RxwpY-S6zXiGhnQDwZPw/pub?gid=1647182804&single=true&output=csv";

/** How many reviews show before the "Show more" button. */
export const REVIEWS_INITIAL_COUNT = 6;
