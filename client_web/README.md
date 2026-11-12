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


##  Explore page

-   Navbar contains logo (**implemented**), searchbar (**not implemented**), how it works (**implemented**), login (**implemented**)/my campaigns (**Not implemented - Hardcoded version exist right now**), and start a campaign (**implemented**)/sign out (**implemented**).
-   Sidebar (**not collapsable right now**) consists of the filters options - Category, sort by, goal amount, campaign status (**Not implemented yet**)
-   Main section contains at the top **number of showing camaigns out of total campaigns based on filter**, sorted by **sorting**
-   there is an option to view campaigns in either card form of list form (**Not implemented - Low priority**)
-   Then there is the selected filters along with an x mark to remove that perticular filter (**Not implemented yet**)
-   Campaign cards (3 in a row) total 10 campaigns in a page (**Implemented**)
-   At the bottom, Pagination is provided (**Not implemented**)
-   A campaign card contains Campaign Image, Category, creator name, creator profile pic, campaign title, raised, total amount (with currency), donors count, days left, and a button to donate
-   An expired campaign will not be shown in the explore page (**Not implemented**)
-   Clicking anywhere on a campaign card will lead us to campaign detail page

## Campaign detail page

-   At the top, there is navbar containing Logo (**Implemented**), Breadcrumbs (Home, explore, campaign title) (**implemented**), login (**implemented**)/my campaigns (**not implemented**), start a campaign (**implemented**)/logout (**Not implemented**)
-   There is details of creator provided along with a follow button (**not implemented yet**). you can follow a creator to receive his campaigns in recommendation.
-   There is a comment section where you can write your thoughts about the campaign. these comments will be the top level comments (**implemented**)
-   There is another functionality planned for replies (**not implemented yet**)
-   There is an option to donate to the campaign (**implementation in progress**)
-   A list of recent donors is shown at the bottom of the donate component (**implemented**)
-   There is another functionality planned for donation comments (**Not implemented yet**) donor will be able to donate with a message. these messages will appear on the donor list
-   At the bottom of the campaign details page there is shown the recommended campaigns. these campaigns will be fixed based on users following (**Not implemented correctly yet**)

## create campaign page

-   this is a 4 step form (**Partially implemented**)
-   Slug generation should be automatic (**Not implemented**)
-   cover image url needs to be replaced with cover image upload (**Not implemented**)
-   Other is not added in the category yet (**Not implemented yet**)
-   step 2 contains the story sections of the campaign. creator can add multiple stories in the campaign atleast 1 story is required
-   Each story can have upto 1 image. it also needs to be replaced from url to file upload (**Not implemented yet**)
-   Then there is updates for the campaign. Updates can be added to the campaign even after the campaign is live. so this field is completely optional (**Implemented**)
-   Step 3 consist of Goal and timeline of the campaign (**implemented**)
-   The 4th and last step is the review. all the details of the campaign will be shown to the user. User can go back if there are any issues with the campaign. otherwise user can submit the campaign (**implemented**)
-   Once the campaign is submitted it will be marked as **draft** and it will be reviewed by the DFund team to verify the credibility of the campaign. (**Not implemented**)
-   Once verified, the team will mark the campaign as active and it will go live.
-   **The draft campaigns should not be visible in the explore page**

## Login page

-   Currently login is really simple. Email and password is required to login. (**implemented**)
-   Forget password button is provided but it is not yet implemented (**not implemented**)
-   registed link is provided in the page (**Not implemented yet**)

## Signup page

-   **Not implemented yet**

## Stripe payment page

-   **Not implemented yet**