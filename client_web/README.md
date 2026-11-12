This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Timelines

## Landing page

-   Clicking on logo takes you to landing page
-   Explore Nav link takes you to explore page where campaigns are listed (There is a bug which I can't yet resolve. When the client and server are being started then initially server is crashing for some reason)
-   How it works Nav link is an anchor (it takes us to the how it works section of the landing page)
-   For non-profits Nav link is **not implemented yet**
-   Login Nav link takes us to the login page
-   Start a campaign CTA nav link takes us to the create campaign page if user is logged in otherwise login page with callback to create campaign page
-   Hero section contains 2 links: start a Campaign CTA and Explore campaigns (Both are implemented)
-   There is a section which contains Featured campaigns (**Not implemented yet**) 6 campaigns should be shown here with view all CTA
-   There is a browse by category section. All the categories are listed here. User can choose a category of his choice and he will be taken to the explore page with the category filter applied. (**Not implemented yet**)
-   The footer is only for representation for now. **No such feature is yet implemented**