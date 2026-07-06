
export const GOAL_AMOUNT = {
  min: 0,
  max: 50000,
};

export const categories = [
  { emoji: "🔍", label: "All Campaigns", value: "all", count: 712 },
  { emoji: "🏥", label: "Medical", value: "medical", count: 284, active: true },
  { emoji: "🌱", label: "Nonprofit", value: "nonprofit", count: 196 },
  { emoji: "🎨", label: "Creative", value: "creative", count: 143 },
  { emoji: "🆘", label: "Emergency", value: "emergency", count: 89 },
];

export const sortOptions = [
  { label: "Trending", value: "trending" },
  { label: "Newest First", value: "newest" },
  { label: "Most Funded", value: "most-funded" },
  { label: "Ending Soon", value: "ending-soon" },
];

export const statusTags = [
  { label: "Active", value: "active" },
  { label: "Ending Soon", value: "ending-soon" },
  { label: "Fully Funded", value: "fully-funded" },
];