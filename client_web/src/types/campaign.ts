export interface CampaignCommentUser {
    id: string;
    name: string;
    avatar: string;
    is_email_verified: boolean;
}

export interface DetailedComment {
    id: string;
    campaign_id: string;
    author_id: string;
    author: CampaignCommentUser;
    content: string;
    parent_comment_id: string;
    is_edited: boolean;
    is_hidden: boolean;
    created_at: Date;
    updated_at: Date;
    replies: DetailedComment[];
}

export interface DetailedCampaignCreator {
    id: string;
    name: string;
    avatar: string;
    is_email_verified: boolean;
}

export interface DetailedCampaignDonation {
    id: string;
    donor_id: string;
    amount: number;
    currency: string;
    message: string;
    created_at: Date;
    updated_at: Date;
}

export interface DetailedCampaignStory {
    id: string;
    heading: string;
    content: string;
    image: string;
    sort_order: number;
}

export interface DetailedCampaignUpdate {
    id: string;
    title: string;
    content: string;
    image: string;
}


export interface DetailedCampaign {
    category: string;
    comments: DetailedComment[];
    comments_count: number;
    cover_image: string;
    created_at: Date;
    creator: DetailedCampaignCreator;
    creator_id: string;
    currency: string;
    deadline: Date;
    description: string;
    donations: DetailedCampaignDonation[];
    donors_count: number;
    goal_amount: number;
    id: string;
    is_featured: boolean;
    is_verified: boolean;
    raised_amount: number;
    slug: string;
    status: string;
    story_sections: DetailedCampaignStory[];
    tags: string[];
    title: string;
    updated_at: string;
    updates: DetailedCampaignUpdate[];
}