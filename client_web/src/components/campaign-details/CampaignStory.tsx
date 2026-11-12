import Image from "next/image";
import { Campaign } from "../explore/CampaignCard";

export default function CampaignStory({campaign}: {campaign: Campaign}) {
  //
  const getURL = (url: string)=>{
    // const pref=url.substr(0, 4);
    // if(pref==="http"){
    //   return url;
    // }
    // return null;
    if(!url) return url;
    return url.startsWith("http")?url:null;
  } 

  return (
  <>
    {campaign.story_sections?.map((section :any, i : number)=>(
      <div key={i} className="space-y-4 text-ink-soft animate-fade-up">
        <h2 className="font-serif text-xl font-bold text-ink">
          {section.heading}
        </h2>

        <p>
          {section.content}
        </p>

        {getURL(section.image) && (
          <Image
            src={getURL(section.image)}
            alt={`${campaign.title}-img`}
            width={750}
            height={400}
            style={{ width: "75%", height: "auto" }}
          />
        )}
      </div>
    ))}
  </>
  );
}