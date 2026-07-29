import Image from "next/image";
import { Campaign } from "../explore/CampaignCard";

export default function CampaignStory({campaign}: {campaign: Campaign}) {
  return (
  <>
    {campaign.storySections.map((section :any, i : number)=>(
      <div key={i} className="space-y-4 text-ink-soft animate-fade-up">
        <h2 className="font-serif text-xl font-bold text-ink">
          {section.heading}
        </h2>

        <p>
          {section.content}
        </p>

        {section.image && <Image src={section.image} alt={`${campaign.title}-img-i`}/>}

        <br /><br />
      </div>
    ))}
  </>
  );
}