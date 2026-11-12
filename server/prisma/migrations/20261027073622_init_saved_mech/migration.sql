-- CreateTable
CREATE TABLE "SavedCampaign" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "campaign_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SavedCampaign_user_id_idx" ON "SavedCampaign"("user_id");

-- CreateIndex
CREATE INDEX "SavedCampaign_campaign_id_idx" ON "SavedCampaign"("campaign_id");

-- CreateIndex
CREATE UNIQUE INDEX "SavedCampaign_user_id_campaign_id_key" ON "SavedCampaign"("user_id", "campaign_id");

-- AddForeignKey
ALTER TABLE "SavedCampaign" ADD CONSTRAINT "SavedCampaign_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedCampaign" ADD CONSTRAINT "SavedCampaign_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
