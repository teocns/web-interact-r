import React from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { ASSET_AVATARS } from "app/utils/constants/paths";
import { Icon } from "@iconify/react";

export default function UserCampaignStatus({
  statusType,
  userAuctionPosition,
  userGiveawayWinChance,
  auctionLeaderboardSpots,
  showUserAvatar,
  isCampaignFinished,
  hasUserWonGiveaway,
}) {
  function nth(n){return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"}
  let ranking=userAuctionPosition
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {showUserAvatar ? (
        <Avatar alt="user_profile_pic" src={`${ASSET_AVATARS}/avatar7.jpg`} />
      ) : null}
      <Stack direction="column" spacing={0.5}>
        {userAuctionPosition ? (
          <Stack
            direction={"row"}
            alignItems="center"
            spacing={1}
            sx={{
              py: 0.5,
              px: 1,
              borderRadius: 2,
              backgroundColor: "divider",
            }}
          >
            {!showUserAvatar ? (
              <Icon icon="iconoir:leaderboard-star" fontSize={20} />
            ) : null}
            {userAuctionPosition > auctionLeaderboardSpots ? (
              <Typography variant="caption">
                {isCampaignFinished
                  ? "Sorry, you didn't win an interaction"
                  : "You're no longer in the top "+ auctionLeaderboardSpots+" bids"}
              </Typography>
            ) : (
              <Typography
                variant="caption"
                sx={{
                  color: "primary.main",
                }}
              >
                {isCampaignFinished && statusType === 'bid'
                  ? `You finished in ${userAuctionPosition}${nth({userAuctionPosition})} place, you've received an
                interaction!`
                  : `You're in ${userAuctionPosition}${nth(ranking)} place, you'll receive an
                interaction!`}
              </Typography>
            )}
          </Stack>
        ) : null}
        {userGiveawayWinChance ? (
          <Stack
            direction={"row"}
            alignItems="center"
            spacing={1}
            sx={{
              py: 0.5,
              px: 1,
              borderRadius: 2,
              backgroundColor: "divider",
            }}
          >
            {!showUserAvatar ? (
              <Icon icon="iconoir:mail" fontSize={20} />
            ) : null}
            <Typography
              variant="caption"
              sx={{
                color:
                  hasUserWonGiveaway && isCampaignFinished
                    ? "primary.main"
                    : "text.primary",
              }}
            >
              {isCampaignFinished && statusType === 'giveaway'
                ? hasUserWonGiveaway
                  ? "You've won an interaction in the giveaway!"
                  : "Regrettably, you did not win. Your next giveaway entry will DOUBLE* the chance of winning!"
                : `You've entered the giveaway with a ${userGiveawayWinChance}% chance
              of winning!`}
            </Typography>
          </Stack>
        ) : null}
      </Stack>
    </Stack>
  );
}
