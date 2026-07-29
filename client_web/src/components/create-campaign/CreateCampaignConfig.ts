export const CATEGORY_OPTIONS = ["Medical", "Nonprofit", "Creative", "Emergency"];
export const CURRENCY_OPTIONS = ["INR", "USD"];

export const STEPS = ["Basic Info", "Your Story", "Goal & Timeline", "Review"];

export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function emptyStorySection(order) {
  return { heading: "", content: "", image: "", order };
}

export function emptyUpdate() {
  return { title: "", content: "" };
}

export const initialFormState = {
  title: "",
  slug: "",
  slugTouched: false,
  description: "",
  coverImage: "",
  category: "Medical",
  tags: "",
  storySections: [emptyStorySection(1)],
  updates: [],
  goalAmount: "",
  currency: "INR",
  deadline: "",
};